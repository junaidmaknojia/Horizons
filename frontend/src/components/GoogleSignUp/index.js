import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "../LinkedInSignUp/LinkedIn.css";

export default function GoogleSignUp(){

    const dispatch = useDispatch();
    const location = useLocation();

    const parsedURL = location.hash.match(/(?<=\&access_token=).*(?=&token_type)/);
    console.log(location.hash);
    console.log(parsedURL);
    // #state=state_parameter_passthrough_value&access_token=ya29.a0AfH6SMAqQ7seeYA1WInQX_HqieGOo3hU8YQGIFjJe6XXlEpQJjgcErxU6c2S6e73F1N9l8WmzMcmy9pLMzbbs9kuPOiq0HgutrHHxE-ZVaepk_o9laZ-CnpKIqoqH11scptqqxfNVZbuXD9Qx987Q0RLX9Y2&token_type=Bearer&expires_in=3599&scope=email%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent

    useEffect(() => {googleSignUp()}, []);

    async function googleSignUp(){
        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', "/api/auth/googleSignUp/");
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.onload = function() {
        // console.log('Signed in as: ' + xhr.responseText);
        // };
        // xhr.send('idtoken=' + parsedURL[0]);
        const response = await fetch("/api/auth/googleSignUp/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0], "redirect_URI": `${window.location.origin}/google-sign-up`})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data.message);
            // window.opener.postMessage(data, "*"); // * = what page is this currently at, we don't care what it is
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
