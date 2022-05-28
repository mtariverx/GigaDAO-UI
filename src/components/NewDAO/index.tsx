import "./style.scss";
import "../common/LabelInput/style.scss";
import { useEffect, useState } from "react";
import Button from "components/common/Button";
import Plus_fill from "img/icons/plus_symbol_fill.png";
import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import * as livePic from "../../pic/live";
import { Keypair, PublicKey } from "@solana/web3.js";
import { validateSolanaAddress } from "../CommonCalls";
import { useAnchorWallet, useWallet } from "providers/adapters/core/react";
import { useOwnerData } from "providers/owner";
import { plugins } from "chart.js";

const NewDAO = (props) => {
  const [dao_id, setDaoId] = useState<string>();
  const [dao_disp_name, setDaoDispName] = useState<string>();
  const [dao_disp_img, setDaoDispImg] = useState<string>();
  const [councillors, setCouncillors] = useState<string[]>([]);
  const [one_councillor, setOneCouncillor] = useState<string>();
  const [approval_threshold, setApprovalThresold] = useState(0);
  
  const [collapse, setCollapse] = useState(false);
  const { publicKey, connected } = useWallet();
  const { dispatch, callConnectOwner, callDisconnectOwner } = useOwnerData();
  const [isConnectingToOwner, setIsConnectingToOwner] = useState(false);
  
  const wallet = useAnchorWallet();
  useEffect(() => {
    setCouncillors([wallet.publicKey.toString()]);
  },[])

  const onClickCreateNewDAOBtn = async () => {

    const key=Keypair.generate();
    let new_dao: pic.Dao = {
      address:key.publicKey,
      dao_id: "",
      image_url: "",
      display_name: "",
      num_nfts: 0,
      is_member: false,
      dao_keypair: key,
    };
    
    let governance: pic.Governance={
      councillors:[],
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
     
    if (dao_id!=undefined && dao_disp_name!=undefined && dao_disp_img!=undefined) {
      
      new_dao.dao_id = dao_id;
      new_dao.display_name = dao_disp_name;
      new_dao.image_url = dao_disp_img;
      new_dao.num_nfts = 0;
      new_dao.is_member = false;
      if (councillors) {
        const councillors_pubkey = councillors.map(
          (councillor) => new PublicKey(councillor)
        );
        governance.councillors = councillors_pubkey;
        for (let i = 0; i < councillors_pubkey.length; i++) {
          // governance.proposed_signers.push(true);
          governance.proposed_signers.push(false);
        } //no need here, in approve dao 
      }

      // governance.councillors.push(publicKey); //add owner as a councillor
      
      governance.approval_threshold = approval_threshold;

      new_dao.governance = governance;
      
      // new_dao = await simPic.initializeDao(new_dao); //initializeDao
      new_dao=await livePic.initializeDao(wallet, new_dao);
      console.log("new create dao close");
      props.onClose(); //close btn
    }
  };

  const onAddCouncillors = async() => {
    const temp = [...councillors];
    let flag=await validateSolanaAddress(one_councillor);
    if(flag){
      if(!temp.includes(one_councillor)){
        temp.push(one_councillor);
        setCouncillors(temp);
      }else{
        alert("The public key is duplicated");
      }
      
    }
    setOneCouncillor("");
  };
  return (
    <div className="NewDAO-container">
      <div className="container-title">Create New DAO</div>
      <div className="container-body">
        <div className="DAO-content">
          <div className="item-wrapper">
            <div className="title">DAO ID</div>
            <input
              key="0"
              value={dao_id}
              onChange={(evt) => setDaoId(evt.target.value)}
              required
            />
          </div>
          <div className="item-wrapper">
            <div className="title">DAO Display Name</div>
            <input
              key="1"
              value={dao_disp_name}
              onChange={(evt) => setDaoDispName(evt.target.value)}
              required
            />
          </div>
          <div className="item-wrapper">
            <div className="title">DAO Display Image</div>
            <input
              key="2"
              value={dao_disp_img}
              onChange={(evt) => setDaoDispImg(evt.target.value)}
              required
            />
          </div>
          <div className="item-wrapper plus-button">
            <div className="title">Councillors</div>
            <input
              key="3"
              value={one_councillor}
              onChange={(evt) => setOneCouncillor(evt.target.value)}
              required
            />
            <div className="input-side-btn">
              <img src={Plus_fill} onClick={onAddCouncillors} />
            </div>
          </div>
          <div className="item-wrapper">
            <div></div>
            <div className="show-collections">
              {councillors.map((item, index) => (
                <div key={index} className="item">{item}</div>
              ))}
            </div>
          </div>
          <div className="item-wrapper">
            <div className="title">Approval Threshold</div>
            <input
              key="4"
              value={approval_threshold}
              className="num"
              required
              onChange={(evt) =>
                setApprovalThresold(parseInt(evt.target.value || "0"))
              }
            />
          </div>
          <div className="DAO-content-lowerspace"></div>
        </div>
        <div className="DAO-initialize">
          <Button
            btn_type="common"
            btn_title="Initialize DAO"
            onClick={() => onClickCreateNewDAOBtn()}
          />
        </div>
      </div>
    </div>
  );
};

export default NewDAO;
