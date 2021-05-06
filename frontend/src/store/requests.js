import { csrfFetch } from "./csrf";

const STOREREQUESTS = "request/storeRequests"

const initialState = {requests: null};

const storeRequests = (requests) => {{
    return {
        type: STOREREQUESTS,
        requests
    }
}}

export const getRequests = () => async (dispatch) => {
    const response = await csrfFetch("api/requests/");
    const data = await response.json();
    dispatch(storeRequests(data));
}

export const makeRequest = (payload) => async (dispatch) => {
    const response = await csrfFetch("api/requests/", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export const updateRequest = async (requestId) => {
    const response = await csrfFetch("api/requests/update", {
        method: "PATCH",
        body: JSON.stringify({requestId})
    });
}

export const deleteRequest = async (requestId) => {
    const response = await csrfFetch("api/requests/delete", {
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
