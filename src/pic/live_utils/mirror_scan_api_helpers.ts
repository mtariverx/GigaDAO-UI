/*
HTTP requests to our MirrorScanAPI server for getting, setting, and updating the MySQL Database.
 */
import * as pic from "../pic";

async function fetchStreamData(daos: Array<pic.Dao>): Promise<any> {
    const addressesString = "";
    const url = 'https://49pfqp5pxk.execute-api.us-east-1.amazonaws.com/dev/get_streams?dao_address=' + addressesString;
    const response = await fetch(url, {mode: 'cors'})
    const data = await response.json();
    return data.streams;
}
