import React, { useState } from "react";
import "../styles/FilterWindow.css";


function FilterWindow ({ handleFilteringEvents, setIsActive  }) { 
    const [formData, setFormData] = useState({
        keywords: "",
        title: "",
        startDate: "",
        endDate: "",
        category: "", 
        registered: "", 
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
          setFormData((prev) => ({
            ...prev,
            [name]: checked,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    handleFilteringEvents(formData); //passes form data so it can be applied to Events 
    setIsActive(false); //makes form dissapear after submitting 
  };

  return (
    <div className="filter-container">
      <button 
       className="x-button"
       onClick={() => setIsActive(false)}
       >
        <span>x</span>
      </button>
      <h2>Filter</h2>
      <h3>Job Specifications</h3>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <input 
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group date-filter">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">-all Categories -</option>
            <option value="Job Search">Job Search</option>
            <option value="Companies">Companies</option>
            <option value="Activities">Activities</option>
          </select>
        </div>

        {/* <div className="form-group">
          <label>Registered:</label>
          <div className="checkbox-row">
            <input
                type="radio"
                name="registered"
                value= "Yes"
                checked={formData.registered === "Yes"}
                onChange={handleInputChange}
            />
            <label>Yes</label>
            <input
                type="radio"
                name="registered"
                value = "No"
                checked={formData.registered === "No"}
                onChange={handleInputChange}
            />
             <label>No</label>
          </div>
        </div> */}
        <button type="submit">Search</button> 
      </form>
    </div>
  );
};
export default FilterWindow;