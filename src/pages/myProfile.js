import React from 'react';
import '../styles/MyProfile.css';

const MyProfile = () => {
   
    return (
       <div id="myprofile">
            <div className="container" id="documents">
                <div className="documents-content">
                    <h2>Documents</h2>
                    <ul>
                        <li>Cover Letter <button className="file-button view">View</button></li>
                        <li>CV/Resume</li>
                        <li>Unofficial Transcript</li>
                        <li>Recommendation Letter</li>
                        <li>Other</li>
                        <li>Templates <button id="add" className="file-button">+</button></li>
                    </ul>
                </div>
            </div> 
            <div className="container" id="applications"></div>
            <div className="container" id="personal-info"></div>
       </div>
    );
};

export default MyProfile;