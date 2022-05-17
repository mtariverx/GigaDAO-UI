import { useEffect, useState } from "react";
import "./style.scss";
import MemberGraph from "components/common/MemberGraph";
import Refresh from "img/icons/refresh_1.png";
import Profile from "img/icons/profile.png";
import Plus_fill from "img/icons/plus_symbol_fill.png";
import Gigs_log from "img/icons/small_gigs_token_logo.png";

import DAODetailModal from "components/DAODetailModal";
import NewStream from "components/NewStream";
import NewProposal from "components/NewProposal";
import DAOSocial from "components/DAOSocial";
import IconButton from "components/common/IconButton";
import NewDAO from "components/NewDAO";
import Button from "components/common/Button";
import { ConnectWalletNavButton } from "../ConnectWalletNavButton";

import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import * as livePic from "../../pic/live";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useWallet } from "providers/adapters/core/react";
import { useOwnerData } from "providers/owner";

const DAODashboard: React.FC = (props) => {
  const [collapse, setCollapse] = useState(false);
  const { publicKey, connected } = useWallet();
  const { dispatch, callConnectOwner, callDisconnectOwner } = useOwnerData();
  const [isConnectingToOwner, setIsConnectingToOwner] = useState(false);

  const new_owner: pic.Owner = { address: Keypair.generate().publicKey }; //testing for sim.ts
  const [member_daos, setMemberDAOs] = useState<Array<pic.Dao>>([]);
  const [member_dao_ids, setMemberDaoIds] = useState<string[]>([]);
  const [dashitem, setDashItem] = useState(0);
  const [selected_member_dao, setSelectedMemberDAO] = useState<pic.Dao>();
  const [show_modal, setShowModal] = useState(-1);
  const wallet= useAnchorWallet();
  console.log("wallet=",wallet);
  type counc_sign_pair = {
    councillor: PublicKey;
    signer: boolean;
  };

  const [counc_sign, setCounc_Sign] = useState<counc_sign_pair[]>([]);
  const [active_proposal_info, setActiveProposalInfo] = useState<Array<any[]>>(
    []
  );

  const getShortKey = (long_key: string) => {
    const str: string = long_key.slice(0, 7) + "..." + long_key.slice(-7);
    return str;
  };


  useEffect(() => {
    (async () => {
      if (connected) {
        setIsConnectingToOwner(true);
        let newOwner: pic.Owner = { address: publicKey };
        callConnectOwner(dispatch, newOwner).then(() => {
          setIsConnectingToOwner(false);
        });
        
       
        let member_daos_promise = await livePic.getMemberDaos(newOwner);
        console.log("member_daos_promise=",await livePic.getMemberDaos(newOwner));
        // let member_daos_promise = await simPic.getMemberDaos(new_owner); //testing for sim.ts
        // console.log("member_daos_promise=",member_daos_promise);
        

        // let member_daos_promise = await simPic.getMemberDaos(new_owner); //testing for sim.ts
        let mdis: Array<string> = [];
        let m_daos: Array<pic.Dao> = [];
        m_daos = member_daos_promise;
        setMemberDAOs(m_daos);
        mdis = m_daos.map((dao) => dao.dao_id);
        setMemberDaoIds(mdis);
        setSelectedMemberDAO({ ...m_daos[0] }); //only first
        setCouncillorSignerPair({ ...m_daos[0] });
        getActiveProposalInfo({ ...m_daos[0] });
        //testing
        livePic.showAllCallsInProgram(wallet); // testing for solana
        console.log("dashboard-getDaoFromChain-",livePic.getDaoFromChain(wallet, m_daos[0]));
      } else {
        callDisconnectOwner(dispatch);
      }
    })();
  }, [connected]);

  useEffect(() => {
    if (selected_member_dao != undefined) {
      setCouncillorSignerPair(selected_member_dao);
      getActiveProposalInfo(selected_member_dao);
    }
  }, [selected_member_dao]);

  const setCouncillorSignerPair = (dao: pic.Dao) => {
    let tmp_counc_sign_arr: Array<counc_sign_pair> = [];
    console.log("++++",dao);
    if (dao.governance.proposed_councillors!=undefined) {
      dao.governance.proposed_councillors.forEach(function (councillor, index) {
        let tmp: counc_sign_pair = {
          councillor: councillor,
          signer: dao.governance.proposed_signers[index],
        };
        tmp_counc_sign_arr.push(tmp);
      });
      setCounc_Sign(tmp_counc_sign_arr);
    }
  };

  useEffect(() => {});

  let dao: pic.Dao;

  const onChangeSelectMemberDAO = (event) => {
    let dao_id = event.target.value;
    setMemberDao(dao_id);
    setCouncillorSignerPair({ ...selected_member_dao });
  };

  const setMemberDao = (dao_id: string) => {
    for (const dao of member_daos) {
      if (dao.dao_id == dao_id) {
        setSelectedMemberDAO({ ...dao });
      }
    }
  };

  const getActiveProposalInfo = (dao: pic.Dao) => {
    const governance = dao.governance;
    let tmp: any = [];
    if (governance.proposal_type == pic.ProposalType.DEACTIVATE_STREAM) {
      tmp = [
        ["Proposal Type", "DEACTIVEATE_STREAM"],
        [
          "Stream Public Key",
          getShortKey(governance.proposed_withdrawal_stream.toString()),
        ],
      ];
    } else if (
      governance.proposal_type == pic.ProposalType.WITHDRAW_FROM_STREAM
    ) {
      tmp = [
        ["Proposal Type", "WITHDRAW FROM STREAM"],
        ["Amount", `${governance.proposed_withdrawal_amount}`],
        [
          "Proposed Withdraw Receiver",
          getShortKey(governance.proposed_withdrawal_receiver.toString()),
        ],
        [
          "Proposed Withdraw Stream",
          getShortKey(governance.proposed_withdrawal_stream.toString()),
        ],
      ];
    } else if (governance.proposal_type == pic.ProposalType.UPDATE_MULTISIG) {
      tmp = [["Proposal Type", "UPDATE_MULTISIG"]];
    }
    setActiveProposalInfo(tmp);
  };
  const onClickApproveProposeBtn = async () => {
    const wallet_address = "CRWMVg3k7JGuxFMMADRQTdBSNtB6LNWakEJDUeG8k2KN";
    const dao: pic.Dao = selected_member_dao;
    if (dao.governance) {
      const proposed_councillors = dao.governance.proposed_councillors;
      let councillors = proposed_councillors.map((item) => item.toString());
      let index = councillors.indexOf(wallet_address);
      if (index != -1) {
        let proposed_signers = dao.governance.proposed_signers;
        proposed_signers.splice(index, 1, true);
        dao.governance.proposed_signers = proposed_signers;
        setSelectedMemberDAO({ ...dao });
      }
    }

    const _dao = await simPic.approveDaoCommand(dao);
  };

  const onClickExecuteProposeBtn = () => {};

  return (
    <div className="dashboard-content">
      <a href="https://staking.gigadao.io/" target="_blank">
        <div className="menu-icon">
          <span>Show Menu</span>
        </div>
      </a>
      <div className="top-nav-bar">
        <div className="dash-title">DAO Dashboard</div>
        <div className="top-nav-right">
          <div className="nav-dao-search">
            <input type="text" placeholder="DAO Search.." name="search" />
          </div>
          <div className="connection-refresh_btn">
            <ConnectWalletNavButton />
            <IconButton icon_img={Profile} is_background={false} />
          </div>
          {/* <Button btn_type="connection" btn_title="Connection" /> */}
        </div>
      </div>
      <div className="dashboard-main-content ">
        <div className="content-left">
          <div className="address-refresh_btn">
            <div onClick={() => setShowModal(0)}>
              <IconButton icon_img={Plus_fill} is_background={false} />
            </div>
            <div className="select-memeberDAO">
              <select onChange={onChangeSelectMemberDAO}>
                {member_dao_ids.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <IconButton icon_img={Refresh} is_background={false} />
            </div>
          </div>
          <div className="member-token">
            <div className="dash-items">
              <div
                className={`item-each ${dashitem == 0 ? "active" : ""}`}
                onClick={() => setDashItem(0)}
              >
                Members
              </div>
              <div
                className={`item-each ${dashitem == 1 ? "active" : ""}`}
                onClick={() => setDashItem(1)}
              >
                Token Pools
              </div>
              <div
                className={`item-each ${dashitem == 2 ? "active" : ""}`}
                onClick={() => setDashItem(2)}
              >
                Token Streams
              </div>
              <div
                className={`item-each ${dashitem == 3 ? "active" : ""}`}
                onClick={() => setDashItem(3)}
              >
                Voting
              </div>
              <div
                className={`item-each ${dashitem == 4 ? "active" : ""}`}
                onClick={() => setDashItem(4)}
              >
                More...
              </div>
            </div>
            <div className="dash-details">
              Tracking Data Coming Soon!
              {/* <div className="dash-details-items">
                <div className="item-pair">
                  <div>Unique Wallets</div>
                  <div>4,302</div>
                  Tracking Data coming soon!
                </div>
                <div className="item-pair">
                  <div>Total Staked</div>
                  <div>5,999</div>
                </div>
                <div className="item-pair">
                  <div>Total Connected</div>
                  <div>5,999</div>
                </div>
              </div>
              <div className="dash-details-graph"><MemberGraph /></div> */}
            </div>
          </div>
          <div className="tokenpool-proposal">
            <div
              className="dashboard-card tokenpool-streams "
              onClick={() => setShowModal(1)}
            >
              Token Pools <br />& Streams
            </div>
            <div
              className="dashboard-card new-proposal"
              onClick={() => setShowModal(2)}
            >
              New Proposal
            </div>
          </div>
          <div className="voting-social">
            <div
              className="dashboard-card dao-voting"
              onClick={() => setShowModal(3)}
            >
              Voting
            </div>
            <div
              className="dashboard-card dao-social"
              onClick={() => setShowModal(4)}
            >
              DAO Social
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="active-proposal">
            <div className="proposal-setting">
              <div className="proposal-active">Active proposal</div>
              <div className="proposal-description">
                {/* <div className="description-item-value">
                <div className="description-item">Amount</div>
                <div className="description-value">1,000,000</div>
              </div>
              <div className="description-item-value">
                <div className="description-item">Token</div>
                <div className="description-value">
                  <div>GIGS</div>
                  <div className="div-img">
                    <img src={Gigs_log} />
                  </div>
                </div>
              </div> */}
                {active_proposal_info.map((item_pair) => {
                  return (
                    <div className="description-item-value">
                      <div className="description-item">{item_pair[0]}</div>
                      <div className="description-value">{item_pair[1]}</div>
                    </div>
                  );
                })}
                <div>Description</div>
                <div>
                  Moving GIGS to a new token pool for a new stream for our
                  platinum holders
                </div>
              </div>
              <div className="proposal-councillors">Councillors</div>
              <div className="proposal-councillor-pubkeys">
                {counc_sign.map((item) => (
                  <div className="councillor-pubkey-pair">
                    <div className="text-pubkey">
                      {getShortKey(item.councillor.toString())}
                    </div>
                    <div className="vote-state">
                      {item.signer ? "Approved" : "-"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="proposal-btn-group">
                {/* <button className="btn">Execute</button> */}
                <Button
                  btn_type="common"
                  btn_title="Approve"
                  onClick={onClickApproveProposeBtn}
                />
                <Button btn_type="common" btn_title="Execute" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {show_modal == 0 && connected ? (
        <DAODetailModal onClick={() => setShowModal(-1)}>
          <NewDAO dao={selected_member_dao} onClose={() => setShowModal(-1)} />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 1 && connected ? (
        <DAODetailModal onClick={() => setShowModal(-1)}>
          <NewStream
            dao={selected_member_dao}
            onClose={() => setShowModal(-1)}
          />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 2 && connected ? (
        <DAODetailModal onClick={() => setShowModal(-1)}>
          <NewProposal
            dao={selected_member_dao}
            onClose={() => setShowModal(-1)}
          />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 4 && connected ? (
        <DAODetailModal onClick={() => setShowModal(-1)}>
          <DAOSocial onClose={() => setShowModal(-1)} />
        </DAODetailModal>
      ) : (
        ""
      )}
    </div>
  );
};
export default DAODashboard;
