import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getRequests, updateRequest, deleteRequest } from "../../store/requests";
import {Accordion, Card, Alert} from "react-bootstrap";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import "./UserDashboard.css";

export default function UserDashboard() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myRequests = useSelector(state => state.requests.requests);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    let warnings = [];

    useEffect(() => {
        async function loadRequests() {
            await dispatch(getRequests());
            // setAcceptedRequests(myRequests?.filter(request => request.accepted));
            // setPendingRequests(myRequests?.filter(request => !request.accepted));

            // need to edit render to not chain filter to map for splitting accepted/pending requests
        }
        loadRequests();
        // refactor to change the requests map in the JSX
        // so there's one section for both mentors and mentees
        // and changes the requests.mentors or requests.mentees
        // to requests[otherPerson] and otherPerson is a conditional
        // set above near the selectors
    }, [dispatch]);

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    if (sessionUser.role === "Mentor") {
        const numTags = sessionUser.tags ? sessionUser.tags.length : 0;
        if (!sessionUser.tags || numTags < 5) warnings.push(`${5 - numTags} more tag${5 - numTags === 1 ? "" : "s"}`);
        if (!sessionUser.industry) warnings.push("Industry");
        if(!sessionUser.title) warnings.push("Title");
    }

    async function handleDelete(person, request) {
        const message = person === "mentee" ? `Confirm cancel your request to ${request.mentor.firstName} ${request.mentor.lastName}?` :
            `Confirm rejecting the request from ${request.mentee.firstName} ${request.mentee.lastName}?`
        if (window.confirm(message)) {
            deleteRequest(request.id);
        }
    }

    async function handleAccept(request) {
        updateRequest(request.id);
    }

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionToggle(eventKey, () => {});
        return (
            <button
                type="button"
                style={{ backgroundColor: 'orange' }}
                onClick={decoratedOnClick}>{children}
            </button>
        );
    }

    function showPitch(request) {
        return (
            <Accordion defaultActiveKey="1">
                <Card>
                    <CustomToggle eventKey="0">Pitch</CustomToggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{request.pitch}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }


    return (
        <div className="userDashboard">
            <div className="userDashboard__card">
                <img src={sessionUser.profilePhoto} style={{ width: 300, height: 300 }} />
                <h4>{`${sessionUser.firstName} ${sessionUser.lastName}`}
                    {sessionUser.linkedIn && (<a href={sessionUser.linkedIn} target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin" style={{margin: 5}}></i></a>)}
                </h4>
                <h6>{sessionUser.role}</h6>
                <h6>{sessionUser.title}</h6>
                <h6>{sessionUser.industry}</h6>
                {(sessionUser.city && sessionUser.state) && (
                    <p><i class="fas fa-globe-americas" style={{margin: 5}}></i>{`${sessionUser.city}, ${sessionUser.state}`}</p>
                )}
                <p style={{width: "20vw"}}>{sessionUser.bio}</p>
                <div className="tagContainer">
                    {sessionUser.tags.map(tag => (
                        <div className="tag">{tag}</div>
                    ))}
                </div>
            </div>
            <div className="requestsContainer">
                {warnings.length > 0 && (
                    <Alert variant="warning">
                        <h3>Please go into your profile settings and add the following:</h3>
                        <ul>
                            {warnings.map(warning => (<li>{warning}</li>))}
                        </ul>
                    </Alert>
                )}
                <h2>Your Requests</h2>
                <div className="requests">
                    {sessionUser.role === "Mentor" && (
                        <>
                            <div className="requests__pendingRequests">
                                <h4>Pending Requests</h4>
                                {myRequests?.filter(request => !request.accepted).map(request => (
                                    <div className="request">
                                        <img src={request.mentee.profilePhoto} style={{ width: 100, height: 100 }} />
                                        <h5>{`${request.mentee.firstName} ${request.mentee.lastName}`}</h5>
                                        {showPitch(request)}
                                        <div className="delete button" onClick={() => { handleDelete("mentor", request) }}>Reject</div>
                                        <div className="accept button" onClick={() => { handleAccept(request) }}>Accept</div>
                                    </div>
                                ))}
                            </div>
                            <div className="requests__acceptedRequests">
                                <h4>Accepted Requests</h4>
                                {myRequests?.filter(request => request.accepted).map(request => (
                                    <div className="request">
                                        <img src={request.mentee.profilePhoto} style={{ width: 100, height: 100 }} />
                                        <h5>{`${request.mentee.firstName} ${request.mentee.lastName}`}</h5>
                                        {showPitch(request)}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {sessionUser.role === "Mentee" && (
                        <>
                            <div className="requests__acceptedRequests">
                                <h4>Accepted Requests</h4>
                                {myRequests?.filter(request => request.accepted).map(request => (
                                    <div className="request">
                                        <img src={request.mentor.profilePhoto} style={{ width: 100, height: 100 }} />
                                        <h5>{`${request.mentor.firstName} ${request.mentor.lastName}`}</h5>
                                        <p>{request.mentor.email}</p>
                                        {showPitch(request)}
                                    </div>
                                ))}
                            </div>
                            <div className="requests__pendingRequests">
                                <h4>Pending Requests</h4>
                                {myRequests?.filter(request => !request.accepted).map(request => (
                                    <div className="request">
                                        <img src={request.mentor.profilePhoto} style={{ width: 100, height: 100 }} />
                                        <h5>{`${request.mentor.firstName} ${request.mentor.lastName}`}</h5>
                                        {showPitch(request)}
                                        <div className="delete button" onClick={() => { handleDelete("mentee", request) }}>Cancel</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
