import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUser } from "../../store/user";
import UserProfile from "../UserDashboard";
import "./EditProfile.css";

export default function EditProfile(){

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [tagCategory, setTagCategory] = useState([]);
    const [roleCategory, setRoleCategory] = useState([]);

    const [industryOptions, setIndustryOptions] = useState([]);
    const [tagCategories, setTagCategories] = useState([]);
    const [roleCategories, setRoleCategories] = useState([]);

    const [firstName, setFirstName] = useState(sessionUser.firstName);
    const [lastName, setLastName] = useState(sessionUser.lastName);
    const [title, setTitle] = useState(sessionUser.title);
    const [bio, setBio] = useState(sessionUser.bio);
    const [industry, setIndustry] = useState(sessionUser.industry);
    const [tags, setTags] = useState(sessionUser.tags);
    const [city, setCity] = useState(sessionUser.city);
    const [state, setState] = useState(sessionUser.state);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let errors = [];
        if(!firstName) errors.push("You must provide a first name");
        if(!lastName) errors.push("You must provide a last name");
        if(!title) errors.push("Please provide a relevant title");
        if(tags.length > 5) errors.push("Please limit your tags to 5 options");
        setValidationErrors(errors);
    }, [firstName, lastName, title, tags]);

    // useEffect(getOptions, []);
    useEffect(() => {
        async function getOptions(){
            const iResponse = await fetch("/api/searches/industries");
            let iO = await iResponse.json();
            setIndustryOptions(iO.industries);
            const tResponse= await fetch("/api/searches/tagCategories");
            let {tagCats} = await tResponse.json();
            const tTemp = tagCats.map(cat => cat.tags);
            setTagCategory(tTemp.flat());
            const rResponse = await fetch("/api/searches/roleCategories");
            let {roleCats} = await rResponse.json();
            const rTemp = roleCats.map(cat => cat.roles);
            setRoleCategory(rTemp.flat());
        }
        getOptions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inside handle submit");
        console.log(validationErrors);
        console.log("tags", tags ? tags.map(t => Number(t.value)) : []);
        if(!validationErrors){
            console.log(tags);
            // const formatTags = tags ? Object.values(tags).map(v => v.id) : [];
            // console.log(formatTags);
            // const update = {sessionUser, firstName, lastName, title, bio, industry, formatTags, city, state};
            // dispatch(updateUser(update));
            // return <Redirect to="/dashboard"/>
        }
    };

    return (
        <div className="editProfile">
            {validationErrors?.map(error => (
                <p>{error}</p>
            ))}
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
                            {/* <select value={roleCategory} onChange={e => {
                                console.log(e.target);
                                setRoleCategory(e.target.value.roles)}}>
                                {roleCategories?.map(opt => (
                                    <option value={opt} id={opt.id}>{opt.name}</option>
                                ))}
                            </select> */}
                            <select onChange={e => setTitle(e.target.value)}>
                                {roleCategory?.map(tO => (
                                    <option value={tO.id}>{tO.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>{`Current Industry: ${sessionUser.industry}`}</p>
                            <select onChange={e => setIndustry(e.target.value)}>
                                {industryOptions?.map(tag => (
                                    <option value={tag.id}>{tag.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>{`Current Tags: ${sessionUser.tags}`}</p>
                            {/* <select onChange={e => setTagCategory(e.target.value)} multiple>
                                {tagCategories?.map(tag => (
                                    <option value={tag.name}>{tag.name}</option>
                                ))}
                            </select> */}
                            <select onChange={e => setTags(e.target.selectedOptions)} multiple>
                                {tagCategory?.map(tag => (
                                    <option value={tag.id}>{tag.name}</option>
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
                <button type="submit">Update</button>
            </form>
        </div>
    )
}
