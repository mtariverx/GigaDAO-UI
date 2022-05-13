/*
HTTP requests to our MirrorScanAPI server for getting, setting, and updating the MySQL Database.
 */
import * as pic from "../pic";
import { PublicKey, Keypair } from "@solana/web3.js";
// conf
const prod = true; // TODO

// consts
const LOCAL_BASE_URL: string = "http://localhost:3000/dev/";
const PROD_BASE_URL: string =
  "https://49pfqp5pxk.execute-api.us-east-1.amazonaws.com/dev/";
const BASE_URL: string = prod ? PROD_BASE_URL : LOCAL_BASE_URL;

// READ ONLY METHODS

export async function getOwner(owner_address: string) {
  const URL = BASE_URL + "get_owner?owner_address=" + owner_address;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  console.log("mirror getOwner=",data);
  return data;
}

export async function getDaoStreams(daos: Array<pic.Dao>): Promise<any> {
  let daoAddresses = [];
  for (const dao of daos) {
    if (dao.address) {
      daoAddresses.push(dao.address.toString());
    }
  }
  const addressesString = daoAddresses.join(",");
  const URL = BASE_URL + "get_dao_streams?dao_addresses=" + addressesString;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function getMembers(owner_address: string) {
  console.log("mirror-getMembers=", owner_address);
  const URL = BASE_URL + "get_member_daos?owner_address=" + owner_address;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

// WRITE / UPDATE METHODS
export async function initializeDAO(dao: pic.Dao) {
  console.log("mirror-initializeDAO=", dao.address.toString());
  const dao_address = dao.address.toString();
  const dao_id = dao.dao_id;
  const display_name = dao.display_name;
  const image_url = dao.image_url;
  const num_streams = 0;
  console.log("insert query=",`insert_dao?dao_address=${dao_address}&dao_id=${dao_id}&display_name=${display_name}&image_url=${image_url}&num_streams=${num_streams}`)
  const URL =
    BASE_URL +
    `insert_dao?dao_address=${dao_address}&dao_id=${dao_id}&display_name=${display_name}&image_url=${image_url}&num_streams=${num_streams}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
  // return {};
}

export async function insertCouncillors(dao: pic.Dao) {
    console.log("mirror insertCouncillor=",dao);
  const dao_address = dao.address.toString();
  const governance = dao.governance;
  const councillors = governance.councillors;
  const add_remove = true;
  let result: any = [];
  for (const councillor of councillors) {
      console.log("-mirror counciilor-",`update_dao_councillor?dao_address=${dao_address}&owner_address=${councillor.toString()}&add_remove=${add_remove}`);
    const URL =
      BASE_URL +
      `update_dao_councillor?dao_address=${dao_address}&owner_address=${councillor.toString()}&add_remove=${add_remove}`;
    const response = await fetch(URL, { mode: "cors" });
    const data = await response.json();
    console.log("insert councillor=",data);
    result.push(data);
  }
  return result;
}

export async function insertNewStream(stream: pic.Stream) {
  // stream_address, dao_address, token_image_url, stream_rate_relative, is_active, num_connections,
  // total_streamed, last_update_timestamp, stream_name, token_ticker)
  const stream_address = stream.address;
  const dao_address = stream.dao_address;
  const token_image_url = stream.token_image_url;
  const stream_rate_relative = stream.daily_stream_rate;
  const is_active = stream.is_active;
  const num_connections = stream.num_connections;
  const total_streamed = stream.total_earned;
  const last_update_timestamp = 0;
  const stream_name = stream.name;
  const token_ticker = stream.token_ticker;
  const URL =
    BASE_URL +
    `insert_stream?stream_address=${stream_address.toString()}&dao_address=${dao_address.toString()}&token_image_url=${token_image_url}&stream_rate_relative=${stream_rate_relative}
    &is_active=${is_active}&num_connections=${num_connections}&total_streamed=${total_streamed}&last_update_timestamp=${last_update_timestamp}
    &stream_name=${stream_name}&token_ticker=${token_ticker}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}
export async function insertNewStake(
  stakeAddress: PublicKey,
  ownerAddress: PublicKey,
  mintAddress: PublicKey
) {
  const URL =
    BASE_URL +
    `insert_new_stake?stake_address=${stakeAddress.toString()}&owner_address=${ownerAddress.toString()}&mint_address=${mintAddress.toString()}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function updateStake(stakeAddress, isActive, numConnections) {
  const URL =
    BASE_URL +
    `update_stake?stake_address=${stakeAddress.toString()}&is_active=${isActive}&num_connections=${numConnections}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function insertNewConnection(
  connectionAddress,
  ownerAddress,
  stakeAddress,
  streamAddress,
  daoAddress
) {
  const URL =
    BASE_URL +
    `insert_new_connection?connection_address=${connectionAddress.toString()}&owner_address=${ownerAddress.toString()}&stake_address=${stakeAddress.toString()}&stream_address=${streamAddress.toString()}&dao_address=${daoAddress.toString()}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function updateConnection(connectionAddress, isActive) {
  const URL =
    BASE_URL +
    `update_connection?connection_address=${connectionAddress.toString()}&is_active=${isActive}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function updateStream(
  streamAddress,
  isActive,
  numConnections,
  totalStreamed,
  lastUpdateTimestamp
) {
  const URL =
    BASE_URL +
    `update_stream?stream_address=${streamAddress.toString()}&is_active=${isActive}&num_connections=${numConnections}&total_streamed=${totalStreamed}&last_update_timestamp=${lastUpdateTimestamp}`;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function forceSyncStakes(owner_address: string) {
  const URL = BASE_URL + "force_sync_stakes?owner_address=" + owner_address;
  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  return data;
}
