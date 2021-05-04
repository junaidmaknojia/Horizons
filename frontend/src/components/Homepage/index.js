import { useSelector } from "react-redux";
import React from "react";
import "./Homepage.css";

export default function Homepage({isLoaded}) {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="homepage">
            {sessionUser && (
                <div className="followingDiv"></div>
            )}
        </div>
    );
}
