import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getRequests } from "../../store/requests";
import "./UserDashboard.css";

export default function UserDashboard() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myRequests = useSelector(state => state.requests.requests);
    const acceptedRequests = myRequests?.filter(request => request.accepted);
    const pendingRequests = myRequests?.filter(request => !request.accepted);
    let warnings = [];

    useEffect(() => {
        dispatch(getRequests());
        // refactor to change the requests map in the JSX
        // so there's one section for both mentors and mentees
        // and changes the requests.mentors or requests.mentees
        // to requests[otherPerson] and otherPerson is a conditional
        // set above near the selectors
    }, [dispatch]);

    if(!sessionUser){
        return <Redirect to="/"/>
    }

    if (sessionUser.role === "Mentor") {
        const numTags = sessionUser.tags ? sessionUser.tags.length : 0;
        if (!sessionUser.tags || numTags < 5) warnings.push(`${5 - numTags} more tag${5 - numTags === 1 ? "" : "s"}`);
        if (!sessionUser.industry) warnings.push("Industry");
    }

    async function handleCancel(request){
        if(window.confirm(`Confirm cancel your request to ${request.mentor.firstName} ${request.mentor.lastName}?`)){
            await dispatch(deleteRequest(request.id));
            dispatch(getRequests);
        }
    }

    async function handleReject(request){
        if(window.confirm(`Confirm reject request from ${request.mentee.firstName} ${request.mentee.lastName}?`)){
            await dispatch(updateRequest(request.id));
            dispatch(getRequests);
        }
    }


    return (
        <div className="userProfile">
            {warnings.length>0 && (
                <div className="userProfile__warnings">
                    <h2>Please go into your profile settings and add the following:</h2>
                    <ul>
                        {warnings.map(warning => (<li>{warning}</li>))}
                    </ul>
                </div>
            )}
            <div className="userProfile__card">
                <img src={sessionUser.profilePhoto} style={{width: 300, height: 300}}/>
                <div>{sessionUser.role}</div>
                <div>{sessionUser.title}</div>
                <div>
                    {sessionUser.tags.map(tag => (
                        <div>{tag}</div>
                    ))}
                </div>
            </div>
            <div className="requests">
                <h2>Your Requests</h2>
                {sessionUser.role === "Mentee" && (
                    <>
                        <div>
                            {acceptedRequests?.map(request => (
                                <div>
                                    <img src={request.mentor.profilePhoto} style={{width: 100, height: 100}}/>
                                    <h3>{`${request.mentor.firstName} ${request.mentor.lastName}`}</h3>
                                    <p>{request.mentor.email}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            {pendingRequests?.map(request => (
                                <div>
                                    <img src={request.mentor.profilePhoto} style={{width: 100, height: 100}}/>
                                    <h3>{`${request.mentor.firstName} ${request.mentor.lastName}`}</h3>
                                    <div onClick={() => {handleCancel(request)}}>Cancel</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {sessionUser.role === "Mentor" && (
                    <>
                        {myRequests?.map(request => (
                            <div>
                                <img src={request.mentee.profilePhoto} style={{width: 100, height: 100}}/>
                                <h3>{`${request.mentee.firstName} ${request.mentee.lastName}`}</h3>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Link to="/edit">Edit Profile</Link>
        </div>
    );
}
