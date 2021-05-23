import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import * as sessionActions from "../../store/session";
import { Form, Row, Col, Button, InputGroup, Toast } from "react-bootstrap";
import './SignupForm.css';

export default function SignupForm() {

    const windowRef = useRef(null);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [backendErrors, setBackendErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [errorToast, setErrorToast] = useState(false);

    useEffect(() => {
        const errors = [];
        if(!firstName) errors.push("First name required")
        if(!lastName) errors.push("Last name required")
        if(!email) {
            errors.push("Email is required")
        }
        else {
            if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) errors.push("Valid email required")
        }
        setValidationErrors(errors);
    }, [firstName, lastName, email]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setValidationErrors([]);
            return dispatch(sessionActions.signupUser({ firstName, lastName, role, email, password }))
                .catch(async (res) => {
                    console.log(res);
                    // const data = await res.json();
                    if (res && res.errors){
                        setBackendErrors(res.errors);
                        setErrorToast(true);
                    }
                });
        }
        return setValidationErrors(['Password and confirmed password must match']);
    };

    useEffect(() => {
        window.onmessage = function afterSignup(message) {
            const { firstName, lastName, email, profilePhoto } = message.data;
            const password = require("crypto").randomBytes(32).toString("hex");
            dispatch(sessionActions.linkedInSignUp({ firstName, lastName, email, profilePhoto, password, role }))
                .then(() => {
                    windowRef.current.close()
                })
                .catch((err) => {
                    setBackendErrors(err.errors);
                    setErrorToast(true);
                });
        };
        return () => { window.onmessage = null }
    }, [role, linkedInSignUp, googleSignUp]);

    if (sessionUser) {
        return <Redirect to={`/${sessionUser.id}`} />
    }

    async function linkedInSignUp() {
        windowRef.current = window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=${window.location.origin}/linkedin-sign-up&state=foobar&scope=r_liteprofile%20r_emailaddress`, "", "width=600, height=600");
    }

    async function googleSignUp() {
        // change client id and redirect uri
        windowRef.current = window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=https://localhost:3000&client_id=551411017083-b2r9v74onf79r57kc28ephnvgq0anhrk.apps.googleusercontent.com`, "", "width=600, height=600");
    }

    return (
        <>
            <InputGroup>
                <p>I'm signing up as a:</p>
                <InputGroup.Prepend>
                    <InputGroup.Radio id="mentor" name="role" onClick={() => setRole("Mentor")} value="Mentor" />Mentor
                    <InputGroup.Radio id="mentee" name="role" onClick={() => setRole("Mentee")} value="Mentee" />Mentee
                </InputGroup.Prepend>
            </InputGroup>
            {role && (
                <>
                    {validationErrors && (
                        <div>
                            {validationErrors.map(err => (
                                <li style={{color: "red"}}>{err}</li>
                            ))}
                        </div>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="First Name" value={firstName}
                                        onChange={e => setFirstName(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Last Name" value={lastName}
                                        onChange={e => setLastName(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control placeholder="Email" type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control placeholder="Password" type="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control placeholder="Confirm Password" type="password" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">Sign Up!</Button>
                    </Form>
                    <div className="otherAuths">
                        <Row>
                            <img src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
                                onClick={linkedInSignUp}
                                style={{ width: 150, height: "auto" }} />
                        </Row>
                        <Row>
                            <img src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
                                onClick={googleSignUp}
                                style={{ width: 150, height: "auto" }} />
                        </Row>
                    </div>
                    <Toast onClose={() => setErrorToast(false)} show={errorToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Uh oh!</strong>
                        </Toast.Header>
                        <Toast.Body>{backendErrors}</Toast.Body>
                    </Toast>
                </>
            )}
        </>
    );
}
