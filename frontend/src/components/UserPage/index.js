import { useEffect } from "react";
import { useParams } from "react-router";
import "./UserPage.css";

export default function UserPage(){

    const {id} = useParams();
    let user;

    useEffect(async () => {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        user = data.user;
    }, [dispatch]);

    return (
        <>

        </>
    )
}
