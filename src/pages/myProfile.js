import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../styles/MyProfile.css";
import UserPosting from "../components/UserPosting";
import { useNavigate } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocumentPreview from "../components/DocumentPreview";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyProfile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fname: "",
    lname: "",
    id: "",
    email: "",
    faculty: "",
    documents: [],
    jobPostings: [],
  });

  const [personalInfoChanged, setPersonalInfoChanged] = useState(false); // Tracks if any input has changed
  
  const [activeDocument, setActiveDocument] = useState(null);

  const [isDeletedApplication, setDeletedApplication] = useState(false);
  const [isChanged, setIsChanged] = useState(false); // Tracks if any input has changed
  const [postings, setPostings] = useState([])

  const documentCounts = useMemo(() => {
    const counts = {};
    personalInfo.documents.forEach((doc) => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, [personalInfo.documents]);
  const fetchPersonalInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/Users/${localStorage.getItem("id")}`
      );
      setPersonalInfo(response.data);
    } catch (error) {
      console.error("Error fetching personal info:", error);
    }
  };
  useEffect(() => {
    fetchPersonalInfo();

    const fetchPersonalPostings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/JobPostings`
        );
        setPostings(response.data);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };
    fetchPersonalPostings();
    
  }, []);


  // const updatePersonalJobPostings = (updateFn) => {
  //   setPersonalInfo((prev) => ({
  //     ...prev,
  //     jobPostings: updateFn(prev.jobPostings),
  //   }));
  // };

  // Handle input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setPersonalInfoChanged(true); // Show submit button
  };

  const handleFileChange = async (e, documentType) => {
    const file = e.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("category", documentType);
  
      try {
        const response = await axios.post(
          `http://localhost:8000/Users/${personalInfo._id}/documents`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
  
        const updatedResponse = await axios.get(
          `http://localhost:8000/Users/${localStorage.getItem("id")}`
        );
        setPersonalInfo(updatedResponse.data);
        alert(`${documentType} uploaded successfully!`);
      } catch (error) {
        console.error("Error uploading the file:", error);
        alert(`Error uploading ${documentType}`);
      }
    }
  };
  
  
  const showPdf = async (docType) => {
    const filteredDocuments = personalInfo.documents.filter(
      (doc) => doc.category === docType
    );

    try {
      const documentsPromises = filteredDocuments.map(async (doc) => {
        const response = await axios.get(
          `http://localhost:8000/Users/${personalInfo._id}/documents/${doc.id}`,
          { responseType: "blob" }
        );
        const fileUrl = URL.createObjectURL(response.data);
        return { category: doc.category, fileUrl };
      });
      const documentsWithUrls = await Promise.all(documentsPromises);
      setActiveDocument(documentsWithUrls);
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Error retrieving the document.");
    }
  };
  const closeDocuments = () => {
    setActiveDocument(null);
  };

  



  // Submit updated info
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(personalInfo);
      await axios.put(
        `http://localhost:8000/Users/${personalInfo._id}`,
        personalInfo
      );
      setPersonalInfoChanged(false); // Hide submit button after successful update
      alert("Information updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

    const navigate = useNavigate();
    const goToPostings = () => {
        navigate('/postings+applications', { replace: true});
    }
    const goToTemplate = () => {
        navigate('/templates', {replace: true});
    }

    return (
       <div id="myprofile">
            <div className="container" id="documents">
                <div className="documents-content">
                    <h2>Documents</h2>
                    <ul>
                        <li>
                            <span className="doc-type">Cover Letter</span>
                            <span className="count">{documentCounts["Cover Letter"] || 0}</span>
                            <button type="button" className="view-button" onClick={() => showPdf("Cover Letter")}>View</button>
                            <button type="button" className="add-button" onClick={()=> document.getElementById("file-upload-cov-letter").click()}>+</button>                            <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "Cover Letter")}
                  id={`file-upload-cov-letter`}
                />
                        </li>
                        <li>
                            <span className="doc-type">CV/Resume</span>
                            <span className="count">{documentCounts["CV"] || 0}</span>
                            <button type="button" className="view-button" onClick={() => showPdf("CV")}>View</button>
                            <button type="button" className="add-button" onClick={()=> document.getElementById("file-upload-cv").click()}>+</button>                            
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "CV")}
                  id={`file-upload-cv`}
                />
                        </li>
                        <li>
                            <span className="doc-type">Unofficial Transcript</span>
                            <span className="count">{documentCounts["Transcript"] || 0}</span>
                            <button type="button" className="view-button" onClick={() => showPdf("Transcript")}>View</button>
                            <button type="button" className="add-button" onClick={()=> document.getElementById("file-upload-transcript").click()}>+</button>                            
                            <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "Transcript")}
                  id={`file-upload-transcript`}
                />
                        </li>
                        <li>
                            <span className="doc-type">Recommandation Letter</span>
                            <span className="count">{documentCounts["Recommandation Letter"] || 0}</span>
                            <button type="button" className="view-button" onClick={() => showPdf("Recommandation Letter")}>View</button>
                            <button type="button" className="add-button" onClick={()=> document.getElementById("file-upload-rec-letter").click()}>+</button>
                                                        <input
                            
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "Recommandation Letter")}
                  id={`file-upload-rec-letter`}
                />
                        </li>
                        <li>
                            <span className="doc-type">Other</span>
                            <span className="count">{documentCounts["Others"] || 0}</span>
                            <button type="button" className="view-button" onClick={() => showPdf("Others")}>View</button>
                            <button type="button" className="add-button" onClick={()=> document.getElementById("file-upload-other").click()}>+</button>
                            <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "Others")}
                  id={`file-upload-other`}
                />
                        </li>
                        <li>
                            <span className="doc-type">Templates</span>
                            <button type="button" className="add-button" onClick={goToTemplate}>+</button>
                        </li>
                    </ul>
                </div>
            </div> 

      <div className="container" id="personal-info">
        <div className="types-personal-info">
          <h2>Personal Info</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="col">
              <label for="fname">First Name:</label>
              <input 
                className="exclude-style"
                type="text"
                name="fname"
                id="fname"
                value={personalInfo.fname}
                onChange={handlePersonalInfoChange}
              ></input>
            </div>
            <div className="col">
              <label for="lname">Last Name:</label>
              <input
                className="exclude-style"
                type="text"
                name="lname"
                id="lname"
                value={personalInfo.lname}
                onChange={handlePersonalInfoChange}
              ></input>
            </div>
            <div className="col">
              <label for="id">Student ID:</label>
              <input
                className="exclude-style"
                type="text"
                name="id"
                id="id"
                value={personalInfo.id}
                onChange={handlePersonalInfoChange}
              ></input>
            </div>
            <div className="col">
              <label for="email">Email:</label>
              <input
                className="exclude-style"
                type="text"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              ></input>
            </div>
            <div className="col">
              <label for="faculty">Faculty:</label>
              <input
                className="exclude-style"
                type="text"
                name="faculty"
                id="faculty"
                value={personalInfo.faculty}
                onChange={handlePersonalInfoChange}
              ></input>
            </div>
            {personalInfoChanged && 
            (
              <div className="submit-container">
                <input type="submit" value="Submit" className="personal-info-submit"/>
              </div>
            )}
          </form>
        </div>
      </div>

        <div className="container" id="applications">
          <div className="applications-content">
            <h2>Applications Status Board</h2>
            <ul>
                {personalInfo?.jobPostings?.map((jobPosting, index) => 
              <UserPosting
              key={index}
              jobPosting={jobPosting}
              postings={postings}
              updatePersonalInfo={fetchPersonalInfo} 
            />
                )}
            </ul>
            <button
              type="button"
              className="search-more-button"
              onClick={goToPostings}
            >
              Search More
            </button>
          </div>
        </div>
          {activeDocument?.length > 0 && (
            <>
            <div className="overlay">

                <DocumentPreview  documents={activeDocument} onDocumentClose={closeDocuments}></DocumentPreview>
            </div>
            </>
          )}
        </div>
  );
};

export default MyProfile;