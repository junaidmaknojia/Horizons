import React, { useRef, useState, useEffect } from "react";
import "./LoginForm.css";
import LoginForm from "./LoginForm";
import {Redirect, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sessionAdd } from "../../store/session";
import {Row} from "react-bootstrap";

export default function LoginFormModal({setShowLogin}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const windowRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.state);

    useEffect(() => {
        window.onmessage = function afterSignup(message){
            if(windowRef.current){
                windowRef.current.close();
                setShowModal(false);
                setShowLogin(false);
                dispatch(sessionAdd(message.data));
            }
        }
        return () => {window.onmessage = null};
    }, [linkedInSignIn, googleSignIn]);

    if(sessionUser){
        setShowModal(false);
        setShowLogin(false);
        return <Redirect to={`/${sessionUser.id}`}/>
    }

    async function linkedInSignIn(){
        windowRef.current = window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=${window.location.origin}/linkedin-log-in&state=foobar&scope=r_liteprofile%20r_emailaddress`, "", "width=600, height=600");
    }
    async function googleSignIn(){
        windowRef.current = window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile%20https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=code&redirect_uri=${window.location.origin}/google-log-in&client_id=551411017083-g03vd1t5b4328v4posf89r03datsj7jc.apps.googleusercontent.com`, "", "width=600, height=600");
    }

    return (
        <>
            <LoginForm setShowLogin={setShowLogin}/>
            <div className="otherAuths">
                <Row>
                <div>
                    <img src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
                        onClick={linkedInSignIn}
                        style={{width:150, height:"auto"}}/>
                </div>
                </Row>
                <Row>
                    <img src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
                        onClick={googleSignIn}
                        style={{width:150, height:"auto"}}/>
                </Row>
            </div>
        </>
    );
}
