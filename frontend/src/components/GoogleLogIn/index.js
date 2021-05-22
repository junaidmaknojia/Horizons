import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "../LinkedInSignUp/LinkedIn.css";


export default function GoogleLogIn(){

    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);

    useEffect(() => {linkedInLogIn()}, []);

    async function linkedInLogIn(){
        const response = await fetch("/api/auth/linkedInSignIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0], "redirect_URI": `${window.location.origin}/linkedin-log-in`})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            window.opener.postMessage(data, "*");
            // <Redirect to={`/${sessionUser.id}`}/>
        }
    }

    return (
        <div className="loadingScreen">
            <img className="loadingGif" src="https://cdn.dribbble.com/users/1717214/screenshots/4124610/g-logo.gif"/>
            <h1>Logging in...</h1>
        </div>
    )
}
