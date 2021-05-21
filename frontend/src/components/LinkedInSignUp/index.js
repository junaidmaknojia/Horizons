import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "./LinkedIn.css";

export default function LinkedInSignUp(){

    const dispatch = useDispatch();
    const location = useLocation();

    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);

    useEffect(() => {linkedInSignUp()}, []);

    async function linkedInSignUp(){
        const response = await fetch("/api/auth/linkedInSignUp/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0], "redirect_URI": `${window.location.origin}/linkedin-sign-up`})
        });
        if(response.ok){
            const data = await response.json();
            window.opener.postMessage(data, "*"); // * = what page is this currently at, we don't care what it is
            // window.close();
            // dispatch(sessionAdd(data));
            // <Redirect to={`/${sessionUser.id}`}/>
        }
    }

    return (
        <div className="loadingScreen">
            <img className="loadingGif" src="https://cliply.co/wp-content/uploads/2021/02/372102050_LINKEDIN_ICON_TRANSPARENT_1080.gif"/>
            <h1>Creating your account...</h1>
        </div>
    )
}
