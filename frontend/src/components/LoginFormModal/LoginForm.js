import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";
import {Form, Button, Toast} from "react-bootstrap";


export default function LoginForm({setShowLogin}) {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [errorToast, setErrorToast] = useState(false);

    // if (sessionUser) {
    //     return <Redirect to="/"/>
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ email, password }))
            .then((res) => {
                setErrors([]);
                setShowLogin(false);
            })
            .catch(async (res) => {
                setErrors(res.errors);
                setErrorToast(true);
            });
    }

    return (
        <>
            <Toast className="toast" onClose={() => setErrorToast(false)} show={errorToast} delay={4000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Uh oh!</strong>
                </Toast.Header>
                <Toast.Body>{errors}</Toast.Body>
            </Toast>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control placeholder="Email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control placeholder="Password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Log In</Button>
            </Form>
        </>
    );
}
