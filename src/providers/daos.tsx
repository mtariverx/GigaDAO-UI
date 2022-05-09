import React, {useEffect} from "react";
import {verifiedDaos} from "../preload/verified-daos";
import {Dao} from "pic/pic";
import {pic} from "../pic/connect";
import {useOwnerData} from "./owner";
import {cloneObject} from "../utils/pic-object-utils";
import {getDaoById} from "../utils/pic-object-utils";

async function fetchStreamData(daos: Array<Dao>): Promise<Array<Dao>> {
    let newDaos = await pic.getDaos(daos);
    return newDaos;
}

type Action = {type: 'refresh', newDaosData: Array<Dao>}
type Dispatch = (action: Action) => void;
type State = Array<Dao>;
type DaoDataProviderProps = {children: React.ReactNode};

const DaoDataContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

function daoDataReducer(state: State, action: Action){

    switch (action.type){
        case 'refresh': {
            let newDaos = action.newDaosData;
            for (const dao of newDaos){
                let result = getDaoById(state, dao.dao_id);
                state[result.index] = dao;
            }
            const myClonedArray = [];
            state.forEach(val => myClonedArray.push(Object.assign({}, val)));
            return myClonedArray;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function DaoDataProvider({children}: DaoDataProviderProps) {
    const [state, dispatch] = React.useReducer(daoDataReducer, verifiedDaos);
    const {owner} = useOwnerData();

    // reconcile owner with daos
    useEffect(() =>{
        if (owner.address){
            if (owner.daos){
                if (owner.daos.length > 0){
                    let updateState = false
                    const daoIds = owner.daos.map((dao, _) => dao.dao_id);
                    const daoAddresses = owner.daos.map((dao, _) => dao.address.toString());
                    let daosToRefresh = [];
                    for (let dao of state){
                        if (daoIds.includes(dao.dao_id) || daoAddresses.includes(dao.address?.toString())){
                            if (dao.is_member !== true){
                                daosToRefresh.push(dao);
                                dao.is_member = true;
                                updateState = true;
                            }
                        }
                    }
                    if (updateState){
                        fetchStreamData(daosToRefresh).then(()=>{
                            dispatch({type: 'refresh', newDaosData: state})
                        })
                    }
                }
            }
        } else {
            for (let dao of state){
                dao.is_member = false;
            }
            dispatch({type: 'refresh', newDaosData: state})
        }
    }, [owner])

    return (
        <DaoDataContext.Provider value={{state, dispatch}}>
            {children}
        </DaoDataContext.Provider>
    )
}

async function refreshStreams(dispatch, daos){
    let streamData = await fetchStreamData(daos);
    dispatch({type: 'refresh', newDaosData: streamData})
}

export function useDaoData(){
    const {state, dispatch} = React.useContext(DaoDataContext);
    return {verifiedDaos: state, dispatch, refreshStreams};
}



