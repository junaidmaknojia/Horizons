import { useSelector } from "react-redux";
import React from "react";
import "./Homepage.css";
import {Jumbotron, Button} from "react-bootstrap";

export default function Homepage({isLoaded}) {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="homepage">
            <Jumbotron>
                <video loop autoPlay className="video" src="https://horizons-aa.s3.us-east-2.amazonaws.com/video.mp4">
                    <div className="intro">
                        <h1>Find your horizon!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Get Started</Button>
                        </p>
                    </div>
                </video>
            </Jumbotron>
        </div>
    );
}
