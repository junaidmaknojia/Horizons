import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getRequests, makeRequest } from "../../store/requests";
import {Card, Modal, Button, Form, Toast} from "react-bootstrap";
import "./BrowseMentors.css";


export default function BrowseMentors() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myRequests = useSelector(state => state.requests.requests);
    const [addedTags, setAddedTags] = useState([]);
    const [listMentors, setListMentors] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [requestMentor, setRequestMentor] = useState({});
    const [showPitchModal, setShowPitchModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [pitch, setPitch] = useState("");

    useEffect(() => {
        async function loadMentors(){
            const response = await fetch("/api/users/mentors/");
            const data = await response.json();
            setListMentors(data.mentors);
            const tags = await fetch("/api/searches/tags/");
            const tagOptions0 = await tags.json();
            setTagOptions(tagOptions0.tags);
        }
        loadMentors();
        loadRequests();
    }, [dispatch]);

    useEffect(() => {
        const temp = [...addedTags.map(tag => tag.users)].flat();
        const tempObj = {}
        temp.forEach(user => {
            tempObj[user.id] = user;
        });
        const setter = Object.values(tempObj);
        setListMentors(setter);
    }, [addedTags]);

    async function loadRequests(){
        dispatch(getRequests());
    }

    function updateTags(action, tag){
        switch(action){
            case "remove":
                const temp = [...addedTags].filter(tg => tg !== tag);
                setAddedTags(temp);
            case "add":
                if(!addedTags.includes(tag)){
                    setAddedTags([...addedTags, tag]);
                }
        }
    }

    async function handleRequest(){
        const pckg = {mentorId: requestMentor.id, menteeId: sessionUser.id, accepted: false, pitch};
        const data = await makeRequest(pckg);
        if(data){
            setShowPitchModal(false);
            setPitch("");
            setShowToast(true);
            loadRequests();
        }

    }

    function pitchEnter(mentor){
        setRequestMentor(mentor);
        setShowPitchModal(true);
    }

    function existingRequest(mentor){
        return myRequests?.some(req => req.mentor.id === mentor.id);
    }

    if(!sessionUser){
        return <Redirect to="/"/>
    }

    return (
        <div className="browseMentors">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={8000} autohide className="toast">
                <Toast.Header>
                    <strong className="mr-auto">Request Sent!</strong>
                </Toast.Header>
                <Toast.Body>Your request is sent! Your mentor will get an email notifying them of your request. You can cancel
                    your request from your dashboard. Keep connecting!
                </Toast.Body>
            </Toast>
            <h1>Find Mentors</h1>
            <p>Click the yellow tags to filter mentors. To remove a tag, click the blue tag</p>
            <div className="addedTags">
                {addedTags?.map(tag => (
                    <div onClick={() => updateTags("remove", tag)} className="addedTags__tag">{tag.name}</div>
                    ))}
            </div>
            <div className="listTags">
                {tagOptions?.map(tag => (
                    <div onClick={() => updateTags("add", tag)} className="listTags__tag">{tag.name}</div>
                ))}
            </div>
            <div className="listMentors">
                    {listMentors?.map(mentor => (
                        <>
                            <Card className="card">
                                <Card.Img variant="top" src={mentor.profilePhoto} />
                                <Card.Body>
                                    <Card.Title><Link to={`/${mentor.id}`}>{`${mentor.firstName} ${mentor.lastName}`}</Link></Card.Title>
                                    <Card.Text>{mentor.title}</Card.Text>
                                    <Card.Text>{mentor.industry}</Card.Text>
                                </Card.Body>
                                {(sessionUser?.role === "Mentee") && (
                                    <Card.Footer>
                                        <Button onClick={() => pitchEnter(mentor)} disabled={existingRequest(mentor)}>Request</Button>
                                    </Card.Footer>
                                )}
                            </Card>
                            <Modal show={showPitchModal} onHide={() => { setShowPitchModal(false) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{`Pitch to ${requestMentor.firstName} ${requestMentor.lastName}`}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Enter your request pitch to the mentor. Mentors are more likely to accept a request
                                        with a pitch than one without. Please limit your pitch to 80 characters.
                                    </p>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} placeholder="I need some guidance on ..."
                                            value={pitch}
                                            onChange={(e) => setPitch(e.target.value)}
                                            maxLength="80"
                                        />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleRequest}>Submit</Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    ))}
            </div>
        </div>
    )
}
