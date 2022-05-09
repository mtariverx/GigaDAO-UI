import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ClusterModal } from "components/ClusterModal";
import { MessageBanner } from "components/MessageBanner";
import {ConnectOwnerLoadingBanner, Navbar} from "components/Navbar";
import { ClusterStatusBanner } from "components/ClusterStatusButton";
import { SearchBar } from "components/SearchBar";
import { VerifiedDAOs } from "./pages/VerifiedDAOs";
import { ConnectWalletBannerButton } from "./components/ConnectWalletNavButton";
import { DaoPage } from "./pages/DaoPage";
import MainDashBoard from "./pages/MainDashBoard";
import ReactGA from 'react-ga4';

const PROD_GA_MID = "G-7ZX9B5QVXZ";
const TEST_GA_MID = "G-RGDZ6GH4CH";
let GA_MEASUREMENT_ID = (window.location.host.includes("gigadao.io")) ? PROD_GA_MID : TEST_GA_MID;
console.log("using ga mid: ", GA_MEASUREMENT_ID);

ReactGA.initialize(GA_MEASUREMENT_ID, {gaOptions: {siteSpeedSampleRate: 100}});
ReactGA.send({hitType: "pageview", page: window.location.pathname + window.location.search});

function App() {
  return (
    <>
      <ClusterModal />
      <div className="main-content">
        {/* <Switch> */}
         
          {/* <Navbar />
          <MessageBanner />
          <ClusterStatusBanner />
          <ConnectWalletBannerButton />
          <SearchBar /> */}
          <Switch>
          {/* <Route path="/" component={MainDashBoard} /> */}
          <Route path="/maindashboard" component={MainDashBoard} />
            <Route exact path={"/"}>
              <VerifiedDAOs />
            </Route>
            <Route
              exact
              path={"/dao/:dao_id"}
              render={({ match }) => <DaoPage dao_id={match.params.dao_id} />}
            />
            <Route
              render={({ location }) => (
                <Redirect to={{ ...location, pathname: "/" }} />
              )}
            />
          </Switch>
        {/* </Switch> */}
      </div>
    </>
  );
}

export default App;
