import React, { useState, useEffect } from 'react';
import '../styles/MyProfile.css';
import axios from 'axios';
import UserPosting from '../components/UserPosting';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

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
                const response = await axios.get(`http://localhost:8000/Users`); 
                //const response = await axios.get(`http://localhost:8000/Users`); 
                console.log(response.data);
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
            console.log(personalInfo);
            await axios.put(`http://localhost:8000/Users/${personalInfo._id}`, personalInfo);
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
                            <label for="faculty">Faculty:</label>
                            <input type='text' name="faculty" id="faculty" value={personalInfo.faculty} onChange={handleChange}></input>
                        </div>
                        {isChanged && <input type="submit" value="Submit" />}
                    </form>
                </div>
            </div>
            
            <div className="container" id="applications">
                <div className="applications-content">
                    <h2>Applications Status Board</h2>
                    <ul>
                        {personalInfo?.jobPostings?.map((jobPosting, index) => (
                                <UserPosting key={index} jobPosting={jobPosting} />
                        ))}
                    </ul>
                    <button type="button" className="search-more-button" onClick={goToPostings}>Search More</button>
                </div>
            </div>
       </div>
    );
};

export default MyProfile;