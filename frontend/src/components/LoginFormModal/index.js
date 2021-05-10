import React, { useState } from "react";
import "./LoginForm.css";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";

export default function LoginFormModal() {

    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    async function linkedInSignIn(){
        //handle sign in with linkedin here

        // https://horizon-aa.herokuapp.com/
        // encoded redirect url: text=https%3A%2F%2Fhorizon-aa.herokuapp.com%2F
        // client ID: ----------
        // client secret: ------
        // GET https://www.linkedin.com/oauth/v2/authorization
        window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=http://localhost:3000/linkedInAuth&state=foobar&scope=r_liteprofile%20r_emailaddress", "", "width=600, height=600");
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm/>
                    <div>
                        <p onClick={linkedInSignIn}>Sign in with LinkedIn</p>
                    </div>
                </Modal>
            )}
        </>
    );
}
