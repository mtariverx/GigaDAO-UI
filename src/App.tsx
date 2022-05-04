import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ClusterModal } from "components/ClusterModal";
import { MessageBanner } from "components/MessageBanner";
import { Navbar } from "components/Navbar";
import { ClusterStatusBanner } from "components/ClusterStatusButton";
import { SearchBar } from "components/SearchBar";
import { VerifiedDAOs } from "./pages/VerifiedDAOs";
import { ConnectWalletBannerButton } from "./components/ConnectWalletNavButton";
import { DaoPage } from "./pages/DaoPage";
import MainDashBoard from "./pages/MainDashBoard";

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
          {/* <Route path="/maindashboard" component={MainDashBoard} /> */}
          <Route path="/" component={MainDashBoard} />
            {/* <Route exact path={"/"}>
              <VerifiedDAOs />
            </Route>
            <Route
              exact
              path={"/dao/:dao_id"}
              render={({ match }) => <DaoPage dao_id={match.params.dao_id} />}
            /> */}
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
