import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import {sessionAdd} from "../../store/session";

export default function LinkedInURL(){

    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    // const role = useSelector(state => state.userData.role);

    console.log(location.search);
    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);
    console.log(parsedURL && parsedURL[0]);

    useEffect(() => {linkedInSignUp()}, []);
    // useEffect(() => {linkedInLogIn()}, []);

    async function linkedInLogIn(){
        const response = await fetch("/api/auth/linkedInSignIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0]})
        });
        // if(response.ok){
        //     const data = await response.json();
        //     dispatch(sessionAdd(data));
        //     <Redirect to={`/${sessionUser.id}`}/>
        // }
    }

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
        </>
    )
}
