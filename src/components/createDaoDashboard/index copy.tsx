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

const options = [
  { value: pic.ProposalType.UPDATE_MULTISIG, label: "UPDATE_MULTISIG" },
  { value: pic.ProposalType.DEACTIVATE_STREAM, label: "DEACTIVATE_STREAM" },
  {
    value: pic.ProposalType.WITHDRAW_FROM_STREAM,
    label: "WITHDRAW_FROM_STREAM",
  },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
  }),
};
const CreateDaoDashboard = () => {
  //describe the arguments of DAO

  const [proposal_type, setProposalType] = useState(null);

  const onCancel = (): void => {};

  return (
    <div className="content">
      <div className="content-left">
        {/* <div className="outer-box-margin"> */}
        <div className="content-outer-box">
          <div className="content-input-box">
            
              <div className="left-getMemberDaos">
                <div className="select-btn-group">
                  <Select
                    defaultValue={proposal_type}
                    options={options}
                    styles={customStyles}
                    onChange={setProposalType}
                  />
                  <div>
                    <button className="btn">RefreshGovernance</button>
                  </div>
                </div>
              </div>
              {/* <div>Future Features</div> */}
              <div>
                <button className="btn">CreateTokenStream</button>
              </div>

              <div className="left-create-propose">
                <div>Create</div>
                <div>Propose</div>
              </div>

              <div className="left-create-propose">
                <div>BOX E</div>
                <div>DAO profile</div>
              </div>
            </div>
        </div>
      </div>

      <div className="content-right">
        <div className="outer-box-margin">
          <div className="content-outer-box">
            <div className="content-input-box">
              <div className="content-dao-image">
                <img src="/rainbow512.png" alt="Girl in a jacket" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDaoDashboard;
