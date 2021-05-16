import { useSelector } from "react-redux";
import React from "react";
import "./Homepage.css";
import {Jumbotron, Button} from "react-bootstrap";

export default function Homepage({isLoaded}) {

    const sessionUser = useSelector(state => state.session.user);

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
                    <p>
                        <Button variant="primary">Get Started</Button>
                    </p>
                </div>
            </div>
        </div>
    );
}
