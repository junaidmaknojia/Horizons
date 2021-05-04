import { csrfFetch } from "./csrf";

// const SESSION_REMOVE = "session/removeUser"

const initialState = {user: null};

// const sessionAdd = (user) => {{
//     return {
//         type: SESSION_ADD,
//         payload: user
//     }
// }}

export const allUsers = async () => {
    const response = await csrfFetch("api/users/all");
    const data = await response.json();
}

export const updateUser = (user) => async (dispatch) => {
    const response = await csrfFetch("api/users/update", {
        method: "POST",
        body: JSON.stringify(user)
    });
}

export default function userReducer(state=initialState, action){
    let newState = {};
    switch(action.type){
        // case SESSION_ADD:
        //     newState = Object.assign({}, state);
        //     newState.user = action.payload;
        //     return newState
        // case SESSION_REMOVE:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}
