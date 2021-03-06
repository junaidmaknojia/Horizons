import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUser } from "../../store/user";
import "./EditProfile.css";
import {Form, Button, Row, Col, Spinner, Toast} from "react-bootstrap";

export default function EditProfile(){

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [tagCategory, setTagCategory] = useState([]);
    const [roleCategory, setRoleCategory] = useState([]);

    const [industryOptions, setIndustryOptions] = useState([]);
    // const [tagCategories, setTagCategories] = useState([]);
    // const [roleCategories, setRoleCategories] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [industry, setIndustry] = useState("");
    const [tags, setTags] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [backendErrors, setBackendErrors] = useState([]);
    const [errorToast, setErrorToast] = useState(false);

    useEffect(() => {
        setFirstName(sessionUser?.firstName);
        setLastName(sessionUser?.lastName);
        setTitle(sessionUser?.title);
        setBio(sessionUser?.bio);
        setLinkedIn(sessionUser?.linkedIn);
        setIndustry(sessionUser?.industry);
        setTags(sessionUser?.tags);
        setCity(sessionUser?.city);
        setState(sessionUser?.state);
    }, [sessionUser]);

    useEffect(() => {
        let errors = [];
        if(!firstName) errors.push("You must provide a first name");
        if(!lastName) errors.push("You must provide a last name");
        if(!title) errors.push("Please provide a relevant title");
        if(Array.from(tags).length > 5) errors.push("Please limit your tags to 5 options");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        if(validationErrors.length === 0){
            const tagsArr = Array.from(tags);
            const formatTags = tagsArr?.map(t => Number(t.value));
            const update = {firstName, lastName, "title": Number(title), linkedIn, bio, "industry": Number(industry), formatTags, city, state};
            const returninfo = updateUser(update);

            if(image){
                uploadImage();
            }
            if((backendErrors.length === 0)){
                setTimeout(()=> {window.alert("Your profile is updated! Give it a minute for the changes to take place")}, 2000);
                setImageLoading(false);
                history.push(`/${sessionUser.id}`);
            }
            // .catch(err => {
            //     setBackendErrors(err.errors);
            // });
        }
    };

    async function uploadImage(){
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/users/image/', {
            method: "PATCH",
            body: formData,
        });
        if (!res.ok) {
            const data = await res.json();
            setBackendErrors(data.errors);
        }
    }

    if(!sessionUser){
        return <Redirect to="/"/>
    }

    return (
        <div className="editProfile">
            {validationErrors?.map(error => (
                <p style={{color: "red"}}>{error}</p>
            ))}
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
                <Form.Group>
                    <Form.Label className="label">Choose Profile Photo</Form.Label>
                    <Form.File id="exampleFormControlFile1" className="fileInput" type="file" accept="image/*"
                        onChange={e => setImage(e.target.files[0])}/>
                    <p className="disclaimer">Only image files allowed, upload only 1</p>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="url" placeholder="LinkedIn URL" pattern="https://.*"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}/>
                    <p className="disclaimer">Must be in the form https://</p>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} placeholder="Write your bio here"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}/>
                </Form.Group>

                {(sessionUser.role === "Mentee") && (
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Title" value={title}
                            onChange={(e) => setTitle(e.target.value)} required/>
                    </Form.Group>
                )}
                {(sessionUser.role === "Mentor") && (
                    <>
                        {/* <select value={roleCategory} onChange={e => {
                            console.log(e.target);
                            setRoleCategory(e.target.value.roles)}}>
                            {roleCategories?.map(opt => (
                                <option value={opt} id={opt.id}>{opt.name}</option>
                            ))}
                        </select> */}
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label className="label">{`Current Title: ${sessionUser.title}`}</Form.Label>
                            <Form.Control as="select" onChange={e => setTitle(e.target.value)}>
                                {roleCategory?.map(tO => (
                                    <option value={tO.id}>{tO.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label className="label">{`Current Industry: ${sessionUser.industry}`}</Form.Label>
                            <Form.Control as="select" onChange={e => setIndustry(e.target.value)}>
                                {industryOptions?.map(indus => (
                                    <option value={indus.id}>{indus.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label className="label">{`Current Tags: ${sessionUser.tags?.join(", ")}`}</Form.Label>
                            <Form.Control as="select" onChange={e => setTags(e.target.selectedOptions)} multiple>
                                {tagCategory?.map(tag => (
                                    <option value={tag.id}>{tag.name}</option>
                                ))}
                            </Form.Control>
                            <p className="disclaimer">Choose multiple tags (ctrl + click), up to 5</p>
                        </Form.Group>
                        {/* <select onChange={e => setTagCategory(e.target.value)} multiple>
                            {tagCategories?.map(tag => (
                                <option value={tag.name}>{tag.name}</option>
                            ))}
                        </select> */}
                    </>
                )}
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control placeholder="City" type="text" value={city}
                                onChange={(e) => setCity(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control placeholder="State" type="text" value={state}
                                onChange={(e) => setState(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    {imageLoading && (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}Update
                </Button>
                <Toast className="errortoast" onClose={() => setErrorToast(false)} show={errorToast} delay={4000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Uh oh!</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {backendErrors?.map(err => <p>{err}</p>)}
                    </Toast.Body>
                </Toast>
            </Form>
        </div>
    )
}
