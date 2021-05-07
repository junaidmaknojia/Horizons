const SESSION_ADD = "session/setUser"
const SESSION_REMOVE = "session/removeUser"

const initialState = {user: null};

const sessionAdd = (user) => {{
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
        console.log(data);
        dispatch(sessionAdd(data.user));
        return response;
    }
}

export function restoreUser(user) {
    return async (dispatch) => {
        const response = await fetch("/api/auth/");
        const parsed = await response.json();
        dispatch(sessionAdd(parsed.user));
        return response;
    }
}

export function signupUser(user) {
    return async (dispatch) => {
        const {firstName, lastName, role, email, password} = user;
        const title = role;
        const response = await fetch("api/users/", {
            method: "POST",
            body: JSON.stringify({firstName, lastName, role, title, email, password})
        });
        const parsed = response.json();
        dispatch(sessionAdd(parsed.user));
        return parsed;
    }
}

export const logout = (user) => async (dispatch) => {
    const response = fetch("/api/auth/", {
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
