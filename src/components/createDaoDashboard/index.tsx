import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
import "../../scss/content.scss";
// import "../../scss/navitem.scss";

import * as pic from "../../pic/pic";
import { Keypair, PublicKey } from "@solana/web3.js";
import { setGovernance, getGovernance } from "../../pic/sim";

// import React, { Component } from "react";
import Select from "react-select";

const proposal_options = [
  { value: pic.ProposalType.UPDATE_MULTISIG, label: "UPDATE_MULTISIG" },
  { value: pic.ProposalType.DEACTIVATE_STREAM, label: "DEACTIVATE_STREAM" },
  {
    value: pic.ProposalType.WITHDRAW_FROM_STREAM,
    label: "WITHDRAW_FROM_STREAM",
  },
];
const token_options = [
  { value: "GIGS", label: "GIGS" },
  { value: "GIGS", label: "GIGS" },
  { value: "GIGS", label: "GIGS" },
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
  }),
};
const CreateDaoDashboard = () => {
  //describe the arguments of DAO

  const [proposal_type, setProposalType] = useState(null);
  const [token_type, setTokenType]=useState(null);

  const onCancel = (): void => {};

  return (
    <div className="content-daodashboard">
      <div className="content-left">
        {/* <div className="outer-box-margin"> */}
        <div className="content-outer-box">
          <div className="content-input-box">
            <div>Proposal</div>
            <div className="left-getMemberDaos">
              <Select
                defaultValue={proposal_type}
                options={proposal_options}
                styles={customStyles}
                onChange={setProposalType}
              />
              <div>
                <button className="btn">RefreshGovernance</button>
              </div>
            </div>
            <div>Future States</div>

            <div className="left-create-propose">
              <button className="btn">CreateTokenStream</button>
              <button className="btn">CreateNewProposal</button>
            </div>

            <div className="left-create-daoprofile">
              <button className="btn">BOX E</button>
              <button className="btn">DAO profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-right">
        <div className="outer-box-margin">
          <div className="content-outer-box">
            <div className="content-input-box">
              <div>Active Proposals</div>
              <div className="right-proposal-selection">
                <div className="font-sz-md">20</div>
                <Select
                  defaultValue={proposal_type}
                  options={token_options}
                  styles={customStyles}
                  onChange={setTokenType}
                />
              </div>
              <div className="description-proposal">
                This is a description of the proposal
              </div>
              <div className="font-sz-md">Councillors Array</div>
              <div className="councillor-pubkey-area">
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">true</div>
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">true</div>
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">true</div>
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">true</div>
              </div>
              <div>
                <div className="right-proposal-btn">
                  <button className="btn">ApproveDaoCommand</button>
                  <button className="btn">ExecuteDaoCommand</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDaoDashboard;
