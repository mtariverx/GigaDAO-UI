import React, {useEffect, useState} from "react";
import {useDaoData} from "../providers/daos";
import {useOwnerData} from "../providers/owner";
import {Stream, Dao, Nft, Collection, Connection} from 'pic/pic';
import {cloneObject} from "../utils/pic-object-utils";
import {NETWORK, pic} from "../pic/connect";
import {useAnchorWallet, useWallet} from "../providers/adapters/core/react";
import {Grid} from 'react-loader-spinner';
import imageNotFound from "../img/dao-images/image_not_found.png";
import _debounce from "lodash/debounce";
import ReactGA from 'react-ga4';

export type DaoProps = {
  dao_id: string;
};

export function DaoPage({ dao_id: dao_id }: DaoProps) {
    // ReactGA.send({hitType: "pageview", page: window.location.pathname + window.location.search});
    const [isBusy, setIsBusy] = useState(false);
    const [selectedNft, setSelectedNft] = useState(undefined);
    const {verifiedDaos, dispatch, refreshStreams} = useDaoData();
    const [numCards, setNumCards] = useState(10);
    const {owner} = useOwnerData();

    const currentDao: Dao = getDaoById(verifiedDaos, dao_id);
    let streams: Array<Stream> | undefined = currentDao.streams;

    // request a refresh
    useEffect(() => {
        if (currentDao.streams === undefined){
            refreshStreams(dispatch, [currentDao]);
        }
    },[]);

    streams = streams ? streams : [];
    const currentCollectionsAddresses = getCurrentCollections(streams);
    const eligibleNfts: Array<Nft> = getEligibleNfts(owner, currentCollectionsAddresses);
    const reducedNumCards = (eligibleNfts.length < numCards) ? eligibleNfts.length : numCards;
    const SCROLL_LOAD_AMOUNT = 10;
    const MAX_CARDS = eligibleNfts.length;

    // infinite scroll
    const dbounceFn = _debounce(handleScroll, 100); // note: memoize this
    async function handleScroll() {
        let viewHeight = window.innerHeight;
        let contentHeight = window.document.body.offsetHeight;
        let scrollHeight = document.documentElement.scrollTop;
        if (viewHeight + scrollHeight > (contentHeight - (viewHeight / 3))){
            if (reducedNumCards < MAX_CARDS) {
                let newNumCards = reducedNumCards + SCROLL_LOAD_AMOUNT;
                newNumCards = (newNumCards < MAX_CARDS) ? newNumCards : MAX_CARDS;
                setNumCards(newNumCards);
            } else {
                console.log("no more nfts");
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', dbounceFn);
        return () => window.removeEventListener('scroll', dbounceFn);
    });

    // refresh initial indexes
    let idxs = [...Array(reducedNumCards).keys()]
    let nftsArray: Array<Nft> = idxs.map((idx, _) => eligibleNfts[idx]);

    return (
        <div className="container mt-4">
            {streams.map(function(val, idx) {
                return <StreamCardComponent stream={val} dao={currentDao} currentNft={selectedNft} setCurrentNft={setSelectedNft} isBusy={isBusy} setIsBusy={setIsBusy} key={val.address.toString()}/>
            })}
            <div className="row staking-card">
                {nftsArray.map(function(val, idx) {
                    return <NftCardComponent
                        nft={val}
                        setSelectedNft={setSelectedNft}
                        key={val.address.toString()}
                        isBusy={isBusy}
                        setIsBusy={setIsBusy}
                    />})}
            </div>
        </div>
    );
}

const StreamCardComponent: React.FC<{stream: Stream, dao: Dao, currentNft?: Nft, setCurrentNft, isBusy, setIsBusy}> = (props) => {

    const [currentStream, setCurrentStream] = useState(props.stream);
    const [currentConnections, setCurrentConnections] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUnknown, setIsUnknown] = useState(false);
    const wallet = useAnchorWallet();


    enum StreamStates {
        NO_SELECTED_NFT,
        STAKED_NFT,
        CONNECTED_NFT,
        IS_LOADING,
        SELECTED_BUT_NOT_ELIGIBLE,
        UNKNOWN,
        CONNECTED_BUT_INACTIVE,
    }

    let streamState: StreamStates;
    if (isLoading){
        streamState = StreamStates.IS_LOADING;
    }
    else if (isUnknown){
        streamState = StreamStates.UNKNOWN;
    }
    else if (props.currentNft === undefined){
        streamState = StreamStates.NO_SELECTED_NFT;
    }
    else{
        if (props.currentNft.stake?.is_active){
            const nftCollectionString = props.currentNft.collection.address.toString();
            const streamCollectionStrings = getCurrentCollections([currentStream]);
            if (streamCollectionStrings.includes(nftCollectionString)){
                streamState = StreamStates.STAKED_NFT;
                if (currentConnections[props.currentNft.stake.address.toString()]?.is_active){
                    if (currentStream.is_active){
                        streamState = StreamStates.CONNECTED_NFT;
                    }else {
                        streamState = StreamStates.CONNECTED_BUT_INACTIVE;
                    }
                }
            } else {
                streamState = StreamStates.SELECTED_BUT_NOT_ELIGIBLE;
            }
        } else {
            streamState = StreamStates.UNKNOWN;
            console.log("current nft selected even though stake is not active - this should not happen."); // ga
        }
    }

    // load on-chain stream and connection
    useEffect(() => {

        const currentConnIsUndefined = currentConnections[props.currentNft?.stake?.address.toString()] === undefined;

        if ((streamState === StreamStates.STAKED_NFT) && currentConnIsUndefined){

            // check if there actually is already a connection
            setIsLoading(true);
            props.setIsBusy(true);

            props.currentNft.wallet = wallet;
            props.currentNft.network = NETWORK;

            pic.updateStreamAndConnection(props.currentNft, currentStream)
                .then((result) => {
                    if (result.nft === undefined){
                        setIsUnknown(true);
                        // currentConnections[props.currentNft.stake.address.toString()] = undefined;
                        // setCurrentConnections(cloneObject(currentConnections));
                    } else {
                        setIsUnknown(false);
                        let newStream = cloneObject(result.stream);
                        setCurrentStream(newStream);
                        if (result.conn === undefined){
                            currentConnections[props.currentNft.stake.address.toString()] = false;
                            setCurrentConnections(cloneObject(currentConnections));
                        } else {
                            currentConnections[props.currentNft.stake.address.toString()] = result.conn;
                            setCurrentConnections(cloneObject(currentConnections));
                        }
                    }
                    props.setIsBusy(false);
                    setIsLoading(false);
                })

        }
    }, [props.currentNft])

    // live number go up effect
    useEffect(() => {
        if (streamState === StreamStates.CONNECTED_NFT){
            const interval_ms = 100.;
            let timer = setTimeout(() => {
                const newNft = cloneObject(props.currentNft);
                props.setCurrentNft(newNft); // TODO this is horrible and should be isolated to a smaller component
            }, interval_ms);
            return () => clearTimeout(timer)
        }
    });

    function handleRefreshConnection(e){
        ReactGA.event({category: 'click', action: 'refresh_connection'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        setIsLoading(true);
        props.setIsBusy(true);
        props.currentNft.wallet = wallet;
        props.currentNft.network = NETWORK;
        pic.updateStreamAndConnection(props.currentNft, currentStream)
            .then((result) => {
                if (result.nft === undefined){
                    setIsUnknown(true);
                    // currentConnections[props.currentNft.stake.address.toString()] = undefined;
                    // setCurrentConnections(cloneObject(currentConnections));
                } else {
                    setIsUnknown(false);
                    let newStream = cloneObject(result.stream);
                    setCurrentStream(newStream);
                    if (result.conn === undefined){
                        currentConnections[props.currentNft.stake.address.toString()] = false;
                        setCurrentConnections(cloneObject(currentConnections));
                    } else {
                        currentConnections[props.currentNft.stake.address.toString()] = result.conn;
                        setCurrentConnections(cloneObject(currentConnections));
                    }
                }
                props.setIsBusy(false);
                setIsLoading(false);
            })
        e.stopPropagation();
    }

    function handleConnect(e){
        ReactGA.event({category: 'click', action: 'connect_to_stream'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        if (!currentStream.is_active){
            alert("this stream is inactive, new connections are not allowed. (we'll get rid of the button soon.) Thanks for your patience. ");
            e.stopPropagation();
            return;
        }

        setIsLoading(true);
        props.setIsBusy(true);

        props.currentNft.wallet = wallet;
        props.currentNft.network = NETWORK;

        pic.connectToStream(props.currentNft, currentStream).then((result) => {
            if (result.nft === undefined){
                setIsUnknown(true);
                // currentConnections[props.currentNft.stake.address.toString()] = undefined;
                // setCurrentConnections(cloneObject(currentConnections));
            } else {
                currentConnections[props.currentNft.stake.address.toString()] = result.conn;
                setCurrentConnections(cloneObject(currentConnections));
                const newStream = cloneObject(result.stream);
                setCurrentStream(newStream);
                const newNft = cloneObject(result.nft);
                props.setCurrentNft(newNft);
            }
            setIsLoading(false);
            props.setIsBusy(false);
        })
        e.stopPropagation();
    }

    function handleDisconnect(e){
        ReactGA.event({category: 'click', action: 'disconnect_from_stream'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        setIsLoading(true);
        props.setIsBusy(true);
        props.currentNft.wallet = wallet;

        pic.disconnectFromStream(props.currentNft, currentConnections[props.currentNft.stake.address.toString()], currentStream).then((result) => {
            if (result.nft === undefined){
                setIsUnknown(true);
                // currentConnections[props.currentNft.stake.address.toString()] = undefined;
                // setCurrentConnections(cloneObject(currentConnections));
            } else {
                const newStream = cloneObject(result.stream);
                const newNft = cloneObject(result.nft);
                currentConnections[props.currentNft.stake.address.toString()] = false;
                setCurrentConnections(cloneObject(currentConnections));
                setCurrentStream(newStream);
                props.setCurrentNft(newNft);
            }
            setIsLoading(false);
            props.setIsBusy(false);
        });
        e.stopPropagation();
    }

    function handleClaim(e){
        ReactGA.event({category: 'click', action: 'claim_from_stream'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        setIsLoading(true);
        props.setIsBusy(true);
        currentConnections[props.currentNft.stake.address.toString()].wallet = wallet;

        pic.claimFromStream(props.currentNft, props.currentNft.stake, currentConnections[props.currentNft.stake.address.toString()], currentStream)
            .then((result) => {
                if (result.conn === undefined){
                    setIsUnknown(true);
                    // currentConnections[props.currentNft.stake.address.toString()] = undefined;
                    // setCurrentConnections(cloneObject(currentConnections));
                } else {
                    const newStream = cloneObject(result.stream);
                    setCurrentStream(newStream);
                    const newNft = cloneObject(props.currentNft);
                    props.setCurrentNft(newNft);
                    currentConnections[props.currentNft.stake.address.toString()] = result.conn;
                    setCurrentConnections(cloneObject(currentConnections))
                }
                setIsLoading(false);
                props.setIsBusy(false);
            })
        e.stopPropagation();
    }

    let stream_info_box;
    switch (streamState) {
        case StreamStates.IS_LOADING: {
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-loading-section">
                        <Grid height="100%"/>
                    </div>
                </div>
            );
            break;
        }

        case StreamStates.SELECTED_BUT_NOT_ELIGIBLE: {
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-info-box">
                        <h4><em>The selected NFT is not eligible for this stream</em></h4>
                    </div>
                </div>
            );
            break
        }

        case StreamStates.UNKNOWN: {
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-section-3">
                        <div className="stream-info-box">
                            <h4>Connection state for {props.currentNft.name} is unknown. Solana may be congested.</h4>
                        </div>
                    </div>
                    <div className="stream-section-4">
                        <button className="subscribed-stream-btn stream-claim-btn" type="button" onClick={handleRefreshConnection}>Refresh</button>
                    </div>
                </div>
            );
            break;
        }

        case StreamStates.NO_SELECTED_NFT: {
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-info-box">
                        <h4><em>Please select a staked NFT</em></h4>
                    </div>
                </div>
            );
            break
        }

        case StreamStates.STAKED_NFT: {
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-section-3">
                        <div className="stream-info-box">
                            <h3>{props.currentNft.name}</h3>
                        </div>
                    </div>
                    <div className="stream-section-4">
                        <button className="subscribed-stream-btn stream-claim-btn" type="button" onClick={handleConnect}>Connect</button>
                    </div>
                </div>
            );
            break;
        }

        case StreamStates.CONNECTED_NFT: {
            
            const tokens_per_second = currentStream.daily_stream_rate / 24 / 60 / 60;
            const currentTime = Date.now()/1000;
            const connectionLastUpdateTimestamp = currentConnections[props.currentNft.stake.address.toString()].last_update_timestamp;
            const elapsedSeconds = currentTime - connectionLastUpdateTimestamp;
            const earnedSinceLastUpdate = elapsedSeconds * tokens_per_second;
            
            const totalEarned = currentConnections[props.currentNft.stake.address.toString()].total_earned + earnedSinceLastUpdate;

            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-section-3">
                        <div className="stream-info-box">
                            <h3>{props.currentNft.name}</h3>
                            <h4 className="desktop-only">earned: <em>{totalEarned.toFixed(4)}</em></h4>
                            <h4 className="desktop-only">claimed: <em>{currentConnections[props.currentNft.stake.address.toString()].total_claimed.toFixed(4)}</em></h4>
                            <h4>available: <em>{(totalEarned - currentConnections[props.currentNft.stake.address.toString()].total_claimed).toFixed(4)}</em></h4>
                        </div>
                    </div>
                    <div className="stream-section-4">
                        <button className="subscribed-stream-btn stream-claim-btn" type="button" onClick={handleClaim}>Claim</button>
                        <button className="subscribed-stream-btn stream-subscribe-btn" type="button" onClick={handleDisconnect}>Disconnect</button>
                    </div>
                </div>
            );
            break;
        }

        case StreamStates.CONNECTED_BUT_INACTIVE: {
            const tokens_per_second = currentStream.daily_stream_rate / 24 / 60 / 60;
            const streamLastUpdateTimestamp = currentStream.last_update_timestamp;
            const connectionLastUpdateTimestamp = currentConnections[props.currentNft.stake.address.toString()].last_update_timestamp;
            const elapsedSeconds = streamLastUpdateTimestamp - connectionLastUpdateTimestamp;
            let earnedSinceLastUpdate;
            if (elapsedSeconds > 0){
                earnedSinceLastUpdate = elapsedSeconds * tokens_per_second;
            } else {
                earnedSinceLastUpdate = 0;
            }
            const totalEarned = currentConnections[props.currentNft.stake.address.toString()].total_earned + earnedSinceLastUpdate;
            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-section-3">
                        <div className="stream-info-box">
                            <h3>{props.currentNft.name}</h3>
                            <h4 className="desktop-only">earned: <em>{totalEarned.toFixed(4)}</em></h4>
                            <h4 className="desktop-only">claimed: <em>{currentConnections[props.currentNft.stake.address.toString()].total_claimed.toFixed(4)}</em></h4>
                            <h4>available: <em>{(totalEarned - currentConnections[props.currentNft.stake.address.toString()].total_claimed).toFixed(4)}</em></h4>
                        </div>
                    </div>
                    <div className="stream-section-4">
                        <button className="subscribed-stream-btn stream-claim-btn" type="button" onClick={handleClaim}>Claim</button>
                        <button className="subscribed-stream-btn stream-subscribe-btn" type="button" onClick={handleDisconnect}>Disconnect</button>
                    </div>
                </div>
            );
            break;
        }

    }


    return (
        <div className="row stream-row staking-card">
            <div className="stream-section-1">
            <img className="stream-token-img" src={currentStream.token_image_url}/>
        </div>
        <div className="stream-section-2 desktop-only">
            <div className="stream-info-box">
                <h4>{`${currentStream.name} : ${currentStream.is_active ? "Active" : "Inactive"}`}</h4>
                <h4>{currentStream.current_pool_amount.toFixed(4)} {currentStream.token_ticker} in pool</h4>
                <h4 className="desktop-only">streams {currentStream.daily_stream_rate} {currentStream.token_ticker} / day</h4>
                <h4 className="desktop-only">{currentStream.num_connections} connections</h4>
            </div>
        </div>
        {stream_info_box}
    </div>
  );
}

const NftCardComponent: React.FC<{nft: Nft, setSelectedNft, isBusy, setIsBusy}> = (props) => {

    enum NftStates {
        NOT_STAKED,
        STAKED,
        UNKNOWN
    }

    const [currentNft, setCurrentNft] = useState(props.nft);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnknown, setIsUnknown] = useState(false);
    const isStaked = currentNft.stake && currentNft.stake?.is_active;

    let currentNftState: NftStates;
    if (isUnknown){
        currentNftState = NftStates.UNKNOWN;
    } else if (isStaked) {
        currentNftState = NftStates.STAKED;
    } else {
        currentNftState = NftStates.NOT_STAKED;
    }

    const wallet = useAnchorWallet();

    function selectNft(e){
        ReactGA.event({category: 'click', action: 'select_nft'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        else if (currentNftState === NftStates.STAKED){
            props.setSelectedNft(currentNft);
        } else {
            alert("NFT must be staked to view its streams.");
        }
        e.stopPropagation();
    }

    function handleStakeNft(e){
        ReactGA.event({category: 'click', action: 'stake_nft'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        setIsLoading(true);
        props.setIsBusy(true);
        currentNft.wallet = wallet;
        currentNft.network = NETWORK;
        pic.stakeNft(currentNft).then((result) => {
            if (result.nft === undefined){
                setIsUnknown(true);
            } else{
                let clonedNft = cloneObject(result.nft);
                setCurrentNft(clonedNft);
                props.setSelectedNft(clonedNft);
            }
            setIsLoading(false);
            props.setIsBusy(false);
        })
        e.stopPropagation();
    }

    function handleUnstakeNft(e){
        ReactGA.event({category: 'click', action: 'unstake_nft'});
        let numActiveConns = currentNft.stake.num_connections;
        if (numActiveConns > 0){
            alert("You must disconnect from all streams before unstaking.");
        } else {
            if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
            setIsLoading(true);
            props.setIsBusy(true);
            currentNft.wallet = wallet;
            currentNft.network = NETWORK;
            pic.unstakeNft(currentNft).then((result)=>{
                if (result.nft === undefined){
                    setIsUnknown(true);
                } else{
                    let clonedNft = cloneObject(result.nft);
                    setCurrentNft(clonedNft);
                    props.setSelectedNft(undefined);
                }
                setIsLoading(false);
                props.setIsBusy(false);
            })
        }
        e.stopPropagation();
    }

    function handleRefresh(e) {
        ReactGA.event({category: 'click', action: 'refresh_nft'});
        if (props.isBusy) {alertIsBuys(); e.stopPropagation(); return;}
        setIsLoading(true);
        props.setIsBusy(true);
        currentNft.wallet = wallet;
        currentNft.network = NETWORK;
        pic.refreshNft(currentNft).then((result) => {
            if (result.nft === undefined){
                alert("Solana is likely experiencing some congestion. Consider refreshing the page or trying again later.")
                setIsUnknown(true);
            } else{
                setIsUnknown(false);
                let clonedNft = cloneObject(result.nft);
                setCurrentNft(clonedNft);
            }
            setIsLoading(false);
            props.setIsBusy(false);
        })
        e.stopPropagation();
    }


    ///////////////////////////////////////////////////////////////////////
    // BEGIN GEN FROM STATE
    ///////////////////////////////////////////////////////////////////////

    let box_left;
    if (currentNftState === NftStates.STAKED) {
        let numActiveConns = currentNft.stake.num_connections;
        box_left = (
            <div className="box-left">
                <div><em>Staked</em></div>
                <div>connections: <em>{numActiveConns}</em></div>
            </div>
        );
    } else if (currentNftState === NftStates.NOT_STAKED) {
        box_left = (
            <div className="box-left">
                <div>Not Staked</div>
                <div>connections: <em>0</em></div>
            </div>
        );
    } else {
        box_left = (
            <div className="box-left">
                <div>State Unknown (network error)</div>
                <div>connections: <em>?</em></div>
            </div>
        );
    }

    ////////////////////////////////////////////////////////////////////

    let box_right;
    if (isLoading){
        box_right = (
            <div className="box-right">
                <div className="box-right-loading-section">
                    <Grid height="100%"/>
                </div>
            </div>
        );
    } else if (currentNftState === NftStates.STAKED) {
        box_right = (
            <div className="box-right">
                <button className="subscribed-stream-btn unstake-btn" onClick={handleUnstakeNft}>Unstake</button>
            </div>
        );
    } else if (currentNftState === NftStates.NOT_STAKED){
        box_right = (
            <div className="box-right">
                <button className="subscribed-stream-btn stake-btn" onClick={handleStakeNft}>Stake</button>
            </div>
        );
    } else {
        box_right = (
            <div className="box-right">
                <button className="subscribed-stream-btn stake-btn" onClick={handleRefresh}>Refresh</button>
            </div>
        );
    }

    ///////////////////////////////////////////////////////////////////////
    // END GEN FROM STATE
    ///////////////////////////////////////////////////////////////////////

    return (
        <div className="nft-card-front" onClick={selectNft}>
            <div className="card dao-card">
                <div className="card-body dao-card-body">
                    <div className="nft-status">
                        <h4>{props.nft.name}</h4>
                        <div className="staked-nft-info-box">
                            {box_left}
                            {box_right}
                        </div>
                    </div>
                    <div className="nft-img-container">
                        <img
                            className="card-img dao-img"
                            src={props.nft.image_url}
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null;
                                currentTarget.src = imageNotFound;
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// utils
function getDaoById(verifiedDaos, dao_id) {
    const daoMatch = verifiedDaos.filter((dao) => dao.dao_id === dao_id);
    let currentDao;
    if (daoMatch.length === 0) {
        alert("DAO id not found: " + dao_id);
        currentDao = verifiedDaos[0];
    }
    else if (daoMatch.length > 1){
        alert("Warning, multiple DAOs found with same ID, please contact support.")
        currentDao = daoMatch[0];
    }
    else {
        currentDao = daoMatch[0];
    }
    return currentDao;
}

function getCurrentCollections(streams) {
    let addresses = [];
    for (const stream of streams){
        if (stream.collections){
            for (const collection of stream.collections){
                let pk = collection.address;
                addresses.push(pk.toString());
            }
        }
    }
    return addresses;
}

function getEligibleNfts(owner, currentCollectionsAddresses){
    let eligibleNfts: Array<Nft> = [];
    if (owner.address){
        if (owner.nfts){
            if (owner.nfts.length > 0){
                // filter nfts that are eligible for streams here
                for (const nft of owner.nfts){
                    let b58address = nft.collection.address.toString();
                    if (currentCollectionsAddresses.includes(b58address)){
                        eligibleNfts.push(nft);
                    }
                }
            }
        }
    }
    let staked = [];
    let unstaked = [];
    for (const nft of eligibleNfts){
        if (nft.stake?.is_active){
            staked.push(nft);
        } else {
            unstaked.push(nft);
        }
    }
    let sortedEligibleNfts = staked.concat(unstaked);
    return sortedEligibleNfts;
}

function alertIsBuys(){
    alert("Please wait until previous action completes.\nBulk action support is coming soon.");
}