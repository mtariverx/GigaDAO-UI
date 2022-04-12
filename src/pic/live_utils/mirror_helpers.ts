/*
HTTP requests to our MirrorScanAPI server for getting, setting, and updating the MySQL Database.
 */
import * as pic from "../pic";

// conf
const prod = false; // TODO

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

export async function insertNewStake(){}

export async function updateStake(){}

export async function insertNewConnection(){}

export async function updateConnection(){
    /*
    Three different possibilities, its connect, disconnect, or claim - consider them all, probably with a single server endpoint.
     */
    // on success update
    // 1) connection row,
    // 2) stream row, and
    // 3) stake row in mirror
}
