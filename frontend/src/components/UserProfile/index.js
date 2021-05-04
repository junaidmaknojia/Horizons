import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import EditProfile from "../EditProfile";

export default function UserProfile() {

    const sessionUser = useSelector(state => state.session.user);
    let warnings = [];

    if (sessionUser.role === "Mentor") {
        const numTags = sessionUser.tags ? sessionUser.tags.length : 0;
        if (!sessionUser.tags || numTags < 8) warnings.push(`${8 - numTags} more tag${8 - numTags === 1 ? "" : "s"}`);
        if (!sessionUser.industry) warnings.push("Industry")
    }

    return (
        <div className="userProfile">
            {warnings && (
                <>
                    <h2>Please go into your profile settings and add the following:</h2>
                    <ul>
                        {warnings.map(warning => (<li>{warning}</li>))}
                    </ul>
                </>
            )}
            <Link to="/edit" component={EditProfile}>Edit</Link>
        </div>
    );
}
