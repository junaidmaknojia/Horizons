import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUser } from "../../store/user";
import UserProfile from "../UserProfile";
import "./EditProfile.css";


export default function EditProfile({tagOptions, industryOptions, titleOptions}){

    // ----------- Add later for more organization in selection ------
    // <select onChange={e => setIndustryTag(e.target.value)}>
    //     {industrySeeds.map(seed => (
    //         <option value={seed}>{seed}</option>
    //     ))}
    // </select>
    // <select onChange={e => setIndustry(e.target.value)}>
    //     {industryTags.map(tag => (
    //         <option value={tag}>{tag}</option>
    //     ))}
    // </select>

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState(sessionUser.firstName);
    const [lastName, setLastName] = useState(sessionUser.lastName);
    const [title, setTitle] = useState(sessionUser.title);
    const [bio, setBio] = useState(sessionUser.bio);
    const [industry, setIndustry] = useState(sessionUser.industry);
    const [tags, setTags] = useState(sessionUser.tags);
    const [city, setCity] = useState(sessionUser.city);
    const [state, setState] = useState(sessionUser.state);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
        //     setErrors([]);
        //     return dispatch(sessionActions.signupUser({ firstName, lastName, role, email, password }))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // }
        const formatTags = tags ? Object.values(tags).map(v => v.value) : [];
        const update = {sessionUser, firstName, lastName, title, bio, industry, formatTags, city, state};
        await dispatch(updateUser(update));
        return <Redirect to="user"/>
    };

    return (
        <div className="editProfile">
            <form onSubmit={handleSubmit}>
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
                    <textarea
                        placeholder="Write your bio here"
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                {(sessionUser.role === "Mentee") && (
                    <div>
                        <input
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                )}
                {(sessionUser.role === "Mentor") && (
                    <>
                        <div>
                            <p>{`Current Title: ${sessionUser.title}`}</p>
                            <select onChange={e => setTitle(e.target.value)}>
                                {titleOptions.map(tO => (
                                    <option value={tO}>{tO}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>{`Current Industry: ${sessionUser.industry}`}</p>
                            <select onChange={e => setIndustry(e.target.value)}>
                                {industryOptions.map(tag => (
                                    <option value={tag}>{tag}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <p>{`Current Tags: ${sessionUser.tags}`}</p>
                            <select onChange={e => setTags(e.target.selectedOptions)} multiple>
                                {tagOptions.map(tag => (
                                    <option value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <div>
                    <input
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                </div>
                <div>
                    <input
                        placeholder="State"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}
