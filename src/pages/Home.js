// for chart.js, type this in the command line: npm i react-chartjs-2 chart.js

import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Home() {

    // Backend stuff here

    // Define variables for the user data
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Get the id of the specific user
    const id = localStorage.getItem("id");

    // If no id exists, we should redirect to the login
    useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    // Fetch user-specific data using the userId
    axios.get(`http://localhost:5000/user/${id}`)
      .then(response => {
        setUserData(response.data);  // Store user data
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading user data');
        setLoading(false);
      });
  }, [userId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
    
    

    return (
        <div id="homepage">

            <div className="nav-container"> 
                <div id="button-container" className="button-container">
                    <button id="jobButton" className="nav-button"> Jobs</button>
                    <p> Browse our General Jobs Board for many opportunities including summer positions and full-time roles </p>
                </div>
                <div id="button-container" className="button-container"> 
                    <button id="internshipButton"className="nav-button"> Internships</button>
                    <p>Explore our Internships/Co-op Board for tailored opportunites to gain valuable hands-on industry experience </p>
                </div>   
                <div id="button-container" className="button-container">
                    <button id="volunteerButton" className="nav-button"> Volunteer</button>
                    <p>Make a difference in your community and beyond and discover various volunteering opportunities </p>
                </div>  
            </div>

            <div className="bottom-container"> 
                <div className="stats-container"> 
                    <div id="numbers" className="numbers"> 
                        <h2> For you</h2>
                        <ul id="newPostings">
                            <li>
                            New Postings Since Last Login<p id="postings">16</p> 
                            </li>
                            <li>
                            New Program Specific Jobs <p id="postings">15</p> 
                            </li>
                            <li>
                            Job Applications Due Today <p id="postings">3</p> 
                            </li>
                            <li>
                            Events Happening Today <p id="postings">0</p> 
                            </li>
                        </ul>
                    </div>  
                    <div id="pieChart" className="pie-chart"> 
                        // Here, I will make a chart using chart.js. I'll start with only two parts: applied jobs and the other jobs. 
                        
                        
                    </div>
                </div>
        
                <div id="calendar" className="calender-container"> 
                    <h1 id="date" style={{margin:'0'}}> Nov 21, 2024</h1>
                    <p>Calender goes here </p>
                </div>
    
            </div>
        </div>  
  
    );  
}
export default Home;
