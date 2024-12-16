
import { useEffect } from 'react';
import Logo from '../assets/mock_company_logo.jpeg';
import '../styles/FullPostingDisplay.css'
import axios from 'axios';

const FullPostingDisplay = ( {  selectedPost } ) => {

const req = {
    jobPostingId : selectedPost._id,
    status: "Pending",
    star:true
    
  };
  const handleApply = async () => {
    try{
        const response = await axios.post(`http://localhost:8000/Users/${localStorage.getItem("id")}/jobPostings`,req);
        alert("This posting has been added to your application status board in your profile");
    }catch (error){
        alert(error.response.data.error); 
    }

}
    
    //console.log(selectedPost);
    const starColor = selectedPost.star ? 'red' : 'none';
    return(
    <div className="top-container">

        <div className="top-square">
            <div className="top-left-square">
                <h2 id='h2-title'>{selectedPost.title}</h2>
                <div className="star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill={starColor}  className='star' >
                        <rect width="24" height="24" fill="white"/>
                        <path d="M11.5245 4.46353C11.6741 4.00287 12.3259 4.00287 12.4755 4.46353L13.9084 8.87336C13.9753 9.07937 14.1673 9.21885 14.3839 9.21885H19.0207C19.505 9.21885 19.7064 9.83866 19.3146 10.1234L15.5633 12.8488C15.3881 12.9761 15.3148 13.2018 15.3817 13.4078L16.8145 17.8176C16.9642 18.2783 16.437 18.6613 16.0451 18.3766L12.2939 15.6512C12.1186 15.5239 11.8814 15.5239 11.7061 15.6512L7.95488 18.3766C7.56303 18.6613 7.03578 18.2783 7.18546 17.8176L8.6183 13.4078C8.68524 13.2018 8.61191 12.9761 8.43667 12.8488L4.68544 10.1234C4.29358 9.83866 4.49497 9.21885 4.97933 9.21885H9.6161C9.83272 9.21885 10.0247 9.07937 10.0916 8.87336L11.5245 4.46353Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <div className="top-right-square">
                <span className="time">{selectedPost.term[0].status} 2025</span>
                <span className="time">{selectedPost.modality[0].status}</span>
            </div>
        </div>

        <div className="bottom-square">
            <div className="left-square">
                <div className="bottom-square-top">
                    <div className="logo">
                        <img src={Logo} alt="Company Logo"/>
                    </div>
                    <span className="company-name">{selectedPost.company}</span>
                </div>
                <div className="location">
                    <span className="location-title">{selectedPost.location.city}, {selectedPost.location.province}, {selectedPost.location.country}</span>
                </div>
            </div>

            <div className="right-square">
                <div>
                    <button className="apply-button" onClick={handleApply}>Apply</button>
                </div>
            </div>
        </div>
        <hr className="desc-line" />
        <div className="description-container">
            <span>Description</span>
            <div className="description-text">
                {selectedPost.description}
            </div>
        </div>
    </div>);
}

export default FullPostingDisplay;