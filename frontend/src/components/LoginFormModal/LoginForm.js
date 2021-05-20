import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";
import {Form, Button} from "react-bootstrap";


export default function LoginForm({setShowLogin}) {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if (sessionUser) {
    //     return <Redirect to="/"/>
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setShowLogin(false);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
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
    );
}
