import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./UserPage.css";

export default function UserPage(){

    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(async () => {
        console.log("inside useEffect");
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
        // user = data.user;
    }, []);

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
