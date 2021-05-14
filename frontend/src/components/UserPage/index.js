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
            {user && (
                <>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <h2>{user.role}</h2>
                    {user.title && (<h2>{user.title}</h2>)}
                </>
            )}
        </div>
    )
}
