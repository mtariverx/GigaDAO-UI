import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {useDaoData} from "../providers/daos";
import _debounce from 'lodash/debounce';
import {Grid} from 'react-loader-spinner';
import {Dao, Stream} from 'pic/pic';
import imageNotFound from "img/dao-images/image_not_found.png";
import ReactGA from 'react-ga4';

export function VerifiedDAOs() {
    // ReactGA.send({hitType: "pageview", page: window.location.pathname + window.location.search});
    const [numCards, setNumCards] = useState(10);
    const {verifiedDaos, dispatch, refreshStreams} = useDaoData();

    const orderedVerifiedDaos = sortByMembership(verifiedDaos);

    const SCROLL_LOAD_AMOUNT = 10;
    const MAX_CARDS = orderedVerifiedDaos.length;

    // infinite scroll
    const dbounceFn = _debounce(handleScroll, 100); // note: memoize this
    async function handleScroll() {
        let viewHeight = window.innerHeight;
        let contentHeight = window.document.body.offsetHeight;
        let scrollHeight = document.documentElement.scrollTop;
        let newDaosToRefresh = [];
        if (viewHeight + scrollHeight > (contentHeight - (viewHeight / 3))){
            if (numCards < MAX_CARDS) {
                let newNumCards = numCards + SCROLL_LOAD_AMOUNT;
                newNumCards = (newNumCards < MAX_CARDS) ? newNumCards : MAX_CARDS;
                for (let i = numCards; i < newNumCards; i++){
                    newDaosToRefresh.push(orderedVerifiedDaos[i]);
                }
                setNumCards(newNumCards);
            } else {
                console.log("no more daos");
            }
            if (newDaosToRefresh.length > 0){
                refreshStreams(dispatch, newDaosToRefresh);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', dbounceFn);
        return () => window.removeEventListener('scroll', dbounceFn);
    });

    // refresh initial indexes
    let idxs = [...Array(numCards).keys()]
    let daoArray = idxs.map((idx, _) => orderedVerifiedDaos[idx]);

    useEffect(() => {
        refreshStreams(dispatch, daoArray);
    },[]);

    return (
        <div className="container mt-4">
            <div className="row staking-card">
                {daoArray.map(function(data, idx) {
                    return <DaoCardComponent data={data} key={idx}/>
                })}
            </div>
        </div>
    );
}

const DaoCardComponent: React.FC<{data: Dao}> = (props) => {
    const history = useHistory();
    const path = '/dao/' + props.data.dao_id;

    let numActiveStreams = getNumActiveStreams(props.data.streams);
    const navigateToDao = useCallback(() => history.push(path), [history]);

    function handleOnClick(){
        if (numActiveStreams === 0){
            alert("The holders of this collection has not initialized a DAO yet...")
            ReactGA.event({
                category: 'navigation',
                action: 'click_initialized_collection'
            });
        } else {
            ReactGA.event({
                category: 'navigation',
                action: 'click_unitialized_collection'
            });
            navigateToDao();
        }
    }

    return (
        <div className="dao-card-front" onClick={handleOnClick}>
            <div className="card dao-card">
                <div className="card-body dao-card-body">

                    <div className="dao-status">
                        <div className="dao-name-row">
                            <h3>{props.data.display_name}</h3>
                        </div>
                        <div className="dao-info-row">
                            <div className="data-section">
                                <div className="data-unit">
                                    <h5>#NFTs</h5>
                                    <h4><em>{props.data.num_nfts}</em></h4>
                                </div>
                                <div className="data-unit">
                                    <h5>#Streams</h5>
                                    <h4><em>{numActiveStreams}</em></h4>
                                </div>
                                <div className="data-unit">
                                    <h5>Is Holder</h5>
                                    <h4><em>{props.data.is_member ? "Yes" : "No"}</em></h4>
                                </div>
                            </div>
                            <StreamSectionComponent data={props.data}/>
                        </div>
                        <div className="dao-buffer-row"></div>
                    </div>

                    <div className="dao-img-container">
                        <img
                            className="card-img dao-img"
                            src={props.data.image_url}
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

const StreamSectionComponent: React.FC<{data: Dao}> = (props) => {

    let streamState = getStreamState(props.data.streams);

    let content;
    switch (streamState){

        case StreamState.NONE: {
            content = (
                <div className="none-row">
                    <h4><em>No Active<br/>Streams</em></h4>
                </div>
            )
            break;
        }
        case StreamState.ONE: {
            content = (
                <div className="multiple-row">
                    <MultiStreamRowComponent stream={props.data.streams[0]}/>
                </div>
            )
            break;
        }
        case StreamState.TWO || StreamState.MULTIPLE: {
            content = (
                <div className="multiple-row">
                    <MultiStreamRowComponent stream={props.data.streams[0]}/>
                    <MultiStreamRowComponent stream={props.data.streams[1]}/>
                </div>
            )
            break;
        }
        default: {
            content = (
                <div className="loading-row">
                    <Grid width="100%"/>
                </div>
            );
            break;
        }
    }


    return (
        <div className="stream-section">
            {content}
        </div>
    );
}

const MultiStreamRowComponent: React.FC<{stream: Stream}> = (props) => {

    return (
        <div className="multi-stream-row">
            <div className="token-logo-row">
                <img src={props.stream.token_image_url}/>
            </div>
            <div className="token-amount-row">
                <em>{props.stream.total_earned.toFixed(4)}</em>
            </div>
        </div>
    );
}

enum StreamState {
    LOADING,
    NONE,
    ONE,
    TWO,
    MULTIPLE,
};

function getStreamState(streams){
    let streamState;
    if (streams === undefined){
        streamState = StreamState.LOADING;
    }
    else if (streams.length === 0){
        streamState = StreamState.NONE;
    }
    else if (streams.length === 1){
        streamState = StreamState.ONE;
    }
    else if (streams.length === 2){
        streamState = StreamState.TWO;
    }
    else {
        streamState = StreamState.MULTIPLE;
    }
    return streamState;
}

function getNumActiveStreams(streams){
    if (streams == undefined){
        return "?";
    } else {
        return streams.length;
    }
}

function sortByMembership(verifiedDaos){
    let is_member_arr = [];
    let not_member_arr = [];
    for (const dao of verifiedDaos){
        if (dao.is_member){
            is_member_arr.push(dao);
        } else {
            not_member_arr.push(dao);
        }
    }
    return is_member_arr.concat(not_member_arr);
}






