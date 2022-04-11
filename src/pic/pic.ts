/*
Program Interface Contract

A Program Interface Contract (PIC) is an API definition written using shared application primitives (saps).
It describes all valid calls the one program can make to an external program, including:
    - Call input types and sizes
    - Response types and sizes (including failures)
    - Acceptable response times

Notes:
    - A PIC is stateless, any persistent memory is to be managed by partner programs independently.
    - A PIC should be about one page. If a larger PIC is required, programs should be refactored into smaller programs.
 */
import {PublicKey} from "@solana/web3.js";

// aliases

// saps
export type Owner = {address?: PublicKey, daos?: Array<Dao>, collections?: Array<Collection>, nfts?: Array<Nft>};
export type Nft = {address: PublicKey, owner_address: PublicKey, name: string, image_url: string, collection: Collection, stake?: Stake};
export type Collection = {address: PublicKey};
export type Dao = {address?: PublicKey, dao_id: string, display_name: string, image_url: string, streams?: Array<Stream>, num_nfts: number, is_member: boolean};
export type Stake = {address: PublicKey, is_active: boolean, connections?: Array<Connection>};
export type Connection = {address: PublicKey, stream_address: PublicKey, total_earned: number, total_claimed: number, is_active: boolean, last_update_timestamp: number};
export type Stream = {
    address: PublicKey, dao_address: PublicKey, collections: Array<Collection>, num_connections: number,
    is_active: boolean, name: string, token_image_url: string, daily_stream_rate: number,
    total_earned: number, total_claimed: number, current_pool_amount: number, token_ticker: string,
    last_update_timestamp: number,
};

// calls
export type ConnectOwner = (owner: Owner) => Owner;
export type GetDaos = (daos: Array<Dao>) => Array<Dao>;
export type StakeNFT = (nft: Nft) => Nft;
export type UnstakeNft = (nft: Nft) => Nft;
export type ConnectToStream = (nft: Nft, stream: Stream) => {nft: Nft, stream: Stream};
export type DisconnectFromStream = (nft: Nft, conn: Connection, stream: Stream) => {nft: Nft, conn:Connection, stream: Stream};
export type ClaimFromStream = (conn: Connection, stream: Stream) => {conn: Connection, stream: Stream};

// fails