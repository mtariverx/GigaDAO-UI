/*
Live implementation of PIC which get and sets data on the solana blockchain and our MirrorScan SQL Database
 */
import * as pic from "./pic";
import {Keypair, PublicKey} from "@solana/web3.js";
import {verifiedDaos} from "../preload/verified-daos";
import * as mirror from "./live_utils/mirror_helpers";
import * as chain from "./live_utils/onchain-data-helpers";
import * as rpc from "./live_utils/rpc_helpers";

// Mirror only calls

let connectOwner: pic.ConnectOwner = async (owner: pic.Owner) => {
    let result = await mirror.getOwner(owner.address.toString());
    // TODO process result to generate a new pic.Owner object
    console.log("got live owner with result:")
    console.log(result);
    return {};
}

let getDaos: pic.GetDaos = async (daos: Array<pic.Dao>) => {
    // query the streams against the given dao_addresses
    // TODO process result to return proper updated Dao array
    let daoStreamMap = mirror.getDaoStreams(daos);
    console.log("got live get daos result: ");
    console.log(daoStreamMap);
    return [];
};










// TODO TEMP RPCS - REMOVE THESE

let stakeNft: pic.StakeNFT = async (nft: pic.Nft) => {
    // for now just create a stake and add it to the nft
    nft.stake = {
        address: Keypair.generate().publicKey,
        connections: [],
        is_active: true,
    }
    return nft;
};

let unstakeNft: pic.UnstakeNft = async (nft: pic.Nft) => {
    nft.stake.is_active = false;
    return nft;
};

let connectToStream: pic.ConnectToStream = async (nft: pic.Nft, stream: pic.Stream) => {
    let conn: pic.Connection = {
        address: Keypair.generate().publicKey,
        stream_address: stream.address,
        total_earned: 0,
        total_claimed: 0,
        is_active: true,
        last_update_timestamp: Math.floor(Date.now()/1000),
    }
    nft.stake.connections.push(conn);
    stream.num_connections += 1;
    return {nft, stream};
};

let disconnectFromStream: pic.DisconnectFromStream = async (nft: pic.Nft, conn: pic.Connection, stream: pic.Stream) => {
    conn.is_active = false;
    stream.num_connections -= 1;
    return {nft, conn, stream};
};

let claimFromStream: pic.ClaimFromStream = async (conn: pic.Connection, stream: pic.Stream) => {
    // NOTE: we assume that we are updating total earned / streamed locally
    let amount_to_claim = conn.total_earned - conn.total_claimed;
    conn.total_claimed += amount_to_claim;
    stream.total_claimed += amount_to_claim;
    return {conn, stream};
};



// RPCs

// let stakeNft: pic.StakeNFT = (nft: pic.Nft) => {
//
//     let stakeExists = chain.checkIfStakeExists();
//     if (!stakeExists){
//         let result = rpc.initializeStakeAndStake();
//         if (result){
//             let result = mirror.insertNewStake();
//         }
//     } else{
//         let result = rpc.stakeNft();
//         if (result){
//             mirror.updateStake()
//         }
//     }
// };
//
// let unstakeNft: pic.UnstakeNft = (nft: pic.Nft) => {
//
//     let result = rpc.unstakeNft();
//     if (result){
//         mirror.updateStake();
//     }
// };
//
// let connectToStream: pic.ConnectToStream = (nft: pic.Nft, stream: pic.Stream) => {
//
//     let connectionExists = chain.checkIfConnectionExists();
//     if (!connectionExists){
//         let result = rpc.initializeConnectionAndConnect();
//         if (result){
//             mirror.insertNewConnection();
//         }
//     } else {
//         // connectToStream RPC call
//         let result = rpc.connectToStream();
//         if (result){
//             mirror.updateConnection();
//         }
//     }
// };
//
// let disconnectFromStream: pic.DisconnectFromStream = (nft: pic.Nft, conn: pic.Connection, stream: pic.Stream) => {
//     // disconnect from stream RPC call
//     let result = rpc.disconnectFromStream();
//     if (result){
//         mirror.updateConnection();
//     }
// };
//
// let claimFromStream: pic.ClaimFromStream = (conn: pic.Connection, stream: pic.Stream) => {
//     // claimFromStream RPC Call
//     let result = rpc.claimTokensFromStream();
//     if (result){
//         mirror.updateConnection()
//     }
// };

export {connectOwner, getDaos, stakeNft, unstakeNft, connectToStream, disconnectFromStream, claimFromStream};