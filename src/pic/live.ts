/*
Live implementation of PIC which get and sets data on the solana blockchain and our MirrorScan SQL Database
 */
import * as pic from "./pic";
import {Keypair, PublicKey} from "@solana/web3.js";
import {verifiedDaos} from "../preload/verified-daos";





// pure database queries
let connectOwner: pic.ConnectOwner = (owner: pic.Owner) => {
    return {};
}

let getDaos: pic.GetDaos = (daos: Array<pic.Dao>) => {
    return [];
};

// RPCs

// let stakeNft: pic.StakeNFT = (nft: pic.Nft) => {
// };
//
// let unstakeNft: pic.UnstakeNft = (nft: pic.Nft) => {
// };
//
// let connectToStream: pic.ConnectToStream = (nft: pic.Nft, stream: pic.Stream) => {
// };
//
// let disconnectFromStream: pic.DisconnectFromStream = (nft: pic.Nft, conn: pic.Connection, stream: pic.Stream) => {
// };
//
// let claimFromStream: pic.ClaimFromStream = (conn: pic.Connection, stream: pic.Stream) => {
// };
//
//
// export {connectOwner, getDaos, stakeNft, unstakeNft, connectToStream, disconnectFromStream, claimFromStream};
export {};