import React, {useEffect, useState} from "react";
import {useDaoData} from "../providers/daos";
import {useOwnerData} from "../providers/owner";
import * as pic from 'pic/pic';
import {stakeNft, unstakeNft, connectToStream, disconnectFromStream, claimFromStream} from "../pic/sim";
import {cloneObject} from "../utils/pic-object-utils";

//TODO implement load connection and stream stats directly from blockchain

export type DaoProps = {
  dao_id: string;
};

export function DaoPage({ dao_id: dao_id }: DaoProps) {
    const [selectedNft, setSelectedNft] = useState(undefined);
    const {verifiedDaos, dispatch, refreshStreams} = useDaoData();
    const {owner} = useOwnerData();

    const currentDao: pic.Dao = getDaoById(verifiedDaos, dao_id);
    let streams = currentDao.streams;

    // request a refresh
    useEffect(() => {
        if (currentDao.streams === undefined){
            refreshStreams(dispatch, [currentDao]);
        }
    },[]);

    streams = streams ? streams : [];
    const currentCollectionsAddresses = getCurrentCollections(streams);
    const eligibleNfts = getEligibleNfts(owner, currentCollectionsAddresses);

    return (
        <div className="container mt-4">
            {streams.map(function(val, idx) {
                return <StreamCardComponent stream={val} dao={currentDao} currentNft={selectedNft} setCurrentNft={setSelectedNft} key={idx}/>
            })}
            <div className="row staking-card">
                {eligibleNfts.map(function(val, idx) {
                    return <NftCardComponent
                        nft={val}
                        setSelectedNft={setSelectedNft}
                        key={idx}
                    />})}
            </div>
        </div>
    );
}

const StreamCardComponent: React.FC<{stream: pic.Stream, dao: pic.Dao, currentNft?: pic.Nft, setCurrentNft}> = (props) => {

    const [currentStream, setCurrentStream] = useState(props.stream);

    enum StreamStates {
        NO_SELECTED_NFT,
        STAKED_NFT,
        CONNECTED_NFT,
    }

    // extract this to util
    let streamState: StreamStates;
    if (props.currentNft === undefined){
        streamState = StreamStates.NO_SELECTED_NFT;
    }
    else{
        if (props.currentNft.stake?.is_active){
            streamState = StreamStates.STAKED_NFT;
            if (props.currentNft.stake?.connections?.length > 0){
                let connections: Array<pic.Connection> = props.currentNft.stake.connections;
                let activeConnections = connections.filter((conn, _) => conn.is_active);
                let connectionStreamAddresses = activeConnections.map((conn, _) => conn.stream_address);
                if (connectionStreamAddresses.includes(currentStream.address)){
                    streamState = StreamStates.CONNECTED_NFT;
                }
            }
        } else {
            alert("Error: unstaked nft should not be selectable, support has been contacted automatically.");
        }
    }

    useEffect(() => {
        if (streamState === StreamStates.CONNECTED_NFT){
            let currentConnection = getConnection(props.currentNft, currentStream);
            const tokens_per_second = currentStream.daily_stream_rate / 24 / 60 / 60;
            const interval_ms = 100.;
            const token_increment = tokens_per_second * (interval_ms/1000);
            currentConnection.total_earned += token_increment;
            let timer = setTimeout(() => {
                const newNft = cloneObject(props.currentNft);
                props.setCurrentNft(newNft);
            }, interval_ms);
            return () => clearTimeout(timer)
        } else{

        }
    });

    // click handlers
    function handleConnect(e){
        const result = connectToStream(props.currentNft, currentStream);
        const newStream = cloneObject(result.stream);
        const newNft = cloneObject(result.nft);
        setCurrentStream(newStream);
        props.setCurrentNft(newNft);
        e.stopPropagation();
    }

    function handleDisconnect(e){
        let currentConnection = getConnection(props.currentNft, currentStream);
        const result = disconnectFromStream(props.currentNft, currentConnection, currentStream);
        const newStream = cloneObject(result.stream);
        const newNft = cloneObject(result.nft);
        setCurrentStream(newStream);
        props.setCurrentNft(newNft);
        e.stopPropagation();
    }

    function handleClaim(e){
        let currentConnection = getConnection(props.currentNft, currentStream);
        const result = claimFromStream(currentConnection, currentStream);
        const newStream = cloneObject(result.stream);
        setCurrentStream(newStream);
        const newNft = cloneObject(props.currentNft);
        props.setCurrentNft(newNft);
        e.stopPropagation();
    }

    let stream_info_box;
    switch (streamState) {

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

            let currentConnection = getConnection(props.currentNft, currentStream);

            stream_info_box = (
                <div className="stream-section-dynamic">
                    <div className="stream-section-3">
                        <div className="stream-info-box">
                            <h3>{props.currentNft.name}</h3>
                            <h4 className="desktop-only">earned: <em>{currentConnection.total_earned.toFixed(4)}</em></h4>
                            <h4 className="desktop-only">claimed: <em>{currentConnection.total_claimed.toFixed(4)}</em></h4>
                            <h4>available: <em>{(currentConnection.total_earned - currentConnection.total_claimed).toFixed(4)}</em></h4>
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
            <img className="stream-token-img" src={props.stream.token_image_url}/>
        </div>
        <div className="stream-section-2">
            <div className="stream-info-box">
                <h4>{props.stream.name}</h4>
                <h4>{props.stream.current_pool_amount} {props.stream.token_ticker} in pool</h4>
                <h4 className="desktop-only">streams {props.stream.daily_stream_rate} {props.stream.token_ticker} / day</h4>
                <h4 className="desktop-only">{props.stream.num_connections} connections</h4>
            </div>
        </div>

        {stream_info_box}

    </div>
  );
}

const NftCardComponent: React.FC<{nft: pic.Nft, setSelectedNft}> = (props) => {

    const [currentNft, setCurrentNft] = useState(props.nft);
    const isStaked = currentNft.stake && currentNft.stake?.is_active;

    function selectNft(e){
        if (!isStaked) {
            alert("NFT must be staked to view its streams.")
        }
        else{
            props.setSelectedNft(currentNft);
        }
        e.stopPropagation();
    }

    function toggleStaked(e) {
        let nft
        if (isStaked){
            let numActiveConns = getNumActiveConnections(currentNft);
            if (numActiveConns > 0){
                alert("You must disconnect from all streams before unstaking.")
            } else {
                nft = cloneObject(unstakeNft(currentNft));
                setCurrentNft(nft);
            }
        } else {
            nft = cloneObject(stakeNft(currentNft));
            setCurrentNft(nft);
        }
        e.stopPropagation();
    }


    let box_left;
    if (isStaked) {
        let numActiveConns = getNumActiveConnections(currentNft);
        box_left = (
            <div className="box-left">
                <div><em>Staked</em></div>
                <div>connections: <em>{numActiveConns}</em></div>
            </div>
        );
    } else {
        box_left = (
            <div className="box-left">
                <div>Not Staked</div>
                <div>connections: <em>0</em></div>
            </div>
        );
    };
    let box_right;
    if (isStaked) {
        box_right = (
            <div className="box-right">
                <button className="subscribed-stream-btn unstake-btn" onClick={toggleStaked}>Unstake</button>
            </div>
        );
    } else {
        box_right = (
            <div className="box-right">
                <button className="subscribed-stream-btn stake-btn" onClick={toggleStaked}>Stake</button>
            </div>
        );
    }

    return (
        <div className="col-12 col-lg-4 col-xl" onClick={selectNft}>
            <div className="card">
                <div className="card-body">
                    <h4>{props.nft.name}</h4>
                    <div className="staked-nft-info-box">
                        {box_left}
                        {box_right}
                    </div>
                    <img className="card-img nft-img" src={props.nft.image_url}/>
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
    let eligibleNfts = [];
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
    return eligibleNfts;
}

function getConnection(currentNft, currentStream) {
    let connections: Array<pic.Connection> = currentNft.stake.connections;
    let activeConnections = connections.filter((conn, _) => conn.is_active);
    let connArr = activeConnections.filter((conn, _) => conn.stream_address === currentStream.address);
    if (connArr.length === 1) {
        return connArr[0];
    } else {
        alert("invalid connection found, support has been automatically alerted.")
    }
}

function getNumActiveConnections(nft){
    let numActiveConns = 0;
    if (nft.stake?.connections?.length > 0){
        let activeConns = nft.stake.connections.filter((conn, _) => conn.is_active);
        numActiveConns = activeConns.length;
    }
    return numActiveConns;
}
