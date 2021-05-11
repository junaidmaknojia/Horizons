import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";


export default function LinkedInURL(){

    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    console.log(location.search);
    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);
    console.log(parsedURL && parsedURL[0]);

    useEffect(() => {sendURLToBack()}, []);

    async function sendURLToBack(){
        const response = await fetch("/api/auth/linkedInSignIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0]})
        });
        if(response.ok){
            <Redirect to={`/${sessionUser.id}`}/>
        }
    }

    return (
        <>
        </>
    )
}
