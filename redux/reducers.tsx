import { combineReducers } from "redux";
import { sessionActions } from "./actions";
import { SIGN_IN, SIGN_OUT } from "./types";

const userInitialState = {
    isLogged: false,
    userInfo: []
};

function signIn(state:Object, payload:Object) {
    return {
        ...state,
        userInfo: payload.user,
        isLogged: true,
    }
}

function signOut(state:Object) {
    return {
        ...state,
        user: [],
        isLogged: false,
    }
}

function userReducer(state:Object=userInitialState, action:Object) {
    console.log(action);
    
    switch (action.type) {
        case SIGN_IN:
            state = signIn(state, action.payload);
            return state;
        
        case SIGN_OUT:
            state = signOut(state);
            return state;

        default:
            return state;
    }
}

let reducers = combineReducers({user: userReducer});

export {reducers};