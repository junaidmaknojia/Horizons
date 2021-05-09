const initialState = {user: null};

// const sessionAdd = (user) => {{
//     return {
//         type: SESSION_ADD,
//         payload: user
//     }
// }}

export const allUsers = async () => {
    const response = await fetch("api/users/all");
    const data = await response.json();
}

export const updateUser = (user) => async (dispatch) => {
    const response = await fetch("/api/users/update/", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
}

export const getMentors = async () => {
    const response = await fetch("api/users/mentors")
    const data = await response.json()
    return data.mentors;
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
