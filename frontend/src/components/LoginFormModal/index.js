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
