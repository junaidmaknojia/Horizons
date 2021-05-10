import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, makeRequest } from "../../store/requests";
import { getMentors } from "../../store/user";
import "./BrowseMentors.css";



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
                {listMentors?.map(mentor => (
                    <div className="listMentors__mentor">
                        <h3>{`${mentor.firstName} ${mentor.lastName}`}</h3>
                        <p>{mentor.title}</p>
                        <p>{mentor.industry}</p>
                        <button onClick={() => handleRequest(mentor)}>Request</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
