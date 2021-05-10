import { useEffect } from "react";
import { useParams } from "react-router";
import "./UserPage.css";

export default function UserPage(){

    const {id} = useParams();
    let user;

    useEffect(async () => {
        const response = await fetch(`/api/users/${id}`);
        user = await response.json();
        // user = data.user;
    }, []);

    return (
        <div className="userPage">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <h2>{user.role}</h2>
            {user.title && (<h2>{user.title}</h2>)}
        </div>
    )
}
