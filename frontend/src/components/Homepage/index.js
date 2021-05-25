import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import "./Homepage.css";
import {Jumbotron, Button, Modal} from "react-bootstrap";
import SignupForm from "../SignupForm";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../store/session";
import {getRequests} from "../../store/requests";

export default function Homepage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    async function demoPerson(type){
        const email = (type === "Mentor") ? "demomentor@horizon.com" : "demouser@horizon.com";
        dispatch(sessionActions.login({ email, "password":"password" }))
            .catch(async (res) => {
                const data = await res.json();
            });
        dispatch(getRequests());
    }

    return (
        <div className="homepage">
            <div className="intro">
                <video loop autoPlay className="video" src="https://horizons-aa.s3.us-east-2.amazonaws.com/video.mp4"/>
                <div className="intro__text">
                    <h1>Find your horizon!</h1>
                    <p>
                        Join Horizons, where young professionals can be connected to mentors in various industries and found
                        through the specific type of mentorship needed. Create your profile with a custom login or through
                        LinkedIn and get started!
                    </p>
                    {!sessionUser && (
                        <>
                            <p>
                                <Button variant="primary" className="button" onClick={() => setShowSignUp(true)}>Get Started</Button>
                                <Button variant="primary" className="button" onClick={() => setShowLogin(true)}>Log In</Button>
                                <Button variant="secondary" className="button" onClick={() => demoPerson("Mentor")}>Demo as Mentor</Button>
                                <Button variant="secondary" className="button" onClick={() => demoPerson("Mentee")}>Demo as Mentee</Button>
                            </p>
                            <p>
                            </p>
                        </>
                    )}
                </div>
                <Modal show={showSignUp} onHide={() => { setShowSignUp(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SignupForm />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginFormModal setShowLogin={setShowLogin}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="getApp">
                <img src="https://horizons-aa.s3.us-east-2.amazonaws.com/stock/stock2.jpg" className="tablePhoto"/>
                <div className="appContent">
                    <img src="https://ifamcare.com/wp-content/uploads/2015/12/app-logos.png" className="appLogos"/>
                    <div className="appText">Stay tuned for the mobile app in development! Sign up for notifications through your profile
                        settings and we'll notify you when there are major updates to your experience including mobile
                        app improvements.
                    </div>
                </div>
            </div>
        </div>
    );
}
