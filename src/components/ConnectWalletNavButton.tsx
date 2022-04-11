import React, { useEffect, useMemo } from "react";
import {useWalletModal} from "providers/adapters/core/ui";
import {useWallet} from "../providers/adapters/core/react";
import {useOwnerData} from "../providers/owner";
import * as pic from "../pic/pic";


export function ConnectWalletNavButton() {

    const { setVisible } = useWalletModal();
    const { disconnect, connected } = useWallet();

    function handleClick(e) {
        if (connected){
            disconnect();
        } else {
            setVisible(true);
        }
    }

    return (
        <div onClick={(e) => handleClick(e)}>
            <Button />
        </div>
    );
}

export function ConnectWalletBannerButton() {

    const { setVisible } = useWalletModal();
    const { disconnect, connected } = useWallet();

    function handleClick() {
        if (connected){
            disconnect();
        } else {
            setVisible(true);
        }
    }

    return (
        <div className="container d-md-none my-4">
            <div onClick={() => handleClick()}>
                <Button />
            </div>
        </div>
    );
}


function Button() {
    const {publicKey, wallet, connected, connecting} = useWallet();

    // format button
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const str_rep = (!wallet || !base58) ? null : (base58.slice(0, 4) + '..' + base58.slice(-4));
    let statusName = connecting ? "Connecting..." : (!connected ? "Connect Wallet" : "Disconnect " + str_rep);
    const btnClasses = `btn d-block wallet-adapter-button-trigger`;
    return (
        <span className={btnClasses}>
          <span className="fe fe-check-circle me-2"></span>
            {statusName}
        </span>
    );

}

function Button2() {
    const {publicKey, wallet, connected, connecting} = useWallet();
    const {dispatch, callConnectOwner, callDisconnectOwner} = useOwnerData();

    // update dao data
    useEffect(() => {
        if (connected) {
            let newOwner: pic.Owner = {address: publicKey};
            callConnectOwner(dispatch, newOwner);
        } else {
            console.log("disconnected detected in useEffect()")
            callDisconnectOwner(dispatch);
        }
    },[connected]);

    // format button
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const str_rep = (!wallet || !base58) ? null : (base58.slice(0, 4) + '..' + base58.slice(-4));
    let statusName = connecting ? "Connecting..." : (!connected ? "Connect Wallet" : "Disconnect " + str_rep);
    const btnClasses = `btn d-block wallet-adapter-button-trigger`;
    return (
        <span className={btnClasses}>
          <span className="fe fe-check-circle me-2"></span>
            {statusName}
        </span>
    );

}



