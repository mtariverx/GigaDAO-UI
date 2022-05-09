/*
HTTP requests to our MirrorScanAPI server for getting, setting, and updating the MySQL Database.
 */
import * as pic from "../pic";
import {PublicKey} from "@solana/web3.js";

// conf
const prod = true; // TODO

// consts
const LOCAL_BASE_URL: string = "http://localhost:3000/dev/"
const PROD_BASE_URL: string = "https://49pfqp5pxk.execute-api.us-east-1.amazonaws.com/dev/"
const BASE_URL: string = prod ? PROD_BASE_URL : LOCAL_BASE_URL;

// READ ONLY METHODS

export async function getOwner(owner_address: string){
    const URL = BASE_URL + "get_owner?owner_address=" + owner_address;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function getDaoStreams(daos: Array<pic.Dao>): Promise<any> {
    let daoAddresses = [];
    for (const dao of daos){
        if (dao.address){
            daoAddresses.push(dao.address.toString());
        }
    }
    const addressesString = daoAddresses.join(",")
    const URL = BASE_URL + 'get_dao_streams?dao_addresses=' + addressesString;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

// WRITE / UPDATE METHODS

export async function insertNewStake(stakeAddress: PublicKey, ownerAddress: PublicKey, mintAddress: PublicKey){
    const URL = BASE_URL + `insert_new_stake?stake_address=${stakeAddress.toString()}&owner_address=${ownerAddress.toString()}&mint_address=${mintAddress.toString()}`
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function updateStake(stakeAddress, isActive, numConnections){
    const URL = BASE_URL + `update_stake?stake_address=${stakeAddress.toString()}&is_active=${isActive}&num_connections=${numConnections}`;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function insertNewConnection(connectionAddress, ownerAddress, stakeAddress, streamAddress, daoAddress){
    const URL = BASE_URL + `insert_new_connection?connection_address=${connectionAddress.toString()}&owner_address=${ownerAddress.toString()}&stake_address=${stakeAddress.toString()}&stream_address=${streamAddress.toString()}&dao_address=${daoAddress.toString()}`;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function updateConnection(connectionAddress, isActive){
    const URL = BASE_URL + `update_connection?connection_address=${connectionAddress.toString()}&is_active=${isActive}`;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function updateStream(streamAddress, isActive, numConnections, totalStreamed, lastUpdateTimestamp){
    const URL = BASE_URL + `update_stream?stream_address=${streamAddress.toString()}&is_active=${isActive}&num_connections=${numConnections}&total_streamed=${totalStreamed}&last_update_timestamp=${lastUpdateTimestamp}`;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}

export async function forceSyncStakes(owner_address: string){
    const URL = BASE_URL + "force_sync_stakes?owner_address=" + owner_address;
    const response = await fetch(URL, {mode: 'cors'})
    const data = await response.json();
    return data;
}


