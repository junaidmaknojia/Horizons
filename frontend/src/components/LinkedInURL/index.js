import { useEffect } from "react";
import {useLocation} from "react-router-dom";


export default function LinkedInURL(){

    const location = useLocation();

    console.log(location.search);
    const parsedURL = location.search.match(/(?<=\?code=).*(?=&)/);
    console.log(parsedURL && parsedURL[0]);
    // ?code=AQTuIHiDrzQXQ85jKHJM03OERE1iPkW9Ik87rwqtdvf-zFcQ6fgjloSNQWT8HaQVpHVzyYfmfTpZLiNTO8Wfcj8vldPkb6L2PxkebDkmDN3tTvMutzm2mTAl0B6EHzXtyZ2Y2UgbySKHkyQFtMHgPwUl5OZk6lgI-Slk3VCsd1qEvN8Dc6rUHuarq8q76HDR02rdGXC4xji7uQhJ6bU&state=foobar

    useEffect(() => {sendURLToBack()}, []);

    async function sendURLToBack(){
        const response = await fetch("/api/users/linkedIn/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": parsedURL && parsedURL[0]})
        });
    }

    return (
        <>
        </>
    )
}
