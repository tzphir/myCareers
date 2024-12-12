import React, { useState, useEffect } from 'react';
import '../styles/MyProfile.css';
import axios from 'axios';
//import Postings from './Postings';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const [selectedValue, setSelectedValue] = useState('');

    const handleStatusChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const [personalInfo, setPersonalInfo] = useState({
        fname: '',
        lname: '',
        id: '',
        email: '',
        faculty: '',
        documents: [],
        jobPostings: []
    });

    const [isChanged, setIsChanged] = useState(false); // Tracks if any input has changed

    // Fetch student information on component mount
    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const response = await axios.get(`/id:${localStorage.getItem("id")}`); 
                setPersonalInfo(response.data);
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };
        fetchPersonalInfo();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
        setIsChanged(true); // Show submit button
    };

    // Submit updated info
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/update-student-info', personalInfo); // Replace
            setIsChanged(false); // Hide submit button after successful update
            alert('Information updated successfully!');
        } catch (error) {
            console.error('Error updating personal info:', error);
        }
    };

    const navigate = useNavigate();
    const goToPostings = () => {
        navigate('/postings+applications', { replace: true});
    }

    return (
        
       <div id="myprofile">
            <div className="container" id="documents">
                <div className="documents-content">
                    <h2>Documents</h2>
                    <ul>
                        <li>
                            <span className="doc-type">Cover Letter</span>
                            <span className="count">0</span>
                            <button type="button" className="view-button">View</button>
                            <button type="button" className="add-button">+</button>
                        </li>
                        <li>
                            <span className="doc-type">CV/Resume</span>
                            <span className="count">0</span>
                            <button type="button" className="view-button">View</button>
                            <button type="button" className="add-button">+</button>
                        </li>
                        <li>
                            <span className="doc-type">Unofficial Transcript</span>
                            <span className="count">0</span>
                            <button type="button" className="view-button">View</button>
                            <button type="button" className="add-button">+</button>
                        </li>
                        <li>
                            <span className="doc-type">Recommendation Letter</span>
                            <span className="count">0</span>
                            <button type="button" className="view-button">View</button>
                            <button type="button" className="add-button">+</button>
                        </li>
                        <li>
                            <span className="doc-type">Other</span>
                            <span className="count">0</span>
                            <button type="button" className="view-button">View</button>
                            <button type="button" className="add-button">+</button>
                        </li>
                        <li>
                            <span className="doc-type">Templates</span>
                            <button type="button" className="add-button">+</button>
                        </li>
                    </ul>
                </div>
            </div> 

              

            <div className="container" id="personal-info">
                <div className="types-personal-info">
                    <h2>Personal Info</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="col">
                            <label for="fname">First Name:</label>
                            <input type='text' name="fname" id="fname" value={personalInfo.fname} onChange={handleChange}></input>
                        </div>
                        <div class="col">
                            <label for="lname">Last Name:</label>
                            <input type='text' name="lname" id="lname" value={personalInfo.lname} onChange={handleChange}></input>
                        </div>
                        <div class="col">
                            <label for="id">Student ID:</label>
                            <input type='text' name="id" id="id" value={personalInfo.id} onChange={handleChange}></input>
                        </div>
                        <div class="col">
                            <label for="email">Email:</label>
                            <input type='text' name="email" id="email" value={personalInfo.email} onChange={handleChange}></input>
                        </div>
                        <div class="col">

                            <label for="faculty">Student ID:</label>
                            <input type='text' name="faculty" id="faculty" value={personalInfo.faculty} onChange={handleChange}></input>
                        </div>
                        {isChanged && <input type="submit" value="Submit" />}
                    </form>
                    {/*
                    <ul>
                        <li>
                            First Name:
                        </li>
                        <li>
                            Last Name:
                        </li>
                        <li>
                            Student ID:
                        </li>
                        <li>
                            Email:
                        </li>
                        <li>
                            Faculty:
                        </li>
                    </ul>
                </div>
                <div className="form-personal-info">
                    <input type="text"></input><br/>
                    <input type="text"></input><br/>
                    <input type="text"></input><br/>
                    <input type="text"></input><br/>
                    <input type="text"></input><br/>
                </div>
                */}
                </div>
            </div>
            
            <div className="container" id="applications">
                <div className="applications-content">
                    <h2>Applications Status Board</h2>
                    <ul>
                        <li>
                            <span className='application-title'> Software Development Intern Position at X</span>
                            <select value={selectedValue} onChange={handleStatusChange}>
                                <option value='' className="white">Set Status</option>
                                <option value='in-progress' className="white">In Progress</option>
                                <option value='pending' className="white">Pending</option>
                                <option value='accepted' className="white">Accepted</option>
                                <option value='rejected' className="white">Rejected</option>
                            </select>
                            <i className="bi bi-trash"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"  style={{ cursor: 'pointer' }}  viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </li>
                    </ul>
                    <button type="button" className="search-more-button" onClick={goToPostings}>Search More</button>
                </div>
            </div>
       </div>
    );
};

export default MyProfile;