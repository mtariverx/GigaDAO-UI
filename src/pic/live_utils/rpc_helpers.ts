/*
Helpers for making rpc calls to gigadao staking contract v1
 */
import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "libs/spl-token";
import * as spl_token from "libs/spl-token";
import * as pic from "../pic";

// pda seeds
export const TOKEN_POOL_PDA_SEED = "token_pool_pda_seed";
export const NFT_VAULT_PDA_SEED = "nft_account_pda_seed";
export const DAO_AUTH_PDA_SEED = "dao_auth_pda_seed";
export const STAKE_AUTH_PDA_SEED = "stake_auth_pda_seed";
export const METADATA_PREFIX = "metadata";
export const STAKE_PDA_SEED = "stake_pda_seed";
export const CONNECTION_PDA_SEED = "connection_pda_seed";
const FEE_CONTROLLER_PDA_SEED = "fee_controller";
export const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const FEE_RX_ADDRESS = new PublicKey(
  "Dxrxa39vtAWb5XeLyqo8SDMMULXfNtZ7hA2sE3NE3ZEk"
);
let fee_controller: PublicKey = null;
let tokenPool: PublicKey = null;
let receiverTokenAccount: PublicKey = null;
let daoAuthPda: PublicKey = null;

export async function initProgram(wallet: anchor.Wallet, network: string) {
  try {
    // INIT Web3 Connection Objects
    const PROGRAM_ID = "AGi7p8RritzUDX4sCYVfxApCH4By8FEpSV4ffL7bZ8Kp";
    const programId = new anchor.web3.PublicKey(PROGRAM_ID);
    let opts = anchor.Provider.defaultOptions();
    let connection = new anchor.web3.Connection(
      network,
      opts.preflightCommitment
    );
    let provider = new anchor.Provider(connection, wallet, opts);
    let idl = await anchor.Program.fetchIdl(programId, provider);
    let program = new anchor.Program(idl, programId, provider);
    return program;
  } catch (e) {
    throw e;
    console.log("initProgram error");
    console.log(e);
  }
}
export async function approveDaoCommand(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  let program = await initProgram(wallet, network);
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  try {
    await program.rpc.approveDaoCommand({
      accounts: {
        signer: wallet.publicKey,
        dao: dao.address,
        feeReceiverAddress: FEE_RX_ADDRESS,
        feeController: fee_controller,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
    });
    console.log("approveDaoCommand sucess");
  } catch (e) {
    throw e;
    console.log(e);
  }
}
export async function initializeDAO(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  console.log("I am initializeDAO in rpc_helper");
  let program = await initProgram(wallet, network);

  let [daoAuthPda] = await PublicKey.findProgramAddress(
    [
      dao.dao_keypair.publicKey.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED)),
    ],
    program.programId
  );
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  let councillors = dao.governance.councillors;
  let approval_threshold = 1;

  try {
    await program.rpc.initializeDao(
      councillors,
      new anchor.BN(approval_threshold),
      {
        accounts: {
          signer: wallet.publicKey,
          dao: dao.dao_keypair.publicKey,
          daoAuthPda: daoAuthPda,
          feeReceiverAddress: FEE_RX_ADDRESS,
          feeController: fee_controller,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [dao.dao_keypair],
      }
    );

    console.log("initial dao transaction is okay");
    // return true;
  } catch (e) {
    throw e;
    console.log(e);
    // return false;
  }
}
export async function proposeDaoCommand(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  let program = await initProgram(wallet, network);

  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  try {
    let proposal_type = new anchor.BN(dao.governance.proposal_type);
    let proposed_councillors = dao.governance.proposed_councillors;
    let proposed_approval_threshold = new anchor.BN(
      dao.governance.proposed_approval_threshold
    );
    let proposed_deactivation_stream =
      dao.governance.proposed_deactivation_stream;
    let proposed_withdraw_amount = new anchor.BN(
      dao.governance.proposed_withdrawal_amount
    );
    let proposed_withdraw_receiver_owner =
      dao.governance.proposed_withdrawal_receiver;
    let proposed_withdraw_stream = dao.governance.proposed_withdrawal_stream;
    await program.rpc.proposeDaoCommand(
      proposal_type,
      proposed_councillors,
      proposed_approval_threshold,
      proposed_deactivation_stream,
      proposed_withdraw_amount,
      proposed_withdraw_receiver_owner,
      proposed_withdraw_stream,
      {
        accounts: {
          signer: wallet.publicKey,
          dao: dao.address,
          feeReceiverAddress: FEE_RX_ADDRESS,
          feeController: fee_controller,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
    console.log("proposeDaoCommand success");
  } catch (e) {
    throw e;
    console.log(e);
  }
}

export async function executeUpdateDaoMultisig(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  let program = await initProgram(wallet, network);
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  try {
 
    await program.rpc.executeUpdateDaoMultisig({
      accounts: {
        signer: wallet.publicKey,
        dao: dao.address,
        feeReceiverAddress: FEE_RX_ADDRESS,
        feeController: fee_controller,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
    });
    console.log("executeUpdateDaoMultisig success");
  } catch (e) {
    throw e;
    console.log(e);
  }
}

export async function executeDeactivateStream(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  let program = await initProgram(wallet, network);
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  try {
    [tokenPool] = await PublicKey.findProgramAddress(
      [
        dao.governance.proposed_deactivation_stream.toBuffer(), //kaiming not sure
        // dao.address.toBuffer(),
        Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
      ],
      program.programId
    );

    await program.rpc.executeDeactivateStream({
      accounts: {
        signer: wallet.publicKey,
        dao: dao.address,
        stream: dao.governance.proposed_deactivation_stream, //deactivate stream pubkey
        tokenPool: tokenPool,
        feeReceiverAddress: FEE_RX_ADDRESS,
        feeController: fee_controller,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
    });
    console.log("executeDeactivateStream success");
  } catch (e) {
    throw e;
    console.log(e);
  }
}

export async function executeWithdrawFromStream(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao
) {
  let program = await initProgram(wallet, network);
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  [tokenPool] = await PublicKey.findProgramAddress(
    [
      dao.governance.proposed_withdrawal_stream.toBuffer(), //kaiming not sure
    //   dao.governance.proposed_deactivation_stream.toBuffer(), //kaiming not sure
    
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );
  [daoAuthPda] = await PublicKey.findProgramAddress(
    [
      dao.address.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED)),
    ],
    program.programId
  );
  try {
    console.log("I'm executeWithdrawFromStream");
    console.log("signer=",wallet.publicKey.toString());
    console.log("dao=",dao.address.toString());
    console.log("stream=",dao.governance.proposed_withdrawal_stream.toString());
    console.log("token pool=", tokenPool.toString());
    console.log("receiverTokenAccount=", dao.governance.proposed_withdrawal_receiver.toString());
    console.log("daoAuthPda=", daoAuthPda.toString());
    
    // dao.governance.proposed_withdrawal_receiver=new PublicKey("HLS5Y68QSQgJP7wUbbbbCjEnMknVZrHXYDwwVaDcsdK7");
    // dao.governance.proposed_withdrawal_receiver=new PublicKey("5F1xSVrk8JuZj2qCqYupKjwzUFhYDJZoVZoJWR9JpxPB");
    // // AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB
    // dao.governance.proposed_withdrawal_stream=new PublicKey("69Uw1pMckp6PLoQf32Kp8RjQ3QxayzsBseUuGxyC4dsK");
    // tokenPool=new PublicKey("HLS5Y68QSQgJP7wUbbbbCjEnMknVZrHXYDwwVaDcsdK7");
    await program.rpc.executeWithdrawFromStream({
      accounts: {
        signer: wallet.publicKey,
        dao: dao.address,
        stream: dao.governance.proposed_withdrawal_stream, 
        tokenPool: tokenPool,
        receiverTokenAccount: dao.governance.proposed_withdrawal_receiver, //
        daoAuthPda: daoAuthPda,
        feeReceiverAddress: FEE_RX_ADDRESS,
        feeController: fee_controller,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
    });
    console.log("executeWithdrawFromStream success");
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function initializeStream(
  wallet: anchor.Wallet,
  network: string,
  dao: pic.Dao,
  stream: pic.Stream
) {
  let program = await initProgram(wallet, network);
  console.log("program=",program);
  [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );
  [tokenPool] = await PublicKey.findProgramAddress(
    [
      stream.address.toBuffer(), //kaiming not sure
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );
  [daoAuthPda] = await PublicKey.findProgramAddress(
    [
      dao.address.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED)),
    ],
    program.programId
  );
  try {
   

   
    let tokenMint: spl_token.Mint = await spl_token.getMint(
      program.provider.connection,
      stream.token_mint_address 
    );
  
    let verified_creator_addresses = stream.collections.map(item=>item.address);

    let is_simulation = true;
    await program.rpc.initializeStream(
      verified_creator_addresses,
      new anchor.BN(stream.daily_stream_rate),
      is_simulation,
      {
        accounts: {
          signer: wallet.publicKey,
          stream: stream.address,
          dao: dao.address,
          tokenMint: stream.token_mint_address,
          tokenPool: tokenPool, //kaiming not sure
          daoAuthPda: daoAuthPda,
          feeReceiverAddress: FEE_RX_ADDRESS,
          feeController: fee_controller,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [stream.stream_keypair],
      }
    );
    console.log("executeWithdrawFromStream success");
  } catch (e) {
      throw e;
      console.log(e);
  }
}

export async function initializeStakeAndStake(
  wallet: anchor.Wallet,
  network: string,
  nftMintPubkey: anchor.web3.PublicKey,
  senderNftAccount: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);

  // lookup pdas
  const [stake_pda] = await PublicKey.findProgramAddress(
    [
      ownerAddress.toBuffer(),
      nftMintPubkey.toBuffer(),
      Buffer.from(STAKE_PDA_SEED),
    ],
    program.programId
  );
  const [nftVault] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(NFT_VAULT_PDA_SEED)),
    ],
    program.programId
  );
  const [stakeAuthPda] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(STAKE_AUTH_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  let result = await program.rpc.stakeNft({
    accounts: {
      signer: ownerAddress,
      stake: stake_pda,
      nftMint: nftMintPubkey,
      nftVault: nftVault,
      senderNftAccount: senderNftAccount,
      systemProgram: SystemProgram.programId,
      feeReceiverAddress: FEE_RX_ADDRESS,
      feeController: fee_controller,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
    instructions: [
      await program.instruction.initializeStake({
        accounts: {
          signer: ownerAddress,
          stake: stake_pda,
          nftMint: nftMintPubkey,
          nftVault: nftVault,
          stakeAuthPda: stakeAuthPda,
          feeReceiverAddress: FEE_RX_ADDRESS,
          feeController: fee_controller,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }),
    ],
  });
  return stake_pda;
}

export async function stakeNft(
  wallet: anchor.Wallet,
  network: string,
  nftMintPubkey: anchor.web3.PublicKey,
  senderNftAccount: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);

  // lookup pdas
  const [stake_pda] = await PublicKey.findProgramAddress(
    [
      ownerAddress.toBuffer(),
      nftMintPubkey.toBuffer(),
      Buffer.from(STAKE_PDA_SEED),
    ],
    program.programId
  );
  const [nftVault] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(NFT_VAULT_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  const result = await program.rpc.stakeNft({
    accounts: {
      signer: ownerAddress,
      stake: stake_pda,
      nftMint: nftMintPubkey,
      nftVault: nftVault,
      senderNftAccount: senderNftAccount,
      feeReceiverAddress: FEE_RX_ADDRESS,
      feeController: fee_controller,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
  });

  return result;
}

export async function initializeConnectionAndConnect(
  wallet: anchor.Wallet,
  network: string,
  streamAddress: anchor.web3.PublicKey,
  nftMintPubkey: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);
  const [stake_pda] = await PublicKey.findProgramAddress(
    [
      ownerAddress.toBuffer(),
      nftMintPubkey.toBuffer(),
      Buffer.from(STAKE_PDA_SEED),
    ],
    program.programId
  );
  const [connection_pda] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      streamAddress.toBuffer(),
      Buffer.from(CONNECTION_PDA_SEED),
    ],
    program.programId
  );
  const [metadata_pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from(METADATA_PREFIX),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMintPubkey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  const [tokenPool] = await PublicKey.findProgramAddress(
    [
      streamAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  let result = await program.rpc.connectToStream({
    accounts: {
      signer: ownerAddress,
      connection: connection_pda,
      stake: stake_pda,
      stream: streamAddress,
      metaplexMetadataPda: metadata_pda,
      tokenPool: tokenPool,
      feeReceiverAddress: FEE_RX_ADDRESS,
      feeController: fee_controller,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
    instructions: [
      await program.instruction.initializeConnection({
        accounts: {
          signer: ownerAddress,
          connection: connection_pda,
          stake: stake_pda,
          stream: streamAddress,
          feeReceiverAddress: FEE_RX_ADDRESS,
          feeController: fee_controller,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }),
    ],
  });

  return connection_pda;
}

export async function connectToStream(
  wallet: anchor.Wallet,
  network: string,
  streamAddress: anchor.web3.PublicKey,
  nftMintPubkey: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey,
  connection_pda: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);
  const [stake_pda] = await PublicKey.findProgramAddress(
    [
      wallet.publicKey.toBuffer(),
      nftMintPubkey.toBuffer(),
      Buffer.from(STAKE_PDA_SEED),
    ],
    program.programId
  );
  const [metadata_pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from(METADATA_PREFIX),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMintPubkey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  const [tokenPool] = await PublicKey.findProgramAddress(
    [
      streamAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  let result = await program.rpc.connectToStream({
    accounts: {
      signer: ownerAddress,
      connection: connection_pda,
      stake: stake_pda,
      stream: streamAddress,
      metaplexMetadataPda: metadata_pda,
      tokenPool: tokenPool,
      feeReceiverAddress: FEE_RX_ADDRESS,
      feeController: fee_controller,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
  });
  return result;
}

export async function claimTokensFromStream(
  wallet: anchor.Wallet,
  network: string,
  streamAddress: anchor.web3.PublicKey,
  daoAddress: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey,
  stake_pda: anchor.web3.PublicKey,
  connection_pda: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);

  // get this streams token mint address
  const streamAccount = await program.account.stream.fetch(streamAddress);
  const tokenMintAddress: PublicKey = streamAccount.tokenMintAddress;

  // make ATA
  let receiverTokenAccount = await spl_token.getAssociatedTokenAddress(
    tokenMintAddress,
    ownerAddress
  );

  let instructions = [];
  try {
    let ataInfo = await spl_token.getAccount(
      program.provider.connection,
      receiverTokenAccount
    );
  } catch (e) {
    // account must be created, we'll do this in one atomic transaction
    let ata_ix = spl_token.createAssociatedTokenAccountInstruction(
      ownerAddress,
      receiverTokenAccount,
      ownerAddress,
      tokenMintAddress
    );
    instructions.push(ata_ix);
  }

  let claim_amount = 1; // NOTE should not matter since we claim max
  let claim_max = true;

  const [tokenPool] = await PublicKey.findProgramAddress(
    [
      streamAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );

  const [daoAuthPda] = await PublicKey.findProgramAddress(
    [
      daoAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  let result = await program.rpc.claimFromStream(
    new anchor.BN(claim_amount),
    claim_max,
    {
      accounts: {
        signer: ownerAddress,
        connection: connection_pda,
        stake: stake_pda,
        stream: streamAddress,
        tokenPool: tokenPool,
        receiverTokenAccount: receiverTokenAccount,
        daoAuthPda: daoAuthPda,
        dao: daoAddress,
        feeReceiverAddress: FEE_RX_ADDRESS,
        feeController: fee_controller,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      instructions: instructions,
    }
  );

  return result;
}

export async function disconnectFromStream(
  wallet: anchor.Wallet,
  network: string,
  streamAddress: anchor.web3.PublicKey,
  nftMintPubkey: anchor.web3.PublicKey,
  ownerAddress: anchor.web3.PublicKey,
  stake_pda: anchor.web3.PublicKey,
  connection_pda: anchor.web3.PublicKey,
  daoAddress: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);
  const [tokenPool] = await PublicKey.findProgramAddress(
    [
      streamAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED)),
    ],
    program.programId
  );
  const [daoAuthPda] = await PublicKey.findProgramAddress(
    [
      daoAddress.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  const streamAccount = await program.account.stream.fetch(streamAddress);
  const tokenMintAddress: PublicKey = streamAccount.tokenMintAddress;
  let receiverTokenAccount = await spl_token.getAssociatedTokenAddress(
    tokenMintAddress,
    ownerAddress
  );
  let instructions = [];
  try {
    let ataInfo = await spl_token.getAccount(
      program.provider.connection,
      receiverTokenAccount
    );
  } catch (e) {
    let ata_ix = spl_token.createAssociatedTokenAccountInstruction(
      ownerAddress,
      receiverTokenAccount,
      ownerAddress,
      tokenMintAddress
    );
    instructions.push(ata_ix);
  }
  let claim_amount = 0;
  let claim_max = true;
  // disconnect from stream accounts
  let accounts = {
    signer: ownerAddress,
    connection: connection_pda,
    stake: stake_pda,
    stream: streamAddress,
    tokenPool: tokenPool,
    receiverTokenAccount: receiverTokenAccount,
    daoAuthPda: daoAuthPda,
    dao: daoAddress,
    feeReceiverAddress: FEE_RX_ADDRESS,
    feeController: fee_controller,
    systemProgram: SystemProgram.programId,
    tokenProgram: TOKEN_PROGRAM_ID,
    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  };
  let claimIx = program.instruction.claimFromStream(
    new anchor.BN(claim_amount),
    claim_max,
    { accounts: { ...accounts } }
  );
  instructions.push(claimIx);
  let result = await program.rpc.disconnectFromStream({
    accounts: accounts,
    instructions: instructions,
  });
  return result;
}

export async function unstakeNft(
  wallet: anchor.Wallet,
  network: string,
  ownerAddress: anchor.web3.PublicKey,
  stake_pda: anchor.web3.PublicKey,
  nftMint: anchor.web3.PublicKey
) {
  let program = await initProgram(wallet, network);
  const [nftVault] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(NFT_VAULT_PDA_SEED)),
    ],
    program.programId
  );
  const [stakeAuthPda] = await PublicKey.findProgramAddress(
    [
      stake_pda.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(STAKE_AUTH_PDA_SEED)),
    ],
    program.programId
  );

  const [fee_controller] = await PublicKey.findProgramAddress(
    [Buffer.from(FEE_CONTROLLER_PDA_SEED)],
    program.programId
  );

  let receiverTokenAccount = await spl_token.getAssociatedTokenAddress(
    nftMint,
    ownerAddress
  );
  let instructions = [];
  try {
    let ataInfo = await spl_token.getAccount(
      program.provider.connection,
      receiverTokenAccount
    );
  } catch (e) {
    let ata_ix = spl_token.createAssociatedTokenAccountInstruction(
      ownerAddress,
      receiverTokenAccount,
      ownerAddress,
      nftMint
    );
    instructions.push(ata_ix);
  }
  let result = await program.rpc.unstakeNft({
    accounts: {
      signer: ownerAddress,
      stake: stake_pda,
      nftMint: nftMint,
      nftVault: nftVault,
      receiverNftAccount: receiverTokenAccount,
      stakeAuthPda: stakeAuthPda,
      feeReceiverAddress: FEE_RX_ADDRESS,
      feeController: fee_controller,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    },
    instructions: instructions,
  });
  return receiverTokenAccount;
}
