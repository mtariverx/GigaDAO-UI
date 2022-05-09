//
import * as pic from 'pic/pic';
function cloneObject(state){
    const myClonedObect = Object.assign({}, state)
    return myClonedObect;
}

function getDaoById(daos: Array<pic.Dao>, daoId: string){
    // let matches = daos.filter((dao, _) => dao.dao_id === daoId);
    for (let i = 0; i < daos.length; i++){
        if (daos[i].dao_id === daoId){
            return {dao: daos[i], index: i};
        }
    }
    alert("DAO not found, support has been automatically notified.");
}

export {cloneObject, getDaoById}