import React, { useState } from "react";
import "../styles/FilterWindowJobs.css";

const FilterWindowJobs = ({ onFilterSubmit, setIsActive }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(formData); // Send form data to the parent component (Postings)
    setIsActive(false);
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
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            name="keywords"
            placeholder="Keywords"
            value={formData.keywords}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group term">
          <label>Starting Term:</label>
          <div className="el select-column">
            <select
              name="term"
              value={formData.term}
              onChange={handleInputChange}
            >
              <option value="">-Term-</option>
              <option value="Winter">Winter</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
            </select>
          </div>
        </div>

        <div className="form-group duration">
          <label>Duration:</label>
          <div className="el checkbox-row">
            {["4-month", "6-month", "12-month"].map((duration) => (
              <label key={duration}>
                <input
                  type="checkbox"
                  name="duration"
                  value={duration}
                  onChange={handleInputChange}
                />
                {duration}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group location">
          <label style={{ alignItems: "unset" }}>Location:</label>
          <div className="el select-column">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="">-Country-</option>
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            >
              <option value="">-Province/State-</option>
              <option value="Quebec">Quebec</option>
              <option value="Ontario">Ontario</option>
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="">-City-</option>
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
            </select>
          </div>
        </div>

        <div className="form-group format">
          <label>Format:</label>
          <div className="el checkbox-row">
            {["hybrid", "remote", "online"].map((format) => (
              <label key={format}>
                <input
                  type="checkbox"
                  name="format"
                  value={format}
                  onChange={handleInputChange}
                />
                {format}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group type">
          <label>Type:</label>
          <div className="el checkbox-row">
            {["full-time", "part-time", "contract"].map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  name="type"
                  value={type}
                  onChange={handleInputChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* <div className="form-group features">
          <label>Features:</label>
          <div className="el checkbox-row">
            {["Starred", "Hidden"].map((feature) => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
          </div>
        </div> */}

        <div className="form-group language">
          <label>Language:</label>
          <div className="el checkbox-row">
            {["english", "french"].map((lang) => (
              <label key={lang}>
                <input
                  type="checkbox"
                  name="language"
                  value={lang}
                  onChange={handleInputChange}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterWindowJobs;
