const STOREREQUESTS = "request/storeRequests"

const initialState = {requests: null};

const storeRequests = (requests) => {{
    return {
        type: STOREREQUESTS,
        requests
    }
}}

export const getRequests = () => async (dispatch) => {
    const response = await fetch("/api/requests/");
    const data = await response.json();
    dispatch(storeRequests(data));
}

export const makeRequest = (payload) => async (dispatch) => {
    const response = await fetch("/api/requests/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    return
}

export const updateRequest = async (requestId) => {
    const response = await fetch("/api/requests/update", {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({requestId})
    });
}

export const deleteRequest = async (requestId) => {
    const response = await fetch("api/requests/delete", {
        method: "DELETE",
        body: JSON.stringify({requestId})
    });
}

export default function requestReducer(state=initialState, action){
    let newState = {};
    switch(action.type){
        case STOREREQUESTS:
            newState = Object.assign({}, state);
            newState.requests = action.requests;
            return newState;
        // case SESSION_REMOVE:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}
