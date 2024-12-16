import React, { useState, useEffect } from 'react';
import FilterWindow from '../components/FilterWindowJobs';
import '../styles/Postings.css';
import axios from 'axios';
import Posting from '../components/Posting';
import FullPostingDisplay from '../components/FullPostingDisplay';

const Postings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [filteredJobPostings, setFilteredJobPostings] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    keywords: "",
    term: "",
    duration: [],
    country: "",
    province: "",
    city: "",
    format: [],
    type: [],
    features: [],
    language: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFilterSubmit = (filterData) => {
    console.log("Filter Data Submitted:", filterData);
    setFormData(filterData);
  
    const filtered = jobPostings.filter((posting) => {
        console.log(posting);
      const matchesKeywords =
        filterData.keywords === "" ||
        posting.title.toLowerCase().includes(filterData.keywords.toLowerCase());
  
      const matchesTerm =
        filterData.term === "" || posting.term[0].status === filterData.term.toLowerCase();
  
      const matchesDuration =
        filterData.duration.length === 0 ||
        filterData.duration.some(duration => posting.duration[0].status.includes(duration));
  
      const matchesCountry =
        filterData.country === "" || posting.location.country === filterData.country;
  
      const matchesProvince =
        filterData.province === "" || posting.location.province === filterData.province;
  
      const matchesCity =
        filterData.city === "" || posting.location.city === filterData.city;
  
      const matchesFormat =
        filterData.format.length === 0 || filterData.format.some(format => posting.format[0].status.includes(format));
  
      const matchesType =
        filterData.type.length === 0 || filterData.type.some(type => posting.modality[0].status.includes(type));
  
    //   const matchesFeatures =
    //     filterData.features.length === 0 ||
    //     filterData.features.some(feature => posting.features.includes(feature));
  
      const matchesLanguage =
        filterData.language.length === 0 || filterData.language.some(lang => posting.language[0].status.includes(lang));
  
      return (
        matchesKeywords &&
        matchesTerm &&
        matchesDuration &&
        matchesCountry &&
        matchesProvince &&
        matchesCity &&
        matchesFormat &&
        matchesType &&
        // matchesFeatures &&
        matchesLanguage
      );
    });
  
    console.log("Filtered Postings:", filtered);
    setFilteredJobPostings(filtered);
  };
  

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/JobPostings');
        setJobPostings(response.data);
        setFilteredJobPostings(response.data); // Set initial state for filtered postings
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };
    fetchJobPostings();
  }, []);

  // FilterWindow visibility
  const [isActive, setIsActive] = useState(false);

  const filterButtonClicked = () => {
    setIsActive(!isActive);
  };

  const createPosting = () => {
    return (
      <div>
        {filteredJobPostings.length > 0 ? (
          filteredJobPostings.map((jobPosting) => (
            <Posting
              key={jobPosting.id}
              jobPosting={jobPosting}
              setSelectedPost={setSelectedPost}
            />
          ))
        ) : (
          <p>No job postings found based on the selected filters.</p>
        )}
      </div>
    );
  };

  return (
    <div className="postings-page">
      <div className="postings-container">
        {isActive && <FilterWindow onFilterSubmit={handleFilterSubmit} setIsActive={setIsActive}/>}
        <div className="search-section">
          <form>
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

          <button className="filter-button" onClick={filterButtonClicked}>
            Filter
          </button>
        </div>

        <div className="postings-list-container">{createPosting()}</div>
      </div>
      <div style={{ borderLeft: '3px dashed black', height: '100vh' }} />
      <div className="full-selected-posting">
        {selectedPost ? (
          <FullPostingDisplay selectedPost={selectedPost}></FullPostingDisplay>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Postings;
