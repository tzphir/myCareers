import React from 'react';
import '../styles/Home.css'



function Home(){

    //add a media query so it all stacks when you make the screen size smaller 
    return (
        <div id="homepage">

            {/*Buttons*/}
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
                        <p>Pie Chart goes here</p>
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