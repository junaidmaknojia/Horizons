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
        // client ID: 78r408eh9x5ip8
        // client secret: ------
        const response = await fetch("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri={your_callback_url}&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social")
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
