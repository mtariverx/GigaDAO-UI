import React from "react";
import {Owner} from "pic/pic";
import {pic} from "../pic/connect";

type Action = {type: string, newOwnerData: Owner}
type Dispatch = (action: Action) => void;
type State = Owner;
type OwnerDataProviderProps = {children: React.ReactNode};
const OwnerDataContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

export function OwnerDataProvider({children}: OwnerDataProviderProps) {
    const [state, dispatch] = React.useReducer(ownerDataReducer, {});
    return (
        <OwnerDataContext.Provider value={{state, dispatch}}>
            {children}
        </OwnerDataContext.Provider>
    )
}

function ownerDataReducer(state: State, action: Action){
    let newState = action.newOwnerData;
    switch (action.type){
        case 'connect': {
            return newState;
        }
        case 'disconnect': {
            return {};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

async function callConnectOwner(dispatch, owner){
    let newOwner = await pic.connectOwner(owner);
    dispatch({type: 'connect', newOwnerData: newOwner})
}

async function callDisconnectOwner(dispatch){
    // TODO will need to await this for live mode
    dispatch({type: 'disconnect', newOwnerData: {}})
}

export function useOwnerData(){
    const {state, dispatch} = React.useContext(OwnerDataContext);
    return {owner: state, dispatch, callConnectOwner, callDisconnectOwner};
}