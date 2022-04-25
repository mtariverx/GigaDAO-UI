import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
import "../../scss/content.scss";
import "../../scss/navitem.scss";

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

const CreateDao = () => {
  //describe the arguments of DAO
  // config
  const [councillors, setCouncillors] = useState<string[]>([""]);
  const [approval_threshold, setApprovalThreshold] = useState(0);
  // proposal state
  const [proposal_signers, setProposalSigners] = useState<boolean[]>([false]);
  const [proposal_is_active, setProposalIsActive] = useState<boolean>(null);
  const [proposal_type, setProposalType] = useState(null);
  // update multisig proposal params
  const [proposed_councillors, setProposedCouncillors] = useState<string[]>([
    "",
  ]);
  const [proposed_approval_threshold, setProposedApprovalThreshold] =
    useState(0);
  // deactivate stream proposal params
  const [proposed_deactivation_stream, setProposedDeactivationStream] =
    useState<string>("");
  // withdraw from  stream proposal params
  const [proposed_withdrawal_amount, setProposedWithdrawalAmount] =
    useState<number>(0);
  const [
    proposed_withdrawal_receiver_owner,
    setProposedWithdrawalReceiverOwner,
  ] = useState<string>("");
  const [proposed_withdrawal_stream, setProposedWithdrawalStream] =
    useState<string>("");
  // stream state
  const [num_streams, setNumSreams] = useState<number>(0);

  const changeCouncillors = (index: number) => (value: string) => {
    const temp = [...councillors];
    temp[index] = value;
    setCouncillors(temp);
  };

  const onAddCouncillors = (): void => {
    const temp = [...councillors];
    temp.push("");
    setCouncillors(temp);
  };
  const changeProposalSigners = (index: number) => (value: boolean) => {
    const temp = [...proposal_signers];
    temp[index] = value;
    setProposalSigners(temp);
  };

  const onAddProposalSigners = (): void => {
    const temp = [...proposal_signers];
    temp.push(false);
    setProposalSigners(temp);
  };
  const changeProposedCouncillors = (index: number) => (value: string) => {
    const temp = [...proposed_councillors];
    temp[index] = value;
    setProposedCouncillors(temp);
  };

  const onAddProposedCouncillors = (): void => {
    const temp = [...proposed_councillors];
    temp.push("");
    setProposedCouncillors(temp);
  };

  const onCancel = (): void => {
    setCouncillors([""]);
    setApprovalThreshold(0);
    setProposalSigners([false]);
    setProposalIsActive(false);
    setProposalType(null);
    setProposedCouncillors([""]);
    setProposedApprovalThreshold(0);
    setProposedDeactivationStream("");
    setProposedWithdrawalAmount(0);
    setProposedWithdrawalReceiverOwner("");
    setProposedWithdrawalStream("");
    setNumSreams(0);
  };

  const onSave = (): void => {
    const councillors_publickey = councillors.map(
      (councillor) => new PublicKey(councillor)
    );

    const proposal_type_enum = proposal_type.value;
    const proposed_councillors_publickey = proposed_councillors.map(
      (proposed_councillor) => new PublicKey(proposed_councillor)
    );
    //const proposed_approval_threshold
    const proposed_deactivation_stream_publickey = new PublicKey(
      proposed_deactivation_stream
    );
    //const proposed_withdrawal_amount
    const proposed_withdrawal_receiver_owner_publickey = new PublicKey(
      proposed_withdrawal_receiver_owner
    );
    const proposed_withdrawal_stream_publickey = new PublicKey(
      proposed_deactivation_stream
    );
    //const num_streams
    let governance: pic.Governance = {
      councillors: councillors_publickey,
      approval_threshold: approval_threshold,
      proposed_signers: proposal_signers,
      proposal_is_active: proposal_is_active,
      proposal_type: proposal_type_enum,
      proposed_councillors: proposed_councillors_publickey,
      proposed_approval_threshold: proposed_approval_threshold,
      proposed_deactivation_stream: proposed_deactivation_stream_publickey,
      proposed_withdrawal_amount: proposed_withdrawal_amount,
      proposed_withdrawal_receiver:
        proposed_withdrawal_receiver_owner_publickey,
      proposed_withdrawal_stream: proposed_withdrawal_stream_publickey,
      num_streams: num_streams,
    };
    setGovernance(governance);
  };

  return (
    <div className="content">
      <div className="content-left">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="create-dao">
              {councillors.map((item, index) => (
                <LabelInput
                  value={item}
                  title={index === 0 ? "Councillors" : ""}
                  onChange={changeCouncillors(index)}
                  key={index}
                />
              ))}

              <div className="item-wrapper">
                <div></div>
                <div className="add-stream" onClick={onAddCouncillors}>
                  <PlusIcon /> Add a councillor
                </div>
                {/* <div className="input-recyclebin">
                  <img src={"/icons/entry-icon-farms.svg"} />
                </div> */}
              </div>
              <LabelInput
                value={approval_threshold}
                title="Approval Threshold"
                onChange={setApprovalThreshold}
              />
              {proposal_signers.map((item, index) => (
                <LabelCheckbox
                  value={item}
                  title={
                    index === 0 || item === undefined ? "Proposal Signers" : ""
                  }
                  onChange={changeProposalSigners(index)}
                  key={index}
                />
              ))}
              <div className="item-wrapper">
                <div></div>
                <div className="add-stream" onClick={onAddProposalSigners}>
                  <PlusIcon /> Add a proposal signer
                </div>
              </div>
              <div className="item-wrapper">
                <div className="input-title">Proposal Is Active</div>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={proposal_is_active}
                    onChange={() => setProposalIsActive(!proposal_is_active)}
                  />
                </div>
              </div>
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

              {proposed_councillors.map((item, index) => (
                <LabelInput
                  value={item}
                  title={index === 0 ? "Proposed Councillors" : ""}
                  onChange={changeProposedCouncillors(index)}
                  key={index}
                />
              ))}

              <div className="item-wrapper">
                <div></div>
                <div className="add-stream" onClick={onAddProposedCouncillors}>
                  <PlusIcon /> Add a proposed councillor
                </div>
              </div>

              <LabelInput
                value={proposed_approval_threshold}
                title="Proposed Approval Threshold"
                onChange={setProposedApprovalThreshold}
              />
              <LabelInput
                value={proposed_deactivation_stream}
                title="Proposed Deactivation Stream"
                onChange={setProposedDeactivationStream}
              />
              <LabelInput
                value={proposed_withdrawal_amount}
                title="Proposed Withdrawal Amount"
                onChange={setProposedWithdrawalAmount}
              />
              <LabelInput
                value={proposed_withdrawal_receiver_owner}
                title="Proposed Withdrawal Receiver Owner"
                onChange={setProposedWithdrawalReceiverOwner}
              />
              <LabelInput
                value={proposed_withdrawal_stream}
                title="Proposed Withdrawal Stream"
                onChange={setProposedWithdrawalStream}
              />
              <LabelInput
                value={num_streams}
                title="# of Streams"
                onChange={setNumSreams}
              />
              <div className="content-btn-group">
                <button className="btn" onClick={onCancel}>
                  Cancel
                </button>
                <button className="btn" onClick={onSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="content-dao-image">
              <img src="/rainbow512.png" alt="Girl in a jacket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDao;
