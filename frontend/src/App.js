import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import BrowseMentors from "./components/BrowseMentors";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const industryOptions = ["Accounting/Tax", "Architecture + Design",
        "Arts + Culture", "Beauty", "BioTech", "Blockchain + Crypto",
        "Consulting", "Consumer Products", "Cybersecurity", "eCommerce",
        "Immersive EdTech", "Mechanical Engineering", "Chemical Engineering", "Software Engineering", "Electrical Engineering", "Civil Engineering",
        "Entertainment + Gaming", "Fashion Tech", "Investment Banking", "Mergers & Acquisitions",
        "Food & Beverage", "Green Tech", "Healthcare Tech", "Medicine", "Hospitality + Tourism",
        "Human Resources", "VC/Angel Investing", "Hedge Funds", "Impact Investors", "Legal Tech Policy",
        "Sports Management", "Construction Management", "Project Manager", "COO", "Founder", "Manufacturing",
        "Social Media Marketing", "Public Relations", "Journalism", "Mental Health Tech", "Nonprofits",
        "Sales/CRM", "Social Work", "ML/AI", "IoT", "SaaS", "Data Science/Analytics", "UI/UX", "Graphic/Web Design",
        "Transportation Tech"];

  const tagOptions = ["Incorporation", "Branding", "Creating a MVP", "Business model",
      "Financial model", "Pitching", "Customer Acquisition", "Operations", "Growth", "Product feedback",
      "Product-market fit", "Business development", "Scaling a company", "Marketing", "Business Strategy",
      "Team building", "Legal", "Fundraising", "Upskilling", "Coding", "Law School application", "Business School application",
      "Grad school application", "Investing", "Digital skills training", "Getting an internship", "Getting first job",
      "Career advancement", "Setting professional goals", "Resume/job applications", "Getting a promotion", "Salary Negotiation",
      "Recruiting help", "Switching careers", "Confidence building", "Public speaking", "Job interview skills",
      "Negotiation strategies", "Goal setting", "Professional networking", "Leadership skills", "Getting on boards",
      "Communication skills", "Managing teams", "Building a personal brand", "Work/life balance"];

  const titleOptions = ["Accountant", "Administrative Assistant", "Customer Service Representative", "HR Manager",
      "Mechanical Engineer", "Chemical Engineer", "Software Engineer", "Electrical Engineer", "Civil Engineer",
      "Investment Banking Analyst", "Finance Manager", "Venture Capital Analyst", "Angel investor", "Hedge fund Manager",
      "Impact investor", "Sports Manager", "Construction Manager", "Project Manager", "COO", "Founder", "CEO", "CFO",
      "General Manager", "Social Media Manager", "Marketing Manager", "Journalist", "Business Development Manager",
      "Sales Representative", "Sales Manager", "Machine Learning Engineer", "Frontend Developer", "Backend Developer",
      "Full-stack Developer", "Product Manager", "Mobile App Developer", "Data Scientist", "UX/UI Designer",
      "Graphic Designer", "Web Designer"];

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/user">
            <UserProfile/>
          </Route>
          <Route path="/edit">
            <EditProfile tagOptions={tagOptions} titleOptions={titleOptions} industryOptions={industryOptions}/>
          </Route>
          <Route path="/browse">
            <BrowseMentors tagOptions={tagOptions}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
