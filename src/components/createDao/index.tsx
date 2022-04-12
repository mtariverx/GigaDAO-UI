import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
import "../../scss/content.scss";
import * as pic from "../../pic/pic";
import { Keypair, PublicKey } from "@solana/web3.js";

import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'UPDATE_MULTISIG', label: 'UPDATE_MULTISIG' },
  { value: 'DEACTIVATE_STREAM', label: 'DEACTIVATE_STREAM' },
  { value: 'WITHDRAW_FROM_STREAM', label: 'WITHDRAW_FROM_STREAM' }
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    color: state.isSelected ? 'white' : 'black',
    // color:'white',
    // background_color:"black",

    // padding: 20,
  }),
  // control: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   width: 200,
  // }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // }
}
const CreateDao = () => {
  //describe the arguments of DAO
  // config
  const [councillors, setCouncillors] = useState<string[]>([""]);
  const [approval_threshold, setApprovalThreshold] = useState(0);
  // proposal state
  const [proposal_signers, setProposalSigners] = useState<boolean[]>([false]);
  const [proposal_is_active, setProposalIsActive] = useState<boolean>(false);
  const [proposal_type, setProposalType] = useState<pic.ProposalType>();
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
  ] = useState<number>(0);
  const [proposed_withdrawal_stream, setProposedWithdrawalStream] =
    useState<string>("");
  // stream state
  const [num_streams, setNumSreams] = useState<number>(0);

  {
    // console.log(councillors);
    // console.log(proposal_signers);
    // console.log(proposal_is_active);
    // console.log(image_url);
    // console.log(streams);
    // console.log(num_nft);
    // console.log(is_member);
  }

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
              </div>
              <LabelInput
                value={approval_threshold}
                title="Approval Threshold"
                onChange={setApprovalThreshold}
              />
              {proposal_signers.map((item, index) => (
                <LabelCheckbox
                  value={item}
                  title={index === 0 ? "Proposal Signers" : ""}
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
              <LabelInput
                value={proposal_type}
                title="Proposal Type"
                onChange={setProposalType}
              />
              <div className="item-wrapper">
                <div className="input-title">Proposal Type</div>
                <div className="input-select">
                  <Select options={options} 
                  styles={customStyles}/>
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
                <button className="btn">Cancel</button>
                <button className="btn">Save</button>
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
