/*
Live implementation of PIC which get and sets data on the solana blockchain and our MirrorScan SQL Database
 */
import * as pic from "./pic";
import {PublicKey} from "@solana/web3.js";
import * as mirror from "./live_utils/mirror_helpers";
import * as chain from "./live_utils/onchain-data-helpers";
import {StakeAccountStatus} from "./live_utils/onchain-data-helpers";
import * as rpc from "./live_utils/rpc_helpers";
import {NETWORK} from "./connect";

// Mirror only calls
let connectOwner: pic.ConnectOwner = async (owner: pic.Owner) => {
    try {
        let result = await mirror.getOwner(owner.address.toString());

        if (result.success) {
            const data = result.data;

            // make collections
            if (data.collections?.length > 0) {
                let collections: Array<pic.Collection> = [];
                for (const collection of data.collections) {
                    collections.push({
                        address: new PublicKey(collection),
                    })
                }
                owner.collections = collections;
            }

            if (data.daos?.length > 0) {
                let daos: Array<pic.Dao> = [];
                for (const dao of data.daos) {
                    daos.push({
                        address: new PublicKey(dao),
                    })
                }
                owner.daos = daos;
            }

            if (data.nfts?.length > 0) {
                let nfts: Array<pic.Nft> = [];
                for (const nft of data.nfts) {

                    let newNft: pic.Nft = {
                        address: new PublicKey(nft.address),
                        owner_address: owner.address,
                        name: nft.nft_name,
                        image_url: nft.image_url,
                        collection: {address: nft.collection_address},
                    };
                    if (nft.token_account) {
                        newNft.token_account = new PublicKey(nft.token_account);
                    }
                    if (nft.stake) {

                        // console.log("got stake from mirror acconut: ", nft.stake)

                        let newStake: pic.Stake = {
                            address: new PublicKey(nft.stake.address),
                            is_active: nft.stake.is_active,
                            num_connections: nft.stake.num_connections,
                        }
                        newNft.stake = newStake;
                    }
                    nfts.push(newNft)
                }
                owner.nfts = nfts;
            }

        } else {
            alert("Failed to get owner data from backend, support has be automatically notified.");
        }
    }
    catch (e) {
        console.log("inside connectOwner");
        alert("got error: " + e);
        console.log(e);
    }

    mirror.forceSyncStakes(owner.address.toString())
        .then((result)=>{
            console.log("forced state sync with res: ", result);
        })
        .catch((err)=>{
            console.log("failed to force state sync with err: ", err);
        })

    return owner;
}

let getDaos: pic.GetDaos = async (daos: Array<pic.Dao>) => {
    try {
        let initializedDaos = [];
        for (const dao of daos){
            if (dao.address){
                initializedDaos.push(dao);
            } else{
                dao.streams = [];
            }
        }

        if (initializedDaos.length === 0){
            return daos;
        }

        let result = await mirror.getDaoStreams(initializedDaos);

        if (result.success){
            const streamMap: {string: Array<any>} = result.data;
            for (const [daoAddress, streams] of Object.entries(streamMap)){
                let matches = daos.filter((dao, _) => dao.address?.toString() === daoAddress);
                if (matches.length !== 1) {
                    alert("Multiple matches found in DAO array, this should not happen, support has been automatically notified.");
                } else {
                    let dao = matches[0];
                    dao.streams = [];
                    for (const stream of streams){
                        let collections: Array<pic.Collection> = [];
                        if (stream.collections?.length > 0){
                            for (const collection_address of stream.collections){
                                collections.push({address: new PublicKey(collection_address)});
                            }
                        }

                        console.log(`got stream ${stream.name} with total_earned: ${stream.total_earned}, is_active: ${stream.is_active}`);

                        let totalStreamed;
                        if (stream.is_active){
                            const lastUpdateTimestamp = stream.last_update_timestamp;
                            const elapsedSeconds = (Date.now()/1000) - lastUpdateTimestamp;
                            const ratePerConnPerSec = stream.daily_stream_rate / 24 / 60 / 60;
                            const recentlyEarned = elapsedSeconds * ratePerConnPerSec * stream.num_connections;
                            totalStreamed = stream.total_earned + recentlyEarned; //NOTE: might want to add in check here for would-be-inactive stream...
                        } else {
                            totalStreamed = stream.total_earned;
                        }

                        let newStream: pic.Stream = {
                            address: new PublicKey(stream.address),
                            dao_address: dao.address,
                            collections: collections,
                            num_connections: stream.num_connections,
                            is_active: stream.is_active,
                            name: stream.name,
                            token_image_url: stream.token_image_url,
                            daily_stream_rate: stream.daily_stream_rate,
                            total_earned: totalStreamed,
                            total_claimed: 0,
                            current_pool_amount: 0,
                            token_ticker: stream.token_ticker,
                            last_update_timestamp: stream.last_update_timestamp
                        };
                        dao.streams.push(newStream)
                    }
                }
            }
        } else {
            alert("Failed to retrieve latest stream data for daos, support has been automatically notified.");
        }
    }
    catch (e) {
        alert("got error: " + e);
        console.log(e);
    }
    return daos;
};

let refreshNft: pic.RefreshNft = async (nft: pic.Nft) => {
    let wallet = nft.wallet;
    let network = nft.network;
    let ownerAddress = nft.owner_address;
    let nftMint = nft.address;
    let finalResult = {nft: undefined};
    try {

        let stakeExistanceResult = await chain.checkIfStakeExists(nft, wallet, network, ownerAddress, nftMint);
        let stakeAccountStatus: StakeAccountStatus = stakeExistanceResult.stakeAccountStatus;

        if (stakeAccountStatus === StakeAccountStatus.NOT_INITIALIZED) {
            nft.stake = undefined;
            finalResult.nft = nft;
        } else if (stakeAccountStatus === StakeAccountStatus.INITIALIZED_NOT_ACTIVE) {
            nft.stake = {
                address: stakeExistanceResult.stakeAddress,
                num_connections: 0,
                is_active: false,
            };
            finalResult.nft = nft;
        } else if (stakeAccountStatus === StakeAccountStatus.INITIALIZED_AND_ACTIVE) {
            nft.stake = {
                address: stakeExistanceResult.stakeAddress,
                num_connections: stakeExistanceResult.numConnections,
                is_active: true,
            };
            finalResult.nft = nft;
        }
    }
    catch (e) {
        console.log(e);
    }
    mirror.forceSyncStakes(nft.owner_address.toString())
        .then((result)=>{
            console.log("forced state sync with res: ", result);
        })
        .catch((err)=>{
            console.log("failed to force state sync with err: ", err);
        })
    return finalResult;
}

let stakeNft: pic.StakeNFT = async (nft: pic.Nft) => {

    let finalResult = {nft: undefined};

    try {
        let wallet = nft.wallet;
        let network = nft.network;
        let ownerAddress = nft.owner_address;
        let senderNftAccount = nft.token_account;
        let nftMint = nft.address;


        let stakeExistanceResult = await chain.checkIfStakeExists(nft, wallet, network, ownerAddress, nftMint);

        console.log("got stake existence result: ", stakeExistanceResult);

        let stakeAddress = stakeExistanceResult.stakeAddress;
        let stakeAccountStatus: StakeAccountStatus = stakeExistanceResult.stakeAccountStatus;

        if (stakeAccountStatus === StakeAccountStatus.NOT_INITIALIZED) {
            let result = await mirror.insertNewStake(stakeAddress, ownerAddress, nft.address);
            console.log("got mirror.insertNewStake with result: ", result);
            try {
                stakeAddress = await rpc.initializeStakeAndStake(wallet, network, nftMint, senderNftAccount, ownerAddress);
                let newStake: pic.Stake = {
                    address: stakeAddress,
                    is_active: true,
                    num_connections: 0,
                }
                nft.stake = newStake;
                finalResult.nft = nft;
                mirror.updateStake(stakeAddress, true, 0)
                    .then((result) => {
                        console.log(`got result from mirror.insertNewStake: ${result}`);
                        console.log(result);
                    })
                    .catch((err) => {
                        console.log(`got result from mirror.insertNewStake: ${err}`);
                        console.log(err);
                    });
            }
            catch (e) {
                console.log("got error: ", e);
            }
        }
        else if (stakeAccountStatus === StakeAccountStatus.INITIALIZED_NOT_ACTIVE) {
            try {
                let result = await rpc.stakeNft(wallet, network, nftMint, senderNftAccount, ownerAddress);
                console.log("got stakeNft rpc with result: ", result);
                let newStake: pic.Stake = {
                    address: stakeAddress,
                    is_active: true,
                    num_connections: 0,
                }
                nft.stake = newStake;
                finalResult.nft = nft;
                mirror.updateStake(stakeAddress, true, 0)
                    .then((result) => {
                        console.log(`got result from mirror.insertNewStake:`);
                        console.log(result);

                    })
                    .catch((err) => {
                        console.log(`got result from mirror.insertNewStake: ${err}`);
                        console.log(err);
                    });
            }
            catch (e) {
                console.log("got error: ", e);
            }
        }

        else if (stakeAccountStatus === StakeAccountStatus.INITIALIZED_AND_ACTIVE) {
            console.log("stake is already active");
            let newStake: pic.Stake = {
                address: stakeAddress,
                is_active: true,
                num_connections: stakeExistanceResult.numConnections,
            }
            nft.stake = newStake;
            finalResult.nft = nft;
            mirror.updateStake(stakeAddress, true, stakeExistanceResult.numConnections)
                .then((result) => {
                    console.log(`got result from mirror.insertNewStake:`);
                    console.log(result);

                })
                .catch((err) => {
                    console.log(`got result from mirror.insertNewStake: ${err}`);
                    console.log(err);
                });
        }
    }
    catch (e) {
        console.log(e);
    }

    return finalResult;
};

let updateStreamAndConnection: pic.UpdateStreamAndConnection = async (nft: pic.Nft, stream: pic.Stream) => {
    let finalResult = {nft: undefined, stream: undefined, conn: undefined};
    try {
        stream = await chain.getStream(nft.wallet, nft.network, stream);
        finalResult.stream = stream;

        let stakeResult = await chain.getStake(nft.wallet, nft.network, nft.stake);
        nft.stake = stakeResult.stake;

        let connection: pic.Connection | undefined = await chain.checkIfConnectionExists(nft.wallet, nft.network, nft.stake.address, stream.address, stream.decimals, stream.daily_stream_rate);

        if (connection) {
            finalResult.conn = connection;
        }

        // set nft last to ensure that we got all the info we needed from the network
        finalResult.nft = nft;

        mirror.updateStream(stream.address, stream.is_active, stream.num_connections, stream.total_earned, stream.last_update_timestamp)
            .catch((err) => {
                console.log("error update stream: " + err);
            })
        mirror.updateStake(nft.stake.address, nft.stake.is_active, stakeResult.numConnections)
            .catch((err) => {
                console.log("error updating State in mirror: " + err);
            })
    }
    catch (e) {
        console.log("inside of updateStream and Connection")
        console.log(e);
    }
    return finalResult;
}

let connectToStream: pic.ConnectToStream = async (nft: pic.Nft, stream: pic.Stream) => {
    let finalResult = {nft: undefined, conn: undefined, stream: undefined};
    try {
        let existingConnection: pic.Connection | undefined = await chain.checkIfConnectionExists(nft.wallet, NETWORK, nft.stake.address, stream.address, stream.decimals, stream.daily_stream_rate);
        if (!existingConnection) {
            let connectionAddress = await rpc.initializeConnectionAndConnect(nft.wallet, nft.network, stream.address, nft.address, nft.owner_address);
            finalResult.conn = {
                address: connectionAddress,
                stream_address: stream.address,
                total_earned: 0,
                total_claimed: 0,
                is_active: true,
                last_update_timestamp: Math.floor(Date.now() / 1000),
            }
            nft.stake.num_connections += 1;
            stream.num_connections += 1;
            finalResult.stream = stream;
            finalResult.nft = nft;
        } else {
            if (existingConnection.is_active){
                finalResult.conn = existingConnection;
                finalResult.stream = await chain.getStream(nft.wallet, nft.network, stream);
                const stakeResult = await chain.getStake(nft.wallet, nft.network, nft.stake);
                nft.stake = stakeResult.stake;
                finalResult.nft = nft;
            } else {
                let result = await rpc.connectToStream(nft.wallet, NETWORK, stream.address, nft.address, nft.owner_address, existingConnection.address);
                console.log("connected to stream with result: ", result);
                finalResult.conn = {
                    address: existingConnection.address,
                    stream_address: stream.address,
                    total_earned: 0,
                    total_claimed: 0,
                    is_active: true,
                    last_update_timestamp: Math.floor(Date.now() / 1000),
                }
                stream.num_connections += 1;
                nft.stake.num_connections += 1;
                finalResult.stream = stream;
                finalResult.nft = nft;
            }
        }
        chain.getStream(nft.wallet, nft.network, stream)
            .then((newStream) => {
                mirror.updateStream(newStream.address, newStream.is_active, newStream.num_connections, newStream.total_earned, newStream.last_update_timestamp)
                    .catch((err) => {
                        console.log("error update stream: " + err);
                    })
            })
        mirror.updateStake(nft.stake.address, nft.stake.is_active, nft.stake.num_connections)
            .catch((err) => {
                console.log("error updating State in mirror: " + err);
            })
    }
    catch (e) {
        console.log(e);
    }
    return finalResult;
};

let claimFromStream: pic.ClaimFromStream = async (nft: pic.Nft, stake: pic.Stake, conn: pic.Connection, stream: pic.Stream) => {
    let finalResult = {conn: undefined, stream: undefined};
    try {
        let result = await rpc.claimTokensFromStream(conn.wallet, NETWORK, stream.address, stream.dao_address, nft.owner_address, stake.address, conn.address);
        console.log("claimed from stream with result: ", result);
        finalResult.stream = await chain.getStream(nft.wallet, nft.network, stream);
        finalResult.conn = await chain.getConn(nft.wallet, nft.network, conn, stream.decimals);
        mirror.updateStream(finalResult.stream.address, finalResult.stream.is_active, finalResult.stream.num_connections, finalResult.stream.total_earned, finalResult.stream.last_update_timestamp)
            .catch((err) => {
                console.log("err udpating stream: " + err)
            });
        mirror.updateConnection(finalResult.conn.address, finalResult.conn.is_active)
            .catch((err) => {
                console.log("err updating conn: " + err)
            });
    }
    catch (e) {
        console.log(e);
    }
    return finalResult;
};

let disconnectFromStream: pic.DisconnectFromStream = async (nft: pic.Nft, conn: pic.Connection, stream: pic.Stream) => {

    let finalResult = {nft: undefined, conn: undefined, stream: undefined};

    try {
        let result = await rpc.disconnectFromStream(nft.wallet, NETWORK, stream.address, nft.address, nft.owner_address, nft.stake.address, conn.address, stream.dao_address);
        console.log("disconnected from stream with result: ", result);
        nft.stake.num_connections -= 1;
        stream.num_connections -= 1;

        finalResult.nft = nft;
        finalResult.stream = stream;

        chain.getStream(nft.wallet, nft.network, stream)
            .then(newStream => {
                mirror.updateStream(newStream.address, newStream.is_active, newStream.num_connections, newStream.total_earned, newStream.last_update_timestamp)
                    .catch((err) => {
                        console.log("err udpating stream: " + err)
                    });
            })
        mirror.updateStake(nft.stake.address, nft.stake.is_active, nft.stake.num_connections)
            .catch((err) => {
                console.log("err updating conn: " + err)
            });

    }
    catch (e) {
        console.log(e);
    }

    return finalResult;
};

let unstakeNft: pic.UnstakeNft = async (nft: pic.Nft) => {
    let finalResult = {nft: undefined};
    try{
        let nftTokenAccount = await rpc.unstakeNft(nft.wallet, NETWORK, nft.owner_address, nft.stake.address, nft.address);
        console.log("got rpc.unstakeNft with ata: ", nftTokenAccount.toString());
        nft.stake.is_active = false;
        nft.stake.num_connections = 0;
        nft.token_account = nftTokenAccount;
        finalResult.nft = nft;
        mirror.updateStake(nft.stake.address, false, 0)
            .catch((err) =>{
                console.log("error update stake: " + err);
            })
    }
    catch (e) {
        alert("got error: " + e);
        console.log(e);
    }
    return finalResult;
};

export {connectOwner, getDaos, stakeNft, unstakeNft, connectToStream, disconnectFromStream, claimFromStream, updateStreamAndConnection, refreshNft};