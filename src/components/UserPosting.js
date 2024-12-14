import { useState } from 'react';
import axios from 'axios';
import "../styles/MyProfile.css";

const UserPosting = ( {  jobPosting, setDeletedApplication } ) => {
    console.log(jobPosting.jobPostingId);
    console.log(jobPosting.id);
    console.log("Hello");

    const [selectedValue, setSelectedValue] = useState('');


    const handleStatusChange = (event) => {
        setSelectedValue(event.target.value);
        //PUT REQUEST TO UPDATE JOB POSTING'S STATUS -> MISSING NECESSARY ENDPOINT
        {/*
        try{
            const response = await axios.put(`http://localhost:8000/Users/${localStorage.getItem("_id")}/jobPostings/${jobPosting.id}`);
        }
            */}
        
    }

    const handleDeleteUserApplication = async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/Users/${localStorage.getItem("_id")}/jobPostings/${jobPosting.id}`, );
          setDeletedApplication(true);
          console.log(response.data);
        } catch (error) {
          console.error("Error deleting your application :", error);
        }
      };

    return(
        <li>
            <span className='application-title'>{jobPosting.posting.title}</span>
            <select value={selectedValue} onChange={handleStatusChange}>
                <option value='' className="white">Set Status</option>
                <option value='pending' className="white">Pending</option>
                <option value='in-progress' className="white">In Progress</option>
                <option value='accepted' className="white">Accepted</option>
                <option value='rejected' className="white">Rejected</option>
            </select>
            <i className="bi bi-trash"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"  style={{ cursor: 'pointer' }} onClick={handleDeleteUserApplication} viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </li>
    );
}

export default UserPosting;