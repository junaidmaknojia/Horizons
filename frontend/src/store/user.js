const initialState = {user: null};

const USER_ROLE = "user/role";

export const signUpRole = (role) => {{
    return {
        type: USER_ROLE,
        role
    }
}}

export const allUsers = async () => {
    const response = await fetch("/api/users/all");
    const data = await response.json();
}

export const updateUser = async (user) => {
    const response = await fetch("/api/users/update/", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }
}

export const getMentors = async () => {
    const response = await fetch("/api/users/mentors/");
    const data = await response.json();
    return data.mentors;
}

export default function userReducer(state=initialState, action){
    let newState = {};
    switch(action.type){
        case USER_ROLE:
            newState = Object.assign({}, state);
            newState.role = action.role;
            return newState
        // case SESSION_REMOVE:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}
