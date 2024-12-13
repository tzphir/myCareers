import React, { useState, useEffect } from 'react';
import FilterWindow from '../components/FilterWindow';
import '../styles/Postings.css'
import axios from 'axios';
import Posting from '../components/Posting';
import FullPostingDisplay from '../components/FullPostingDisplay';

const Postings = () => {
    
    const [jobPostings, setJobPostings] = useState([]);

    const [formData, setFormData] = useState({
        keywords: "",
    });

    const [selectedPost, setSelectedPost] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
            [name]: value,
        }));  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("Form Data:", formData);
        // Add search logic here
    };

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/JobPostings'); 
                setJobPostings(response.data);
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };
        fetchJobPostings();
    }, []);

    //FilterWindow visibility
    const [isActive, setIsActive] = useState(false);

    const filterButtonClicked = () => {
        setIsActive(!isActive);
    }

    const createPosting = () => {
        return (
        <div>
            {jobPostings.map( (jobPosting) => (
                <Posting 
                    jobPosting={jobPosting} 
                    //selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}>    
                </Posting>
            ) )}
        </div>);
    }

    return (
        <div className='postings-page'>
            <div className='postings-container'>
                {isActive && <FilterWindow></FilterWindow>}
                <div className='search-section'>
                    <form onSubmit={handleSubmit}>
                        <div className="search-bar">
                            <input
                                type="text"
                                name="job-postings"
                                placeholder="Job Postings"
                                value={formData.keywords}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className='filter-button' onClick={filterButtonClicked}>Filter</button>
                </div>
                {/*
                <div className='postings-filter-options'>
                    <div className='postings-filter-options contract'>
                        <ul>
                            <li>Full Time</li>
                            <li>Part Time</li>
                            <li>Contract</li>
                        </ul>
                    </div>
                    <div className='postings-filter-options term'>
                        <ul>
                            <li>Fall</li>
                            <li>Winter</li>
                            <li>Summer</li>
                        </ul>
                    </div>
                    <div className='postings-filter-options display'>
                        <ul>
                            <li>Starred</li>
                            <li>Hidden</li>
                        </ul>
                    </div>
                </div>
                */}
                <div className='postings-list-container'>
                    {createPosting()}
                </div>
            </div>
            <div style={{ borderLeft: '3px dashed black', height: '100vh' }} />
            <div className='full-selected-posting'>
                {selectedPost ? (
                    <FullPostingDisplay selectedPost={selectedPost}></FullPostingDisplay>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
};

export default Postings;
