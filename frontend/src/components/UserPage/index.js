import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./UserPage.css";

export default function UserPage(){

    const {id} = useParams();
    const [user, setUser] = useState({});
    const sessionUser = useSelector(state => state.session.user);

    useEffect(async () => {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
    }, []);

    if(sessionUser.id == id){
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="userPage">
            <img src={user.profilePhoto} className="userPage__photo"/>
            {user && (
                <div className="userPage__info">
                    <h1>{`${user.firstName} ${user.lastName}`}
                        {user.linkedIn && (<a href={user.linkedIn} target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin" style={{margin: 5}}></i></a>)}
                    </h1>
                    <h3>{user.role}</h3>
                    {user.title && (<h3>{user.title}</h3>)}
                    {user.industry && (<h4>{user.industry}</h4>)}
                    {(user.city && user.state) && (
                        <p><i class="fas fa-globe-americas" style={{margin: 5}}></i>{`${user.city}, ${user.state}`}</p>
                    )}
                    {user.bio && (<p>{user.bio}</p>)}
                </div>
            )}
        </div>
    )
}
