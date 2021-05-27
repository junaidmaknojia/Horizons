import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "../LinkedInSignUp/LinkedIn.css";

export default function GoogleSignUp(){

    const location = useLocation();

    // const parsedURL = location.hash.match(/(?<=\&access_token=).*(?=&token_type)/);
    const parsedURL = location.search.match(/(?<=\?code=).*(?=&scope)/);

    useEffect(() => {googleSignUp()}, []);

    async function googleSignUp(){
        const response = await fetch("/api/auth/googleSignUp/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"code": parsedURL && parsedURL[0], "redirect_URI": `${window.location.origin}/google-sign-up`})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data.message);
            window.opener.postMessage(data, "*"); // * = what page is this currently at, we don't care what it is
            // window.close();
            // dispatch(sessionAdd(data));
            // <Redirect to={`/${sessionUser.id}`}/>
        }
    }

    return (
        <div className="loadingScreen">
            <img className="loadingGif" src="https://cdn.dribbble.com/users/1717214/screenshots/4124610/g-logo.gif"/>
            <h1>Creating your account...</h1>
        </div>
    )
}
