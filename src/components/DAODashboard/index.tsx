import { useEffect, useState } from "react";
import "./style.scss";
import MemberGraph from "components/common/MemberGraph";
import Refresh from "img/icons/refresh_1.png";
import Profile from "img/icons/profile.png";
import DAODetailModal from "components/DAODetailModal";
import NewStream from "components/NewStream";
import NewProposal from "components/NewProposal";
import DAOSocial from "components/DAOSocial";
import IconButton from "components/common/IconButton";
import NewDAO from "components/NewDAO";
import Button from "components/common/Button";

import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import { Keypair, PublicKey } from "@solana/web3.js";

const DAODashboard: React.FC = (props) => {
  const new_owner: pic.Owner = { address: Keypair.generate().publicKey };
  const [member_daos, setMemberDAOs] = useState<Array<pic.Dao>>([]);
  const [member_dao_ids, setMemberDaoIds] = useState<string[]>([]);
  const [dashitem, setDashItem] = useState(0);
  const [selected_member_dao, setSelectedMemberDAO] = useState<pic.Dao>();
  const [show_modal, setShowModal] = useState(-1);
  type counc_sign_pair = {
    councillor: PublicKey;
    signer: boolean;
  };
  const [counc_sign, setCounc_Sign] = useState<counc_sign_pair[]>([]);

  useEffect(() => {
    console.log("useEffect async");
    (async () => {
      let member_daos_promise = await simPic.getMemberDaos(new_owner);
      let mdis: Array<string> = [];
      let m_daos: Array<pic.Dao> = [];
      m_daos = member_daos_promise;
      setMemberDAOs(m_daos);
      mdis = m_daos.map((dao) => dao.dao_id);
      setMemberDaoIds(mdis);
      setSelectedMemberDAO(m_daos[0]); //only first
      console.log("--m_daos[0]=", m_daos[0]);
      let tmp_counc_sign_arr: Array<counc_sign_pair> = [];
      // console.log("yes");
      // if (m_daos[0].governance.proposed_councillors) {
      //   console.log("yes");
      //   m_daos[0].governance.proposed_councillors.forEach(function (
      //     councillor,
      //     index
      //   ) {
      //     console.log("councillor=",councillor);
      //     let tmp: counc_sign_pair = {
      //       councillor: councillor,
      //       signer: selected_member_dao.governance.proposed_signers[index],
      //     };
      //     tmp_counc_sign_arr.push(tmp);
      //   });
      //   setCounc_Sign(tmp_counc_sign_arr);
      // }
    })();
    console.log("useEffect[]-end");
  }, []);
  // useEffect(()=>{
  //   let tmp_counc_sign_arr: Array<counc_sign_pair> = [];
  //   console.log("yes");
  //   if (selected_member_dao.governance.proposed_councillors) {
  //     console.log("yes");
  //     selected_member_dao.governance.proposed_councillors.forEach(function (
  //       councillor,
  //       index
  //     ) {
  //       let tmp: counc_sign_pair = {
  //         councillor: councillor,
  //         signer: selected_member_dao.governance.proposed_signers[index],
  //       };
  //       tmp_counc_sign_arr.push(tmp);
  //     });
  //     setCounc_Sign(tmp_counc_sign_arr);
  //   }
  // },[selected_member_dao]);
  useEffect(() => {
    console.log("useEffect");
    console.log("member_dao_ids=", member_dao_ids);
    console.log("member_daos=", member_daos);
    console.log("--selected dao=", selected_member_dao);
  });

  let dao: pic.Dao;

  const onChangeSelectMemberDAO = (event) => {
    let dao_id = event.target.value;
    setMemberDao(dao_id);
  };

  const setMemberDao = (dao_id: string) => {
    for (const dao of member_daos) {
      if (dao.dao_id == dao_id) {
        setSelectedMemberDAO(dao);
        console.log("------++-", dao);
      }
    }
  };
  const onClickApproveProposeBtn = async () => {
    const wallet_address = Keypair.generate().publicKey;
    if (dao.governance) {
      const proposed_councillors = dao.governance.proposed_councillors;
      let index = proposed_councillors.indexOf(wallet_address);
      if (index != -1) {
        let proposed_signers = dao.governance.proposed_signers;
        proposed_signers.splice(index, 1, true);
      }
    }

    const _dao = await simPic.approveDaoCommand(dao);
  };

  const onClickExecuteProposeBtn = () => {};

  return (
    <div className="dashboard-content">
      {/* <div className="right-content"> */}
      <div className="top-nav">
        <div className="dash-title">DAO Dashboard</div>
        <div className="top-nav-right">
          <div className="nav-dao-search">
            <input type="text" placeholder="DAO Search.." name="search" />
          </div>
          {/* <button className="dash-connection-btn">Connection</button> */}
          <Button is_btn_common={false} btn_title="Connection" />
          <div className="nav-dao-profile">
            <IconButton icon_img={Profile} is_background={false} />
          </div>
        </div>
      </div>
      <div className="dashboard-main-content">
        <div className="content-left">
          <div className="address-refresh_btn">
            <div onClick={() => setShowModal(0)}>
              <IconButton icon_img={Profile} is_background={false} />
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
            {/* <div className="refresh_btn">
              <img src={Refresh} />
            </div> */}
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
              <div className="dash-details-items">
                <div className="item-pair">
                  <div>Unique Wallets</div>
                  <div>4,302</div>
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
              <div className="dash-details-graph">
                <MemberGraph />
              </div>
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
          <div className="proposal-setting">
            <div className="proposal-active">Active proposal</div>
            <div className="proposal-description">
              <div className="descrption-item-value">
                <div className="descrption-item">Amount</div>
                <div className="descrption-value">1,000,000</div>
              </div>
              <div className="descrption-item-value">
                <div className="descrption-item">Token</div>
                <div className="descrption-value">
                  <div>
                    <img src="/icons/entry-icon-farms.svg" />
                  </div>
                  <div>GIGS</div>
                </div>
              </div>
              <div className="descrption-item-value">
                <div className="descrption-item">Withdrawal Address</div>
                <div className="descrption-value">ifk439kkfifsdkio320ux</div>
              </div>
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
                  <div className="text-pubkey">item.councilor</div>
                  <div className="vote-state">item.signer</div>
                </div>
              ))}
              <div className="councillor-pubkey-pair">
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">Aproved</div>
              </div>
              <div className="councillor-pubkey-pair">
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">Aproved</div>
              </div>
              <div className="councillor-pubkey-pair">
                <div className="text-pubkey">234234afq32ffeqw34fqafqwe</div>
                <div className="vote-state">-</div>
              </div>
            </div>

            <div className="proposal-btn-group">
              {/* <button className="btn">Approve</button>
              <button className="btn">Execute</button> */}
              <Button is_btn_common={true} btn_title="Approve" />
              <Button is_btn_common={true} btn_title="Execute" />
            </div>
          </div>
        </div>
      </div>
      {show_modal == 0 ? (
        <DAODetailModal>
          <NewDAO dao={selected_member_dao} />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 1 ? (
        <DAODetailModal>
          <NewStream dao={selected_member_dao} />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 2 ? (
        <DAODetailModal>
          <NewProposal dao={selected_member_dao} />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 4 ? (
        <DAODetailModal>
          <DAOSocial />
        </DAODetailModal>
      ) : (
        ""
      )}
    </div>
  );
};
export default DAODashboard;
