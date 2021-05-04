import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

export default function SignupForm() {

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

    // if (sessionUser) return <Redirect to="/" />;

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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <div>
                I'm signing up as a:
                <input onClick={()=> setRole("Mentor")} type="radio" name="mentor"/> Mentor
                <input onClick={()=> setRole("Mentee")} type="radio" name="mentee"/> Mentee
            </div>
            <div>
                <input
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
               <input
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
               <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit">Join!</button>
            </div>
        </form>
    );
}
