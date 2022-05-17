/*
Read-only requests to the solana cluster
 */

import { PublicKey } from "@solana/web3.js";
import * as spl_token from "libs/spl-token";
import {
  CONNECTION_PDA_SEED,
  initProgram,
  STAKE_PDA_SEED,
} from "./rpc_helpers";
import * as pic from "../pic";

export enum StakeAccountStatus {
  NOT_INITIALIZED,
  INITIALIZED_NOT_ACTIVE,
  INITIALIZED_AND_ACTIVE,
}

export async function checkIfStakeExists(
  nft: pic.Nft,
  wallet,
  network,
  ownerAddress,
  nftMintPubkey
): Promise<{
  stakeAccountStatus: StakeAccountStatus;
  stakeAddress: PublicKey | undefined;
  numConnections?: number;
}> {
  let program = await initProgram(wallet, network);
  const [stake_pda] = await PublicKey.findProgramAddress(
    [
      ownerAddress.toBuffer(),
      nftMintPubkey.toBuffer(),
      Buffer.from(STAKE_PDA_SEED),
    ],
    program.programId
  );
  let stakeAccountStatus: StakeAccountStatus;
  let numConnections = undefined;
  try {
    const stakeAccount = await program.account.stake.fetch(stake_pda);
    if (stakeAccount.isActive) {
      stakeAccountStatus = StakeAccountStatus.INITIALIZED_AND_ACTIVE;
      numConnections = stakeAccount.numConnections.toNumber();
    } else {
      stakeAccountStatus = StakeAccountStatus.INITIALIZED_NOT_ACTIVE;
    }
  } catch (e) {
    let accountDoesNotExistError = e
      .toString()
      .includes("Account does not exist");
    if (!accountDoesNotExistError) {
      alert("got unknown type of error: " + e);
    }
    stakeAccountStatus = StakeAccountStatus.NOT_INITIALIZED;
  }
  return {
    stakeAccountStatus: stakeAccountStatus,
    stakeAddress: stake_pda,
    numConnections: numConnections,
  };
}

export async function checkIfConnectionExists(
  wallet,
  network,
  stake_pda,
  streamAddress,
  decimals,
  dailyStreamRateRelative
): Promise<pic.Connection | undefined> {
  let program = await initProgram(wallet, network);
  const [connection_pda] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      streamAddress.toBuffer(),
      Buffer.from(CONNECTION_PDA_SEED),
    ],
    program.programId
  );
  try {
    const connectionAccount = await program.account.connection.fetch(
      connection_pda
    );
    const div_factor = Math.pow(10, decimals);
    let totalEarned = connectionAccount.totalEarned.toNumber() / div_factor;
    let newConnection: pic.Connection = {
      address: connection_pda,
      stream_address: streamAddress,
      total_claimed: connectionAccount.totalClaimed.toNumber() / div_factor,
      total_earned: totalEarned,
      last_update_timestamp: connectionAccount.lastUpdateTimestamp.toNumber(),
      is_active: connectionAccount.isActive,
    };
    return newConnection;
  } catch (e) {
    let accountDoesNotExistError = e
      .toString()
      .includes("Account does not exist");
    if (!accountDoesNotExistError) {
      console.log("got unknown type of error: " + e); // ga
    }
  }
  return undefined;
}

export async function getStream(wallet, network, stream: pic.Stream) {
  let program = await initProgram(wallet, network);
  const streamAccount = await program.account.stream.fetch(stream.address);
  const tokenMintAddress: PublicKey = streamAccount.tokenMintAddress;
  const tokenPoolAddress: PublicKey = streamAccount.tokenPoolAddress;
  let tokenMint: spl_token.Mint = await spl_token.getMint(
    program.provider.connection,
    tokenMintAddress
  );
  let poolAccount = await spl_token.getAccount(
    program.provider.connection,
    tokenPoolAddress
  );
  const decimals = tokenMint.decimals;
  const divFactor = Math.pow(10, decimals);
  const poolAmount = Number(poolAccount.amount) / divFactor;
  const isActive = streamAccount.isActive;
  const lastUpdateTimestamp = streamAccount.lastUpdateTimestamp.toNumber();
  const numConnections = streamAccount.numConnections.toNumber();
  const totalClaimed = streamAccount.totalClaimed.toNumber() / divFactor;
  const totalStreamed = streamAccount.totalStreamed.toNumber() / divFactor;

  stream.num_connections = numConnections;
  stream.is_active = isActive;
  stream.total_earned = totalStreamed;
  stream.total_claimed = totalClaimed;
  stream.current_pool_amount = poolAmount;
  stream.last_update_timestamp = lastUpdateTimestamp;
  stream.decimals = decimals;

  return stream;
}

export async function getConn(wallet, network, conn: pic.Connection, decimals) {
  let program = await initProgram(wallet, network);
  const connAccount = await program.account.connection.fetch(conn.address);
  const divFactor = Math.pow(10, decimals);
  const totalClaimed = connAccount.totalClaimed.toNumber() / divFactor;
  const totalStreamed = connAccount.totalEarned.toNumber() / divFactor;
  const isActive = connAccount.isActive;
  const lastUpdateTimestamp = connAccount.lastUpdateTimestamp.toNumber();
  conn.is_active = isActive;
  conn.total_earned = totalStreamed;
  conn.total_claimed = totalClaimed;
  conn.last_update_timestamp = lastUpdateTimestamp;
  return conn;
}

export async function getStake(wallet, network, stake: pic.Stake) {
  let program = await initProgram(wallet, network);
  const stakeAccount = await program.account.stake.fetch(stake.address);
  let numConnections = stakeAccount.numConnections.toNumber(); // NOTE, how to filter connection correctly?
  const isActive = stakeAccount.isActive;
  stake.is_active = isActive;
  stake.num_connections = numConnections;
  return { stake, numConnections };
}

export async function refreshStake(wallet, network, stake: pic.Stake) {
  // TODO
  let program = await initProgram(wallet, network);
  const stakeAccount = await program.account.stake.fetch(stake.address);
  let numConnections = stakeAccount.numConnections.toNumber(); // NOTE, how to filter connection correctly?
  const isActive = stakeAccount.isActive;
  stake.is_active = isActive;
  stake.num_connections = numConnections;
  return { stake, numConnections };
}

//this function get dao from chain, that is, governance in UI.
export async function getDaoFromChain(wallet, network, dao: pic.Dao) {
  let program = await initProgram(wallet, network);
  try {
    // const daoAccount = await program.account.dao.fetch(
    //   new PublicKey("4s4kQAiVYMR4iLNsUMDty5cmBgMo226ifR8eCrKS6j8d")
    // ); //This works well. This address is from belac 
    const daoAccount = await program.account.dao.fetch(dao.address); //wallet address, that is, the owner's address
    //consider return value's type
    const councillors = await daoAccount.councillors;
    const approvalThreshold=await daoAccount.approvalThreshold;
    const proposalSigners = await daoAccount.proposalSigners;
    const proposalIsActive = await daoAccount.proposalIsActive;
    const proposalType = await daoAccount.proposalType;
    const proposedCouncillors = await daoAccount.proposedCouncillors;
    const proposedApprovalThreshold =
      await daoAccount.proposedApprovalThreshold;
    const proposedDeactivationStream =
      await daoAccount.proposedDeactivationStream;
    const proposedWithdrawalAmount = await daoAccount.proposedWithdrawalAmount;
    const proposedwithdrawalReceiverOwner =
      await daoAccount.proposedwithdrawalReceiverOwner;
    const proposedWithdrawalStream = await daoAccount.proposedWithdrawalStream;
    const numStreams = await daoAccount.numStreams;

    let governance: pic.Governance = {
      councillors: councillors,
      approval_threshold: approvalThreshold,
      proposed_signers: proposalSigners,
      proposal_is_active: proposalIsActive,
      proposal_type: proposalType,
      proposed_councillors: proposedCouncillors,
      proposed_approval_threshold: proposedApprovalThreshold,
      proposed_deactivation_stream:proposedDeactivationStream,
      proposed_withdrawal_amount: proposedWithdrawalAmount,
      proposed_withdrawal_receiver: proposedwithdrawalReceiverOwner,
      proposed_withdrawal_stream: proposedWithdrawalStream,
      num_streams: numStreams,
    };
    dao.governance=governance;
    console.log("-onchain-data-helper.ts");
    console.log("councillors", councillors);
    console.log("proposalSigners", proposalSigners);
    console.log("proposalIsActive", proposalIsActive);
    console.log("proposalType", proposalType);
    console.log("proposedCouncillors", proposedCouncillors);
    console.log("counciproposedCouncillorsllors", proposedCouncillors);
    console.log("proposedApprovalThreshold", proposedApprovalThreshold);
    console.log("proposedDeactivationStream", proposedDeactivationStream);
    console.log("proposedWithdrawalAmount", proposedWithdrawalAmount);
    console.log(
      "proposedwithdrawalReceiverOwner",
      proposedwithdrawalReceiverOwner
    );
    console.log("proposedWithdrawalStream", proposedWithdrawalStream);
    console.log("numStreams", numStreams);
  } catch (e) {
    console.log(e.toString());
  }
  
  return dao;
}
