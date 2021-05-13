import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default function Navigation({ isLoaded }) {

    const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    function openMenu() {
        if (!showMenu) setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        // <div className="navBar">
        //     <p className="siteLogo">Horizons</p>
        //     <NavLink className="navButton" id="home" exact to="/">Home</NavLink>
        //     {isLoaded && sessionLinks}
        // </div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Horizons</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setShowSignUp(true)}>Get Started
                {showSignUp && (
                    <Modal onClose={() => setShowSignUp(false)}>
                        <SignupForm/>
                    </Modal>
                )}
            </Nav.Link>
            <Nav.Link href="#pricing">{isLoaded && sessionLinks}</Nav.Link>

            {sessionUser && (
                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">S</NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action/3.4"></NavDropdown.Item> */}
                </NavDropdown>
            )}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}
