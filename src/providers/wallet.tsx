import React, {FC, ReactNode, useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {NETWORK as CUSTOM_NETWORK} from "../pic/connect";

// import {
//     LedgerWalletAdapter,
//     PhantomWalletAdapter,
//     SlopeWalletAdapter,
//     SolflareWalletAdapter,
//     SolletExtensionWalletAdapter,
//     SolletWalletAdapter,
//     TorusWalletAdapter
// } from "@solana/wallet-adapter-wallets";
// import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

import {PhantomWalletAdapter} from "./adapters/phantom";
import {ConnectionProvider} from "./adapters/core/react";
import {WalletProvider} from "./adapters/core/react";
import {WalletModalProvider} from "./adapters/core/ui";

export enum WalletAdapterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
}
const NETWORK = WalletAdapterNetwork.Mainnet;

export const WalletButtonProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = NETWORK;

    // TODO make this more elegant...
    // You can also provide a custom RPC endpoint.
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = CUSTOM_NETWORK;

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // new SlopeWalletAdapter(),
            // new TorusWalletAdapter(),
            // new LedgerWalletAdapter(),
            // new SolletWalletAdapter({ network }),
            // new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

