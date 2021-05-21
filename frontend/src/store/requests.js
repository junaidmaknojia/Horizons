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
    dispatch(storeRequests(data.requests));
}

export const makeRequest = async (payload) => {
    const response = await fetch("/api/requests/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }
}

export const updateRequest = async (requestId) => {
    const response = await fetch("/api/requests/update/", {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({requestId})
    });
    getRequests();
}

export const deleteRequest = async (requestId) => {
    const response = await fetch("/api/requests/delete", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({requestId})
    });
    const data = await response.json();
    console.log(data);
    getRequests();
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
