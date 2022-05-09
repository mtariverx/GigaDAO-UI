import React, {useEffect, useMemo, useState} from "react";
import Logo from "img/logos-solana/gigadao-full-brand-cropped.png";
import { clusterPath } from "utils/url";
import { Link, NavLink } from "react-router-dom";
import { ClusterStatusButton } from "components/ClusterStatusButton";
import { ConnectWalletNavButton } from "./ConnectWalletNavButton";
import { useWallet } from "../providers/adapters/core/react";
import { useOwnerData } from "../providers/owner";
import * as pic from "../pic/pic";
import {Grid} from "react-loader-spinner";
import {useWalletModal} from "../providers/adapters/core/ui";

export function Navbar() {
  // TODO: use `collapsing` to animate collapsible navbar
  const [collapse, setCollapse] = React.useState(false);
  const {publicKey, connected } = useWallet();
  const {dispatch, callConnectOwner, callDisconnectOwner} = useOwnerData();
  const [isConnectingToOwner, setIsConnectingToOwner] = useState(false);

  // update dao data
  useEffect(() => {
    if (connected) {
      setIsConnectingToOwner(true);
      let newOwner: pic.Owner = {address: publicKey};
      callConnectOwner(dispatch, newOwner)
          .then(()=>{
            setIsConnectingToOwner(false);
          })
    } else {
      callDisconnectOwner(dispatch);
    }
  },[connected]);


  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <Link to={clusterPath("/")}>
          <img
            className="logo-img"
            src={Logo}
            width="160"
            alt="Solana Explorer"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapse((value) => !value)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ms-auto me-4 ${
            collapse ? "show" : ""
          }`}
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={clusterPath("/")} exact>
                Collections
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={clusterPath("/dao/gigadao")}
                exact
              >
                GigaDAO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={clusterPath("/Dashboard")}
                exact
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {isConnectingToOwner ? (
            <div className="d-none d-md-block padded-btn">
              <ConnectOwnerLoadingButton/>
            </div>
        ) : ""}

        <div className="d-none d-md-block padded-btn">
          <ConnectWalletNavButton />
        </div>

        <div className="d-none d-md-block padded-btn">
          <ClusterStatusButton />
        </div>
      </div>
    </nav>
  );
}

function ConnectOwnerLoadingButton() {
  return (
      <div className="nav-button-height">
        <Grid height="100%"/>
      </div>
  );
}

export function ConnectOwnerLoadingBanner() {
  return (
      <div className="container d-md-none my-4 mobile-owner-loading-container">
        <Grid height="100%"/>
      </div>
  );
}
