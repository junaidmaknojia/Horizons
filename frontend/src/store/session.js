const SESSION_ADD = "session/setUser"
const SESSION_REMOVE = "session/removeUser"

const initialState = {user: null};

export const sessionAdd = (user) => {{
    return {
        type: SESSION_ADD,
        payload: user
    }
}}

const sessionRemove = () => {{
    return {type: SESSION_REMOVE}
}}

export function login(user) {
    return async (dispatch) => {
        const {email, password} = user;
        const response = await fetch("/api/auth/login/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        dispatch(sessionAdd(data));
        return response;
    }
}

export function restoreUser(user) {
    return async (dispatch) => {
        const response = await fetch("/api/auth/");
        const parsed = await response.json();
        if (!parsed.errors) dispatch(sessionAdd(parsed));
        return response;
    }
}

export function signupUser(user) {
    return async (dispatch) => {
        const {firstName, lastName, role, email, password} = user;
        console.log(user);
        const response = await fetch("/api/auth/signup/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, role, email, password})
        });
        const parsed = await response.json();
        console.log(parsed);
        dispatch(sessionAdd(parsed));
        return parsed;
    }
}

export const logout = (user) => async (dispatch) => {
    const response = fetch("/api/auth/logout/", {
        method: "DELETE"
    });
    dispatch(sessionRemove());
    return response;
}

const sessionReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case SESSION_ADD:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState
        case SESSION_REMOVE:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
