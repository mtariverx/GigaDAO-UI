import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
// import "../../scss/content.scss";

import * as pic from "../../pic/pic";
import { Keypair, PublicKey } from "@solana/web3.js";
import { setGovernance, getGovernance } from "../../pic/sim";

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

const CreateNewProposal = () => {
  const [proposal_type, setProposalType] = useState(null);

  return (
    // <div className="content">
      <div className="daonewproposal-content">
         <div className="outer-box-margin">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="create-dao">
              <div>New Proposal</div>
              <div className="item-wrapper">
                <div className="input-title">Proposal Type</div>
                <div className="input-select">
                  <Select
                    defaultValue={proposal_type}
                    options={options}
                    styles={customStyles}
                    onChange={setProposalType}
                  />
                </div>
              </div>
              <div className="content-btn-group">
                <button className="btn">ProposeDaoCommand</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    // </div>
  );
};

export default CreateNewProposal;
