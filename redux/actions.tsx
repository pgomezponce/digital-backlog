import { SIGN_IN, SIGN_OUT } from "./types";

function signIn(payload: Object) {
    return {
        type: SIGN_IN,
        payload: payload,
    }
}

function signOut() {
    return {
        type: SIGN_OUT,
    }
}

const sessionActions = {
    signIn,
    signOut,
}

export {sessionActions};

