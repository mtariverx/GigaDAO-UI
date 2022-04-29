import { useState } from "react";
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

const DAODashboard: React.FC = (props) => {
  const memberDAOs = [
    { value: "23a92039jrlafh9832h", label: "23a92039jrlafh9832h" },
    { value: "7643ww34gssg456sd63", label: "7643ww34gssg456s63" },
    { value: "sf8qaefafjsdnbcb32h", label: "sf8qaefafjsdnbcb32h" },
  ];
  const [dashitem, setDashItem] = useState(0);
  const [memberDAO, setMemberDAO] = useState(memberDAOs[0].value);
  const [show_modal, setShowModal] = useState(-1);

  const onChangeSelectMemberDAO = (event) => {
    setMemberDAO(event.target.value);
  };

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
          <button className="nav-dao-profile">
            <img src={Profile} />
          </button>
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
                {memberDAOs.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <button className="refresh_btn">
              <img src={Refresh} />
            </button>
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
          <NewDAO />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 1 ? (
        <DAODetailModal>
          <NewStream />
        </DAODetailModal>
      ) : (
        ""
      )}
      {show_modal == 2 ? (
        <DAODetailModal>
          <NewProposal />
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
