import "./style.scss";
import * as pic from "../../pic/pic";
import { useEffect, useState } from "react";
import "../common/LabelInput/style.scss";
import Button from "components/common/Button";
import Profile from "img/icons/profile.png";

const NewProposal = () => {
  const proposal_options = [
    { value: -1, label: "" },
    { value: pic.ProposalType.UPDATE_MULTISIG, label: "UPDATE_MULTISIG" },
    { value: pic.ProposalType.DEACTIVATE_STREAM, label: "DEACTIVATE_STREAM" },
    {
      value: pic.ProposalType.WITHDRAW_FROM_STREAM,
      label: "WITHDRAW_FROM_STREAM",
    },
  ];
  const [councillors, setCouncillors] = useState([""]);
  const [one_councillor, setOneCouncillor] = useState("");
  const [approval_threshold, setApprovalThresold] = useState(0);
  const [stream_pubkey, setStreamPubkey] = useState("");
  const [amount, setAmount] = useState(0);
  const [proposed_withdrawal_receiver, setProposedWithdrawalReceiver] =
    useState("");
  const [proposed_withdrawal_stream, setProposedWithdrawalStream] =
    useState("");
  console.log("threshould=", approval_threshold);
  console.log("stream_pubkey=",stream_pubkey);
  console.log("amount=",amount);
  console.log("proposed_withdrawal_receiver=", proposed_withdrawal_receiver);
  console.log("proposed_withdrawal_stream=",proposed_withdrawal_stream);
  const [proposal_type, setProposalType] = useState(-1);
  const [show_addresses, setShowAddresses] = useState<boolean>(false);
  const onAddCouncillors = (): void => {
    const temp = [...councillors];
    temp.push(one_councillor);
    setCouncillors(temp);
    setOneCouncillor("");
  };
  const onSelectProposalType = (event) => {
    setProposalType(event.target.value);
  };
  useEffect(() => {
    if (proposal_type == -1) {
      setShowAddresses(false);
    } else {
      setShowAddresses(true);
    }
  }, [proposal_type]);

  return (
    <div>
      <div className="new-proposal-container">
        <div className="content-title">New Proposal</div>
        <div className="new-proposal-content">
          <div className="proposal-content">
            <div className="content-upper">
              <div className="label-select-group">
                <div className="proposal_notation">Proposal Type</div>
                <div className="select-proposal-type">
                  <select onChange={onSelectProposalType}>
                    {proposal_options.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`${!show_addresses ? "item-group-hidden" : ""}`}>
                {proposal_type == pic.ProposalType.UPDATE_MULTISIG ? (
                  <div>
                    <div className="item-wrapper plus-button">
                      <div className="title">Councillors</div>
                      <input value={one_councillor}
                        onChange={(evt) => setOneCouncillor(evt.target.value)}
                      />
                      <div className="input-side-btn">
                        <img src={Profile} onClick={onAddCouncillors} />
                      </div>
                    </div>
                    <div className="item-wrapper">
                      <div></div>
                      <div className="show-collections">
                        {councillors.map((item, index) => (
                          <div className="item">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Approval Threshold</div>
                      <input value={approval_threshold}
                        onChange={(evt) => setApprovalThresold(parseInt(evt.target.value || "0"))}
                      />
                    </div>
                  </div>
                ) : proposal_type == pic.ProposalType.DEACTIVATE_STREAM ? (
                  <div>
                    <div className="item-wrapper">
                      <div className="title">Stream Publick Key</div>
                      <input value={stream_pubkey}
                        onChange={(evt) => setStreamPubkey(evt.target.value)}
                      />
                    </div>
                  </div>
                ) : proposal_type == pic.ProposalType.WITHDRAW_FROM_STREAM ? (
                  <div>
                    <div className="item-wrapper">
                      <div className="title">Amount</div>
                      <input value={amount}
                        onChange={(evt)=>setAmount(parseInt(evt.target.value || "0"))}
                      />
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Proposed Withdrawal Receiver</div>
                      <input value={proposed_withdrawal_receiver}
                        onChange={(evt) => setProposedWithdrawalReceiver(evt.target.value)}
                      />
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Proposed Withdrawal Stream</div>
                      <input value={proposed_withdrawal_stream}
                        onChange={(evt) => setProposedWithdrawalStream(evt.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* <div className="content-lower"> */}
            
          </div>

          <div className="proposal-content-save">
            {/* <div className="save-proposal-btn">Save Changes</div> */}
            <Button is_btn_common={true} btn_title="Initialize Stream" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
