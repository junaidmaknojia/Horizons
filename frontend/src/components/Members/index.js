import { useEffect, useState } from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Members.css";

export default function Members() {

    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);


    useEffect(() => {
        async function getMembers(){
            let response = await fetch("/api/users/mentors/");
            let data = await response.json();
            setMentors(data.mentors);
            response = await fetch("/api/users/mentees/");
            data = await response.json();
            setMentees(data.mentees);
        }
        getMembers();
    }, []);

    return (
        <div className="members">
            <div className="mentors">
                {mentors?.map(mentor => (
                    <Card className="card">
                        <Card.Img variant="top" src={mentor.profilePhoto} />
                        <Card.Body>
                            <Card.Title><Link to={`/${mentor.id}`}>{`${mentor.firstName} ${mentor.lastName}`}</Link></Card.Title>
                            <Card.Text>{mentor.title}</Card.Text>
                            <Card.Text>{mentor.industry}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>{`${mentor.city}, ${mentor.state}`}</Card.Text>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
            <div className="mentees">
                {mentees?.map(mentee => (
                    <Card className="card">
                        <Card.Img variant="top" src={mentee.profilePhoto} />
                        <Card.Body>
                            <Card.Title><Link to={`/${mentee.id}`}>{`${mentee.firstName} ${mentee.lastName}`}</Link></Card.Title>
                            <Card.Text>{mentee.title}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>{`${mentee.city}, ${mentee.state}`}</Card.Text>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}
