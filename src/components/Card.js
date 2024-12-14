import React from "react";
import "../styles/Card.css";

// Card component for displaying each document as background image
const Card = ({ docName, docImageUrl, docxFileUrl, pdfFileUrl }) => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${docImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card-content">
        <h3>{docName}</h3>
        <div className="download-options">
          {/* Download DOCX */}
          <a href={docxFileUrl} download className="download-button">
            Download DOCX
          </a>
          {/* Download PDF */}
          <a href={pdfFileUrl} download className="download-button">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
