// PIC
import { PublicKey } from "@solana/web3.js";

// saps
export type Owner = {address?: PublicKey, daos?: Array<Dao>, collections?: Array<Collection>, nfts?: Array<Nft>};
export type Nft = {address: PublicKey, owner_address: PublicKey, name: string, image_url: string, collection: Collection, token_account?: PublicKey, stake?: Stake, wallet?, network?}; // TODO this is an ugly addition of connection params - hide them
export type Collection = {address: PublicKey};
export type Stake = {address: PublicKey, is_active: boolean, connections?: Array<Connection>, num_connections?: number};
export type Connection = {address: PublicKey, stream_address: PublicKey, total_earned: number, total_claimed: number, is_active: boolean, last_update_timestamp: number, wallet?};
export type Dao = {address?: PublicKey, governance?: Governance, dao_id?: string, display_name?: string, image_url?: string, streams?: Array<Stream>, num_nfts?: number, is_member?: boolean};
export type Stream = {
    address: PublicKey, dao_address: PublicKey, collections: Array<Collection>, num_connections: number,
    is_active: boolean, name: string, token_image_url: string, daily_stream_rate: number,
    total_earned: number, total_claimed: number, current_pool_amount: number, token_ticker: string,
    last_update_timestamp: number, decimals?: number,
};

export type Governance = {
  councillors: Array<PublicKey>;
  approval_threshold: number;
  proposed_signers: Array<boolean>;
  proposal_is_active: boolean;
  proposal_type: ProposalType;
  proposed_councillors?: Array<PublicKey>;
  proposed_approval_threshold?: number;
  proposed_deactivation_stream?: PublicKey;
  proposed_withdrawal_amount?: number;
  proposed_withdrawal_receiver: PublicKey;
  proposed_withdrawal_stream?: PublicKey;
  num_streams: number;
};

// owner calls
export type ConnectOwner = (owner: Owner) => Promise<Owner>;
export type GetDaos = (daos: Array<Dao>) => Promise<Array<Dao>>;
export type RefreshNft = (nft: Nft) => Promise<{nft?: Nft}>;
export type StakeNFT = (nft: Nft) => Promise<{nft?:Nft}>;
export type UnstakeNft = (nft: Nft) => Promise<{nft?:Nft}>;
export type ConnectToStream = (nft: Nft, stream: Stream) => Promise<{nft?: Nft, stream: Stream, conn?: Connection}>;
export type DisconnectFromStream = (nft: Nft, conn: Connection, stream: Stream) => Promise<{nft?: Nft, conn:Connection, stream: Stream}>;
export type ClaimFromStream = (nft: Nft, stake: Stake, conn: Connection, stream: Stream) => Promise<{conn?: Connection, stream?: Stream}>;
export type UpdateStreamAndConnection = (nft: Nft, stream: Stream) => Promise<{nft?: Nft, stream?: Stream, conn?: Connection}>;

//TODO KAIMING - please implement the following calls in sim.ts only.

// councillor calls
export enum ProposalType {
  UPDATE_MULTISIG,
  DEACTIVATE_STREAM,
  WITHDRAW_FROM_STREAM,
}

export type GetMemberDaos = (owner: Owner) => Promise<Array<Dao>>; // retrieves list of daos that owner is a councillor of, but does not lookup Governance data
export type RefreshGovernance = (dao: Dao) => Promise<Dao>; // gets the latest Governance data directly from the blockchain
export type InitializeDao = (dao: Dao) => Promise<Dao>; //create new Dao
export type InitializeStream = (
  dao: Dao,
  stream: Stream
) => Promise<{ dao: Dao; stream: Stream }>;
export type ReactivateStream = (
  dao: Dao,
  stream: Stream
) => Promise<{ dao: Dao; stream: Stream }>;
export type ProposeDaoCommand = (dao: Dao) => Promise<Dao>; // all relevant args should be included in the governance object of the dao passed into this call
export type ApproveDaoCommand = (dao: Dao) => Promise<Dao>;
export type ExecuteDaoCommand = (dao: Dao) => Promise<Dao>;

//KAIMING's self TODO list
export type social_type = {
  website: string;
  twitter: string;
  discord: string;
};
export type SaveSocial = (social: social_type) => Promise<social_type>;

//DAO structure in smart contract is the same with Governance here
//define SPLTokenStream
export type SPLTokenStream = {
  dao_address: PublicKey;
  token_mint_address: PublicKey;
  token_pool_address: PublicKey;
  verified_creator_addresses: Array<PublicKey>;
  stream_rate: number;
  is_simulation: boolean;
  is_active: boolean;
  num_connections: number;
  total_streamed: number;
  total_claimed: number;
  last_update_timestamp: number;
};
export type CreateSPLToken = (splTokenStream: SPLTokenStream) => Promise<void>;
