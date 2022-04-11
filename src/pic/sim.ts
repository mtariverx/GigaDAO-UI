/*
Simulate wide range of possible responses from partner program, including failures.
 */
import * as pic from "./pic";
import {Keypair, PublicKey} from "@solana/web3.js";
import {sampleMap as daoMap} from "./sim_data/real-nft-data-sample";
import {sampleTokenStream1, sampleTokenStream2} from "./sim_data/sample-streams";
import {verifiedDaos} from "../preload/verified-daos";
import {daoAddressMap} from "./sim_data/dao-collection-map";

// randomizers
let selectRandom = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)];

// simulated implementations
let connectOwner: pic.ConnectOwner = (owner: pic.Owner) => {
    // Note: this call does NOT fetch stream data for DAOs
    const owner_address = owner.address;
    const NUM_DAOS = 8;
    let daos: Array<pic.Dao> = [];
    for (let i = 0; i < NUM_DAOS; i++){
        daos.push(selectRandom(verifiedDaos));
    }
    for (let dao of daos){
        dao.address = Keypair.generate().publicKey;
        dao.is_member = true;
    }
    let daoIds = daos.map((dao, _) => dao.dao_id);
    let collections: Array<pic.Collection> = [];
    let nfts: Array<pic.Nft> = [];
    for (const daoId of daoIds){
        const collection_address = new PublicKey(daoAddressMap[daoId]);
        const dao_collection = {address: collection_address};
        collections.push(dao_collection);
        const data = daoMap[daoId];
        if (data === undefined){
        }
        else {
            for (const nftData of data){
                nfts.push({
                    address: Keypair.generate().publicKey,
                    owner_address: owner_address,
                    stake: undefined,
                    name: nftData.name,
                    image_url: nftData.image_url,
                    collection: dao_collection,
                })
            }
        }
    }
    let newOwner: pic.Owner = {
        address: owner_address,
        daos: daos,
        collections: collections,
        nfts: nfts,
    }
    return newOwner;
}

let getDaos: pic.GetDaos = (daos: Array<pic.Dao>) => {
    // with 50% chance, add two streams, else keep undefined
    for (const dao of daos){
        // let daoAddress: PublicKey = new PublicKey(daoAddressMap[dao.dao_id]);
        let daoAddress = daoAddressMap[dao.dao_id];

        let rando = Math.random();
        if (rando < .3){ // TODO change this back to 0.5
            dao.streams = [
                {
                    address: Keypair.generate().publicKey,
                    dao_address: dao.address,
                    collections: [{address:new PublicKey(daoAddress)}],
                    is_active: true,
                    num_connections: sampleTokenStream1.num_subscribers,
                    name: sampleTokenStream1.stream_name,
                    token_image_url: sampleTokenStream1.token_image_url,
                    daily_stream_rate: sampleTokenStream1.daily_stream_rate,
                    total_earned: sampleTokenStream1.earned_amount,
                    total_claimed: sampleTokenStream1.claimed_amount,
                    current_pool_amount: sampleTokenStream1.pool_reserve_amount,
                    token_ticker: sampleTokenStream1.token_ticker,
                    last_update_timestamp: Math.floor(Date.now()/1000),
                },
                {
                    address: Keypair.generate().publicKey,
                    dao_address: dao.address,
                    collections: [{address:new PublicKey(daoAddress)}],
                    is_active: true,
                    num_connections: sampleTokenStream2.num_subscribers,
                    name: sampleTokenStream2.stream_name,
                    token_image_url: sampleTokenStream2.token_image_url,
                    daily_stream_rate: sampleTokenStream2.daily_stream_rate,
                    total_earned: sampleTokenStream2.earned_amount,
                    total_claimed: sampleTokenStream2.claimed_amount,
                    current_pool_amount: sampleTokenStream2.pool_reserve_amount,
                    token_ticker: sampleTokenStream2.token_ticker,
                    last_update_timestamp: Math.floor(Date.now()/1000),
                },
            ];
        }
        else if (rando < .8) {
            dao.streams = [
                {
                    address: Keypair.generate().publicKey,
                    dao_address: dao.address,
                    collections: [{address:new PublicKey(daoAddress)}],
                    is_active: true,
                    num_connections: sampleTokenStream1.num_subscribers,
                    name: sampleTokenStream1.stream_name,
                    token_image_url: sampleTokenStream1.token_image_url,
                    daily_stream_rate: sampleTokenStream1.daily_stream_rate,
                    total_earned: sampleTokenStream1.earned_amount,
                    total_claimed: sampleTokenStream1.claimed_amount,
                    current_pool_amount: sampleTokenStream1.pool_reserve_amount,
                    token_ticker: sampleTokenStream1.token_ticker,
                    last_update_timestamp: Math.floor(Date.now()/1000),
                },
            ];

        }
        else {
            dao.streams = [];
        }
    }
    return daos;
};

// RPCs

let stakeNft: pic.StakeNFT = (nft: pic.Nft) => {
    // for now just create a stake and add it to the nft
    nft.stake = {
        address: Keypair.generate().publicKey,
        connections: [],
        is_active: true,
    }
    return nft;
};

let unstakeNft: pic.UnstakeNft = (nft: pic.Nft) => {
    nft.stake.is_active = false;
    return nft;
};

let connectToStream: pic.ConnectToStream = (nft: pic.Nft, stream: pic.Stream) => {
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

let disconnectFromStream: pic.DisconnectFromStream = (nft: pic.Nft, conn: pic.Connection, stream: pic.Stream) => {
    conn.is_active = false;
    stream.num_connections -= 1;
    return {nft, conn, stream};
};

let claimFromStream: pic.ClaimFromStream = (conn: pic.Connection, stream: pic.Stream) => {
    // NOTE: we assume that we are updating total earned / streamed locally
    let amount_to_claim = conn.total_earned - conn.total_claimed;
    conn.total_claimed += amount_to_claim;
    stream.total_claimed += amount_to_claim;
    return {conn, stream};
};


export {connectOwner, getDaos, stakeNft, unstakeNft, connectToStream, disconnectFromStream, claimFromStream};

