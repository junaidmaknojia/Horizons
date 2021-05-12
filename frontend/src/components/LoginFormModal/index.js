import React, { useRef, useState, useEffect } from "react";
import "./LoginForm.css";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";

export default function LoginFormModal() {

    const windowRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.onmessage = function afterSignup(message){
            windowRef.current.close();
            return () => {window.onmessage = null};
        }
    }, [linkedInSignIn]);

    async function linkedInSignIn(){
        window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=http://localhost:3000/linkedin-log-in&state=foobar&scope=r_liteprofile%20r_emailaddress", "", "width=600, height=600");
    }
    async function googleSignIn(){
        // change client id and redirect uri
        // window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=http://localhost:3000/linkedInAuth&state=foobar&scope=r_liteprofile%20r_emailaddress", "", "width=600, height=600");
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm/>
                    <div>
                        <img src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
                            onClick={linkedInSignIn}
                            style={{width:100, height:"auto"}}/>
                    </div>
                    <div>
                        <img src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
                            onClick={googleSignIn}
                            style={{width:100, height:"auto"}}/>
                    </div>
                </Modal>
            )}
        </>
    );
}
