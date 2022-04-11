/*
Helpers for making rpc calls to gigadao staking contract v1
 */
import * as anchor from "@project-serum/anchor";
import {PublicKey, SystemProgram} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

// TODO inform user with specific error messages from rpc calls

// pda seeds
const TOKEN_POOL_PDA_SEED = "token_pool_pda_seed";
const NFT_VAULT_PDA_SEED = "nft_account_pda_seed";
const DAO_AUTH_PDA_SEED = "dao_auth_pda_seed";
const STAKE_AUTH_PDA_SEED = "stake_auth_pda_seed";
const METADATA_PREFIX = "metadata";
const STAKE_PDA_SEED = "stake_pda_seed";
const CONNECTION_PDA_SEED = "connection_pda_seed";
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

async function initProgram(wallet: anchor.Wallet, network: string) {
    // INIT Web3 Connection Objects
    const PROGRAM_ID = 'AGi7p8RritzUDX4sCYVfxApCH4By8FEpSV4ffL7bZ8Kp';
    const programId = new anchor.web3.PublicKey(PROGRAM_ID);
    let opts = anchor.Provider.defaultOptions();
    let connection = new anchor.web3.Connection(network, opts.preflightCommitment);
    let provider = new anchor.Provider(connection, wallet, opts);
    let idl = await anchor.Program.fetchIdl(programId, provider);
    let program = new anchor.Program(idl, programId, provider);
    return program;
}

async function stakeNft(wallet: anchor.Wallet, network: string, nftMintPubkey: anchor.web3.PublicKey, senderNftAccount: anchor.web3.PublicKey){
    let program = await initProgram(wallet, network);

    // lookup pdas
    const [stake_pda] = await PublicKey.findProgramAddress(
        [wallet.publicKey.toBuffer(), nftMintPubkey.toBuffer(), Buffer.from(STAKE_PDA_SEED)],
        program.programId
    );
    const [nftVault] = await PublicKey.findProgramAddress(
        [stake_pda.toBuffer(), Buffer.from(anchor.utils.bytes.utf8.encode(NFT_VAULT_PDA_SEED))],
        program.programId
    );
    const [stakeAuthPda] = await PublicKey.findProgramAddress(
        [stake_pda.toBuffer(), Buffer.from(anchor.utils.bytes.utf8.encode(STAKE_AUTH_PDA_SEED))],
        program.programId
    );

    await program.rpc.initializeStake(
        {
            accounts: {
                signer: wallet.publicKey,
                stake: stake_pda,
                nftMint: nftMintPubkey,
                nftVault: nftVault,
                stakeAuthPda: stakeAuthPda,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
        }
    );

    await program.rpc.stakeNft(
        {
            accounts: {
                signer: wallet.publicKey,
                stake: stake_pda,
                nftMint: nftMintPubkey,
                nftVault: nftVault,
                senderNftAccount: senderNftAccount,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
        }
    );
}

async function unstakeNft(){

}


async function connectToStream(wallet: anchor.Wallet, network: string, streamAddress: anchor.web3.PublicKey, nftMintPubkey: anchor.web3.PublicKey){
    let program = await initProgram(wallet, network);
    const [stake_pda] = await PublicKey.findProgramAddress(
        [wallet.publicKey.toBuffer(), nftMintPubkey.toBuffer(), Buffer.from(STAKE_PDA_SEED)],
        program.programId
    );
    const [connection_pda] = await PublicKey.findProgramAddress(
        [stake_pda.toBuffer(), streamAddress.toBuffer(), Buffer.from(CONNECTION_PDA_SEED)],
        program.programId
    );
    const [metadata_pda] = await PublicKey.findProgramAddress(
        [Buffer.from(METADATA_PREFIX), TOKEN_METADATA_PROGRAM_ID.toBuffer(), nftMintPubkey.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID
    );
    const [tokenPool] = await PublicKey.findProgramAddress(
        [streamAddress.toBuffer(), Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED))],
        program.programId
    );

    await program.rpc.initializeConnection(
        {
            accounts: {
                signer: wallet.publicKey,
                connection: connection_pda,
                stake: stake_pda,
                stream: streamAddress,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
        }
    );

    await program.rpc.connectToStream(
        {
            accounts: {
                signer: wallet.publicKey,
                connection: connection_pda,
                stake: stake_pda,
                stream: streamAddress,
                metaplexMetadataPda: metadata_pda,
                tokenPool: tokenPool,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
        }
    );

}

async function disconnectFromStream(){

}

async function claimTokensFromStream(wallet: anchor.Wallet,
                                     network: string,
                                     streamAddress: anchor.web3.PublicKey,
                                     receiverTokenAccount: anchor.web3.PublicKey,
                                     daoAddress: anchor.web3.PublicKey,
                                     nftMintPubkey: anchor.web3.PublicKey){

    let program = await initProgram(wallet, network);
    let claim_amount = 1;
    let claim_max = false;

    const [stake_pda] = await PublicKey.findProgramAddress(
        [wallet.publicKey.toBuffer(), nftMintPubkey.toBuffer(), Buffer.from(STAKE_PDA_SEED)],
        program.programId
    );

    const [connection_pda] = await PublicKey.findProgramAddress(
        [stake_pda.toBuffer(), streamAddress.toBuffer(), Buffer.from(CONNECTION_PDA_SEED)],
        program.programId
    );
    const [tokenPool] = await PublicKey.findProgramAddress(
        [streamAddress.toBuffer(), Buffer.from(anchor.utils.bytes.utf8.encode(TOKEN_POOL_PDA_SEED))],
        program.programId
    );

    const [daoAuthPda] = await PublicKey.findProgramAddress(
        [daoAddress.toBuffer(), Buffer.from(anchor.utils.bytes.utf8.encode(DAO_AUTH_PDA_SEED))],
        program.programId
    );

    // TODO create receiver token address

    await program.rpc.claimFromStream(
        new anchor.BN(claim_amount),
        claim_max,
        {
            accounts: {
                signer: wallet.publicKey,
                connection: connection_pda,
                stake: stake_pda,
                stream: streamAddress,
                tokenPool: tokenPool,
                receiverTokenAccount: receiverTokenAccount,
                daoAuthPda: daoAuthPda,
                dao: daoAddress,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
        }
    );

}



