import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getRequests, makeRequest } from "../../store/requests";
import "./BrowseMentors.css";
import {Card} from "react-bootstrap";
import CardDeck from 'react-bootstrap/CardDeck';


export default function BrowseMentors() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [addedTags, setAddedTags] = useState([]);
    const [listMentors, setListMentors] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

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
    }, [dispatch]);

    useEffect(() => {
        const temp = [...addedTags.map(tag => tag.users)].flat();
        const tempObj = {}
        temp.forEach(user => {
            tempObj[user.id] = user;
        });
        setListMentors(Object.values(tempObj));
    }, [addedTags]);

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

    async function handleRequest(mentor){
        const pckg = {mentorId: mentor.id, menteeId: sessionUser.id, accepted: false, pitch: ""}
        dispatch(makeRequest(pckg));
        dispatch(getRequests());
    }

    if(!sessionUser){
        return <Redirect to="/"/>
    }

    return (
        <div className="browseMentors">
            <h1>Find Mentors</h1>
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
                <CardDeck>
                    {listMentors?.map(mentor => (
                        <Card>
                            <Card.Img variant="top" src={mentor.profilePhoto} />
                            <Card.Body>
                                <Card.Title><Link to={`/${mentor.id}`}>{`${mentor.firstName} ${mentor.lastName}`}</Link></Card.Title>
                                <Card.Text>{mentor.title}</Card.Text>
                                <Card.Text>{mentor.industry}</Card.Text>
                            </Card.Body>
                            {(sessionUser?.role === "Mentee") && (
                                <Card.Footer>
                                    <button onClick={() => handleRequest(mentor)}>Request</button>
                                </Card.Footer>
                            )}
                        </Card>
                    ))}
                </CardDeck>
            </div>
        </div>
    )
}
