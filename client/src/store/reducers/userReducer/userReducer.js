const intialState={
    user:null,
    register:null
}

export default function userReducer(state=intialState, action){
    
    switch(action.type){
        case "SIGN_UP":
            return{...state, register: action.payload}
        case "SIGN_IN":
            return {...state, user:action.payload};
        case "SIGN_OUT":
            return {...state, user:null}
        default:
            return state
    }
}