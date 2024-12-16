import axios from 'axios';
import "../styles/MyProfile.css";

const UserPosting = ( {  jobPosting, updatePersonalInfo, postings } ) => {

    const selectedJobPostingInfos = postings.find(
        (post) => post._id === jobPosting.jobPostingId
      );
    
      const handleStatusChange = async (event) => {
        const updatedStatus = event.target.value;
    
        try {
            console.log(jobPosting.jobPostingId);
            await axios.put(
            `http://localhost:8000/Users/${localStorage.getItem("id")}/jobPostings/${jobPosting.jobPostingId}/status`,
            { status: updatedStatus }
          );
          updatePersonalInfo(); 
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };
    
    
      const handleDeleteUserApplication = async () => {
        try {
          await axios.delete(
            `http://localhost:8000/Users/${localStorage.getItem("id")}/jobPostings/${jobPosting.jobPostingId}`
          );
          updatePersonalInfo();
        } catch (error) {
          console.error("Error deleting application:", error);
        }
      };

    return(
        <li className='li-app-status-board'>
            <span className="application-title">
                {selectedJobPostingInfos?.title}
            </span>
            <select
                defaultValue={jobPosting.status} 
                id="select-status"
                onChange={handleStatusChange}
            >
                <option value="None" id="white">Set Status</option>
                <option value="Pending" id="white">Pending</option>
                <option value="In Progress" id="white">In Progress</option>
                <option value="Approved" id="white">Approved</option>
                <option value="Rejected" id="white">Rejected</option>
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