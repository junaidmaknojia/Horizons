import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import "./LinkedIn.css";

export default function LinkedInSignUp(){

    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    console.log(location.search);
    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);
    console.log(parsedURL && parsedURL[0]);

    useEffect(() => {linkedInSignUp()}, []);

    async function linkedInSignUp(){
        const response = await fetch("/api/auth/linkedInSignUp/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0]})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            window.opener.postMessage(data, "*"); // * = what page is this currently at, we don't care what it is
            // window.close();
            // dispatch(sessionAdd(data));
            // <Redirect to={`/${sessionUser.id}`}/>
        }
    }

    // add modal to prevent user clicks while processing user signup
    return (
        <>
            <img className="loadingGif" src="https://cliply.co/wp-content/uploads/2021/02/372102050_LINKEDIN_ICON_TRANSPARENT_1080.gif"/>
        </>
    )
}
