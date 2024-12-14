// for chart.js, type this in the command line: npm i react-chartjs-2 chart.js
// for react-calendar, type this in the command line: npm install react-calendar

import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PieChart from '../components/PieChart';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; 

function Home() {

  // Define variables for the user data
  const [userData, setUserData] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null); // State for total jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get the id of the specific user
  const id = localStorage.getItem("id");

  // If no id exists, redirect to the login
  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    // Fetch user-specific data using the userId
    const fetchUserData = axios.get(`http://localhost:8000/Users/${id}`);
    const fetchTotalJobs = axios.get("http://localhost:8000/JobPostings"); // Fetch total jobs

    Promise.all([fetchUserData, fetchTotalJobs])
      .then(([userResponse, jobsResponse]) => {
        console.log(userResponse.data, jobsResponse.data);
        setUserData(userResponse.data); // Store user data
        setTotalJobs(jobsResponse.data.length); // Store the total number of jobs
        setLoading(false);
      })
      .catch(err => {
        setError("Error loading data");
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare Pie Chart data
  const appliedJobsCount = userData.jobPostings.length;
  const remainingJobsCount = totalJobs - appliedJobsCount;

  const pieChartData = {
    labels: ["Applied Jobs", "Remaining Jobs"],
    datasets: [
      {
        label: "Number",
        data: [appliedJobsCount, remainingJobsCount],
        backgroundColor: ["rgb(128, 128, 128)", "rgb(255, 0, 0)"],
        hoverOffset: 4,
      },
    ],
  };

  
    
    

    return (
        <div id="homepage">

            <div className="nav-container"> 
                <div id="button-container" className="button-container">
                    <button id="jobButton" className="nav-button" onClick={() => navigate('/postings+applications')}> Jobs</button>
                    <p> Browse our General Jobs Board for many opportunities including summer positions and full-time roles </p>
                </div>
                <div id="button-container" className="button-container"> 
                    <button id="internshipButton"className="nav-button" onClick={() => navigate('/postings+applications')}> Internships</button>
                    <p>Explore our Internships/Co-op Board for tailored opportunites to gain valuable hands-on industry experience </p>
                </div>   
                <div id="button-container" className="button-container">
                    <button id="volunteerButton" className="nav-button" onClick={() => navigate('/postings+applications')}> Volunteer</button>
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
                      <h3> Total jobs vs applied jobs</h3>
                        <PieChart data={pieChartData} />
                        
                    </div>
                </div>
        
                <div id="calendar" className="calender-container"> 
                    <h2> Click on the Calendar to see your events! </h2> <br></br>
                    <Calendar onClickDay={() => navigate(`/events`)} />
                </div>
    
            </div>
        </div>  
  
    );  
}
export default Home;
