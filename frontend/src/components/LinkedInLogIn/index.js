import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import { Modal } from "../../context/Modal";


export default function LinkedInLogIn(){

    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);

    useEffect(() => {linkedInLogIn()}, []);

    async function linkedInLogIn(){
        const response = await fetch("/api/auth/linkedInSignIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0]})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            window.opener.postMessage(data, "*");
            // <Redirect to={`/${sessionUser.id}`}/>
        }
    }


    // add modal to prevent user clicks while processing user signup
    return (
        <Modal>
            <img className="loadingGif" src="https://cliply.co/wp-content/uploads/2021/02/372102050_LINKEDIN_ICON_TRANSPARENT_1080.gif"/>
        </Modal>
    )
}
