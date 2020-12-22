const intialState={
    balance:null,
}

export default function transactionReducer(state=intialState, action){
    switch(action.type){
        case "GET_BALANCE":
            return {...state, balance:action.payload}
        default:
            return state
    }
}