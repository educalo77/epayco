const intialState={
    transaction:null,
    allTransactions:null,
    openModal:false
}

export default function transactionReducer(state=intialState, action){
    switch(action.type){
        case "SET_TRANSACTION":
            return {...state, transaction:action.payload};
        case "GET_ALL_TRANSACTIONS":
            return {...state, allTransactions:action.payload}
        case "OPEN_MODAL":
            return {...state, openModal:action.payload}
        case "CLOSE_MODAL":
            return {...state, openModal:false}
        default:
            return state
    }
}