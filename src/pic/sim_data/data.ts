import {PublicKey} from "@solana/web3.js";
import * as pic from "../pic";

let samplePubkey = new PublicKey("Ba5ZQRTAGbgTdRLjgtvsNwipRMW2yhidWTQ9jDqJePim");


let sampleCollection: pic.Collection = {
    address: new PublicKey("")
};

let sampleStake: pic.Stake = {
    address: new PublicKey(""),
    connections: [],
    is_active: true,
}

let sampleNft: pic.Nft = {
    address: new PublicKey(""),
    owner_address: new PublicKey(""),
    stake: sampleStake,
    name: "",
    image_url: "",
    collection: sampleCollection,
}

// fails
export {samplePubkey};
