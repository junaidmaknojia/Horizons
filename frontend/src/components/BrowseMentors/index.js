import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../store/requests";
import { getMentors } from "../../store/user";



export default function BrowseMentors() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [addedTags, setAddedTags] = useState([]);
    const [listMentors, setListMentors] = useState([]);
    let tagOptions;

    useEffect(async () => {
        const mentors = dispatch(getMentors());
        setListMentors(mentors);
        const tags = await fetch("/api/searches/tags");
        tagOptions = await tags.json();
        tagOptions = tagOptions.tags;
    }, [dispatch]);

    useEffect(() => {
        const tempMentors = new Set([...addedTags.map(tag => tag.users)]);
        setListMentors([...tempMentors]);
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
    }

    return (
        <div>
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
