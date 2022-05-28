import "./style.scss";
import { useEffect, useState } from "react";
import "../common/LabelInput/style.scss";
import Button from "components/common/Button";
import Plus_fill from "img/icons/plus_symbol_fill.png";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import * as livePic from "../../pic/live";
import { validateSolanaAddress } from "components/CommonCalls";
import { useAnchorWallet, useWallet } from "providers/adapters/core/react";

const NewProposal = (props) => {
  const wallet = useAnchorWallet();

  const proposal_options = [
    { value: -1, label: "" },
    { value: pic.ProposalType.UPDATE_MULTISIG, label: "UPDATE_MULTISIG" },
    { value: pic.ProposalType.DEACTIVATE_STREAM, label: "DEACTIVATE_STREAM" },
    {
      value: pic.ProposalType.WITHDRAW_FROM_STREAM,
      label: "WITHDRAW_FROM_STREAM",
    },
  ];
  const [proposed_councillors, setProposedCouncillors] = useState<string[]>([]);
  const [one_councillor, setOneCouncillor] = useState<string>();
  const [proposed_approval_threshold, setProposedApprovalThresold] = useState<number>();
  const [stream_pubkey, setStreamPubkey] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [proposed_withdrawal_receiver, setProposedWithdrawalReceiver] =
    useState<string>();
  const [proposed_withdrawal_stream, setProposedWithdrawalStream] =
    useState<string>();

  const [proposal_type, setProposalType] = useState(-1);
  const [show_addresses, setShowAddresses] = useState<boolean>(false);

  useEffect(() => {
    if (proposal_type == -1) {
      setShowAddresses(false);
    } else {
      setShowAddresses(true);
    }
  }, [proposal_type]);

  const onAddCouncillors = async () => {
    const temp = [...proposed_councillors];
    let flag = await validateSolanaAddress(one_councillor);
    if (flag) {
      if(!temp.includes(one_councillor)){
        temp.push(one_councillor);
        setProposedCouncillors(temp);
      }else{
        alert("The councillor is duplicated");
      }
    }
    setOneCouncillor("");
  };

  const onSelectProposalType = (event) => {
    setProposalType(event.target.value);
    setProposedCouncillors([]);
    setProposedApprovalThresold(0);
    setStreamPubkey("");
    setAmount(0);
    setProposedWithdrawalReceiver("");
    setProposedWithdrawalStream("");
  };

  const onClickSavePorposeBtn = async () => {
    // if(props.dao.governance==undefined){
    //   props.onClose(); //close btn
    // }
    let governance: pic.Governance={
      councillors:[Keypair.generate().publicKey],
      approval_threshold:0,
      proposed_signers: [false],
      proposal_is_active:false,
      proposal_type: pic.ProposalType.DEACTIVATE_STREAM, 
      proposed_councillors:[],
      proposed_approval_threshold:0,
      proposed_deactivation_stream:Keypair.generate().publicKey,
      proposed_withdrawal_amount:0,
      proposed_withdrawal_receiver: Keypair.generate().publicKey,
      proposed_withdrawal_stream: Keypair.generate().publicKey,
      num_streams:0,
    };
    props.dao.governance=governance;
    if ((await validateSolanaAddress(stream_pubkey)) == false) {
      setStreamPubkey("");
    }
    // if ((await validateSolanaAddress(proposed_withdrawal_receiver)) == false) {
    //   setProposedWithdrawalReceiver("");
    // }
    if ((await validateSolanaAddress(proposed_withdrawal_stream)) == false) {
      setProposedWithdrawalStream("");
    }
    if (
      proposed_councillors.length > 0 ||
      (await validateSolanaAddress(stream_pubkey)) ||
      (proposed_withdrawal_receiver &&
        (await validateSolanaAddress(proposed_withdrawal_stream)))
    ) {
 

      if (proposed_councillors && proposed_councillors.length > 0) {
        let proposed_councillors_pubkey = proposed_councillors.map(
          (councillor) => new PublicKey(councillor)
        );
        props.dao.governance.proposed_councillors = proposed_councillors_pubkey;
        props.dao.governance.proposed_councillors.push(wallet.publicKey); //add owner
      }
      props.dao.governance.proposal_type=proposal_type;

      props.dao.governance.proposal_is_active = true;
      props.dao.governance.proposed_approval_threshold = proposed_approval_threshold;
      if (stream_pubkey)
        props.dao.governance.proposed_deactivation_stream = new PublicKey(
          stream_pubkey
        );
      props.dao.governance.proposed_withdrawal_amount = amount;
      if (proposed_withdrawal_receiver)
        props.dao.governance.proposed_withdrawal_receiver = new PublicKey(
          proposed_withdrawal_receiver
        );
      if (proposed_withdrawal_stream)
        props.dao.governance.proposed_withdrawal_stream = new PublicKey(
          proposed_withdrawal_stream
        );
      console.log("new proposal=", props.dao);
      // const dao = await simPic.proposeDaoCommand(props.dao); //proposeDaoCommand
      await livePic.proposeDaoCommand(wallet, props.dao);
      props.onClose(); //close btn
    }
  };
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
                  <select value={proposal_type} onChange={onSelectProposalType}>
                    {console.log("proposal_type=",proposal_type)}
                    {proposal_options.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {/* {console.log("---+", { value })} */}
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`${!show_addresses ? "item-group-hidden" : ""}`}>
                {proposal_type == pic.ProposalType.UPDATE_MULTISIG ? (
                  <div className="proposal-item-group">
                    <div className="item-wrapper plus-button">
                      <div className="title">Councillors</div>
                      <input
                        key="0"
                        value={one_councillor}
                        onChange={(evt) => setOneCouncillor(evt.target.value)}
                      />
                      <div className="input-side-btn">
                        <img src={Plus_fill} onClick={onAddCouncillors} />
                      </div>
                    </div>
                    <div className="item-wrapper">
                      <div></div>
                      <div className="show-collections">
                        {proposed_councillors != undefined
                          ? proposed_councillors.map((item, index) => (
                              <div className="item">{item}</div>
                            ))
                          : ""}
                      </div>
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Approval Threshold</div>
                      <input
                        required
                        key="1"
                        value={proposed_approval_threshold}
                        onChange={(evt) =>
                          setProposedApprovalThresold(parseInt(evt.target.value || "0"))
                        }
                      />
                    </div>
                  </div>
                ) : proposal_type == pic.ProposalType.DEACTIVATE_STREAM ? (
                  <div>
                    <div className="item-wrapper">
                      <div className="title">Stream Publick Key</div>
                      <input
                        required
                        key="2"
                        value={stream_pubkey}
                        onChange={(evt) => setStreamPubkey(evt.target.value)}
                      />
                    </div>
                  </div>
                ) : proposal_type == pic.ProposalType.WITHDRAW_FROM_STREAM ? (
                  <div>
                    <div className="item-wrapper">
                      <div className="title">Amount</div>
                      <input
                        required
                        key="3"
                        value={amount}
                        onChange={(evt) =>
                          setAmount(parseInt(evt.target.value || "0"))
                        }
                      />
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Withdrawal Receiver</div>
                      <input
                        required
                        key="4"
                        value={proposed_withdrawal_receiver}
                        onChange={(evt) =>
                          setProposedWithdrawalReceiver(evt.target.value)
                        }
                      />
                    </div>
                    <div className="item-wrapper">
                      <div className="title">Withdrawal Stream</div>
                      <input
                        required
                        key="5"
                        value={proposed_withdrawal_stream}
                        onChange={(evt) =>
                          setProposedWithdrawalStream(evt.target.value)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="proposal-content-save">
            <Button
              btn_type="common"
              btn_title="Submit"
              onClick={onClickSavePorposeBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
