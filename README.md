<p align="center">
    <img alt="Solana" src="https://www.gigadao.io/static/media/gigadao-full-brand-cropped.a590d8a4.png" width="250" />
</p>

#Enterprise Staking Platform

### Staker Overview
This application allows NFT owners to do the following:
1) Stake their NFT
2) Connect their Staked NFT to one or more spl-token ***Streams***
3) To claim tokens that their ***Connection*** has earned at any time.

### Councillor Overview
Additionally, functionality will also be provided for DAO ***Councillors*** to:
1) Create DAOs
2) Create spl-token Streams that only specified NFT collections can connect to
3) Modify DAO parameters and withdraw funds from existing streams

## Program Interface Contract

At GigaDAO we use a pattern known as a Program Interface Contract (PIC) to guarantee compatibility between connected programs. 
A PIC is similar to an API or an IDL, but higher level and with a required "simulation" feature. A PIC is composed of two parts only:

1) Shared Object Primitives (SAPS): these are types that both sides use e.g. "Stake", "Stream", "Connection", etc. 
2) Calls: these are the only functions that are allowed to transfer data between the PICs "Partner Programs"

In this repo, you will find the PIC defined in `src/pic/pic.ts`. This file provides a complete view of all the communication that 
will occur between the UI and the backends that is it attached to. A PIC must always have two implementations, one simulated, and one live. 
As a front-end developer, you must first implement the simulated calls in `src/pic/sim.ts`, in such a way that demonstrates the UI is fully 
functional and ready to be transitioned to live mode. The PIC mode is set via `const IS_LIVE = false;` in the `src/pic/connect.ts` file.

## Trial Scope and Acceptance Criteria
In order to successfully complete this trial project you much achieve the following:
1) Extend the current UI to enable all the functionality described in the "Councillor Overview" section above.
2) Implement the `sim.ts` functions for the calls assigned to you (see PIC file for assignment).
3) If needed, request to extend or modify the PIC so that it is able to support all of your functionalities.

## Reference Material

Here is a code snippet from the staking smart contract, so that you understand what data fields are involved in DAO/Stream management:

```asm
pub struct Dao {
    // config
    pub councillors: Vec<Pubkey>,
    pub approval_threshold: u64,
    // proposal state
    pub proposal_signers: Vec<bool>,
    pub proposal_is_active: bool,
    pub proposal_type: ProposalType, // 4 bytes
    // update multisig proposal params
    pub proposed_councillors: Vec<Pubkey>,
    pub proposed_approval_threshold: u64,
    // deactivate stream proposal params
    pub proposed_deactivation_stream: Pubkey,
    // withdraw from  stream proposal params
    pub proposed_withdrawal_amount: u64,
    pub proposed_withdrawal_receiver_owner: Pubkey,
    pub proposed_withdrawal_stream: Pubkey,
    // stream state
    pub num_streams: u64,
}

pub struct Stream {
    // config
    pub dao_address: Pubkey,
    pub token_mint_address: Pubkey,
    pub token_pool_address: Pubkey,
    pub verified_creator_addresses: Vec<Pubkey>,
    pub stream_rate: u64, // all amounts in absolute token units, rate is per connection per second
    pub is_simulation: bool,
    // state
    pub is_active: bool,
    pub num_connections: u64,
    pub total_streamed: u64,
    pub total_claimed: u64,
    pub last_update_timestamp: u64,
}

```

Finally, note that we make use of both the blockchain and traditional web2 databases (MySQL and DynamoDB) to efficiently store and retrieve user data. 
For the councillor functionalities, data will mostly be retrieved directly from the blockchain. But, some information such as "all of the DAOS that a given wallet 
address is is a councillor for" will be stored on a web2 database for faster lookup.