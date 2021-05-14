import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { Modal } from "react-bootstrap";
import SignupForm from "../SignupForm";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from '../../store/session';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Navigation({ isLoaded }) {

    const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();
    const dispatch = useDispatch();
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Horizons</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {sessionUser === null && (
                        <>
                            <Modal show={showSignUp} onHide={() => { setShowSignUp(false) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Sign Up</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SignupForm />
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            <Nav.Link onClick={() => setShowSignUp(true)}>Get Started</Nav.Link>
                            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Log In</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <LoginFormModal />
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            <Nav.Link onClick={() => setShowLogin(true)}>Log In</Nav.Link>
                        </>
                    )}
                </Nav>
                {sessionUser && (
                    <>
                        <Nav>
                            <img src={sessionUser.profilePhoto} style={{ width: 50, height: 50, borderRadius:25}} />
                        </Nav>
                        <Nav.Link href={`/${sessionUser.id}`}>{`${sessionUser.firstName} ${sessionUser.lastName}`}</Nav.Link>
                        <NavDropdown title="Profile" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
