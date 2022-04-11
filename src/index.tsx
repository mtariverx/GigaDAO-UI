import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/main.scss";
import App from "./App";
import {ClusterProvider} from "./providers/cluster";
import {WalletButtonProvider} from "./providers/wallet";
import {DaoDataProvider} from "./providers/daos";
import {OwnerDataProvider} from "./providers/owner";

ReactDOM.render(
    <Router>
        <ClusterProvider>
            <WalletButtonProvider>
                <OwnerDataProvider>
                    <DaoDataProvider>
                        <App />
                    </DaoDataProvider>
                </OwnerDataProvider>
            </WalletButtonProvider>
        </ClusterProvider>
    </Router>,
    document.getElementById("root")
);
