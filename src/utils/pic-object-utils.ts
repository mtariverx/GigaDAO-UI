//
function cloneObject(state){
    const myClonedObect = Object.assign({}, state)
    return myClonedObect;
}

export {cloneObject}