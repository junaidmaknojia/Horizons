import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import * as sessionActions from "../../store/session";
import {signUpRole} from "../../store/user";
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";
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
    const [errors, setErrors] = useState([]);
    // const [validationErrors, setValidationErrors] = useState([]);

    // useEffect(() => {
    //     const errors = [];
    //     if(!name) errors.push("Name must be present")
    //     if(!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) errors.push("Email should be properly formatted")
    //     if(!phoneNumber.value.match(/^\d{10}$/)) errors.push("Phone number should be properly formatted in ##########")
    //     if(bio.length > 280) errors.push("Bio should have a character limit of 280 characters")
    //     // if(!student.selected && !instructor.selected) errors.push("Make sure to select if you're an instructor or student")
    //     setValidationErrors(errors);
    // }, [name, email, phoneNumber, bio]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signupUser({ firstName, lastName, role, email, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Password and confirmed password must match']);
    };

    useEffect(() => {
        window.onmessage = function afterSignup(message){
            const { firstName, lastName, email, profilePhoto } = message.data;
            const password = require("crypto").randomBytes(32).toString("hex");
            dispatch(sessionActions.linkedInSignUp({firstName, lastName, email, profilePhoto, password, role}))
                .then(() => {
                    windowRef.current.close()
                })
                .catch((err) => {
                    console.error(err.errors);
                });
        };
        return () => {window.onmessage = null}
    }, [role, linkedInSignUp]);

    if(sessionUser){
        return <Redirect to={`/${sessionUser.id}`}/>
    }

    async function linkedInSignUp(){
        console.log(window.location);
        windowRef.current = window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=${window.location.origin}/linkedin-sign-up&state=foobar&scope=r_liteprofile%20r_emailaddress`, "", "width=600, height=600");
    }

    async function googleSignUp(){
        // change client id and redirect uri
        // window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78r408eh9x5ip8&redirect_uri=http://localhost:3000/linkedInAuth&state=foobar&scope=r_liteprofile%20r_emailaddress", "", "width=600, height=600");
    }

    return (
        <>
            {/* <div>
                <input type="radio" />Mentor<br/>
                <input type="radio" />Mentee<br/>
            </div> */}
            <InputGroup>
                <p>I'm signing up as a:</p>
                <InputGroup.Prepend>
                    <InputGroup.Radio id="mentor" name="role" onClick={()=> setRole("Mentor")} value="Mentor"/>Mentor
                    <InputGroup.Radio id="mentee" name="role" onClick={()=> setRole("Mentee")} value="Mentee"/>Mentee
                </InputGroup.Prepend>
            </InputGroup>
            {role && (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="First Name" value={firstName}
                                        onChange={e => setFirstName(e.target.value)} required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Last Name" value={lastName}
                                        onChange={e => setLastName(e.target.value)} required/>
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
                                required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">Sign Up!</Button>
                    </Form>
                    <div className="otherAuths">
                        <Row>
                            <img src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
                                onClick={linkedInSignUp}
                                style={{width:150, height:"auto"}}/>
                        </Row>
                        <Row>
                            <img src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
                                    onClick={googleSignUp}
                                    style={{width:150, height:"auto"}}/>
                        </Row>
                    </div>
                </>
            )}
        </>
    );
}
