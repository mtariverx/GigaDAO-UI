import { useState } from "react";
import "../scss/MainLayout.scss";
import NavItem from "./common/NavItem";
import Dashboard from "./Dashboard";
import AboutUs from "img/icons/info_1.png";
import Whitepaper from "img/icons/book_1_1.png";
import Discord from "img/icons/discord_logo_icon_1.png";
import Twitter from "img/icons/twitter.png";
import ME_logo from "img/icons/ME_Logo.png";
import Web from "img/icons/web.png";

import Github from "img/icons/github.png";
const MainLayout = (props) => {
  const content_page = [<Dashboard />];
  const [content_page_index, setContentPageIndex] = useState(0);

  return (
    <div className="mainlayout">
      <div className="left-menu">
        <div className="menu-list">
          <div className="menu-giga-logo">
            <img
              src="/static/media/gigadao-full-brand-cropped.a590d8a4.png"
              width="160"
              alt="Solana Explorer"
            />
          </div>
          <ul>
            <li className={`${content_page_index == 0 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="Home"
                onClick={() => setContentPageIndex(0)}
              />
            </li>
            <li className={`${content_page_index == 1 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-nft.svg"
                text="NFT Staking"
                onClick={() => setContentPageIndex(1)}
              />
            </li>

            <li className={`${content_page_index == 2 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="DAO Dashboard"
                onClick={() => setContentPageIndex(2)}
              />
            </li>
            <li className={`${content_page_index == 3 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="NFT Voting"
                onClick={() => setContentPageIndex(3)}
              />
            </li>
            <li className={`${content_page_index == 4 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-staking.svg"
                text="SPL Token Voting"
                onClick={() => setContentPageIndex(4)}
              />
            </li>
            <li className={`${content_page_index == 5 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="Multi-sig Treasury"
                onClick={() => setContentPageIndex(5)}
              />
            </li>
            <li className={`${content_page_index == 6 ? "active" : ""}`}>
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="DAO Infrastructure"
                onClick={() => setContentPageIndex(6)}
              />
            </li>
          </ul>
        </div>
        <div className="menu-info">
          <div className="menu-info-item">
            <div>
              <img src={AboutUs} />
            </div>
            <div>About us</div>
          </div>
          <div className="menu-info-item">
            <div>
              <img src={Whitepaper} />
            </div>
            <div>Whitepaper</div>
          </div>
          <div className="menu-info-social">
            <div className="social-icon">
              <img src={Discord} />
            </div>
            <div className="social-icon">
              <img src={Twitter} />
            </div>
            <div className="social-icon">
              <img src={Github} />
            </div>
            <div className="social-icon">
              <img src={ME_logo} />
            </div>
          </div>
        </div>
      </div>
      <div className="right-content-mainboard">
        <Dashboard />
      </div>
    </div>
  );
};

export default MainLayout;
