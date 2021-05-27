import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "../LinkedInSignUp/LinkedIn.css";


export default function GoogleLogIn(){

    const location = useLocation();

    const parsedURL = location.search.match(/(?<=\?code=).*(?=&scope)/);

    useEffect(() => {googleLogIn()}, []);

    async function googleLogIn(){
        const response = await fetch("/api/auth/googleSignIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"code": parsedURL && parsedURL[0], "redirect_URI": `${window.location.origin}/google-log-in`})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data.message);
            window.opener.postMessage(data, "*"); // * = what page is this currently at, we don't care what it is
        }
    }

    return (
        <div className="loadingScreen">
            <img className="loadingGif" src="https://cdn.dribbble.com/users/1717214/screenshots/4124610/g-logo.gif"/>
            <h1>Logging in...</h1>
        </div>
    )
}
