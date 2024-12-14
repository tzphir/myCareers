import React from "react";
import Card from "../components/Card";

// Documents taken from source: https://create.microsoft.com/en-us/templates/resumes
const docs = [
  { 
    name: "Template 1", 
    imageUrl: "/docs/img/t1.png", 
    docxUrl: "/docs/docx/t1.docx",
    pdfUrl: "/docs/pdf/t1.pdf"
  },
  { 
    name: "Template 2", 
    imageUrl: '/docs/img/t2.png', 
    docxUrl: "/docs/docx/t2.docx",
    pdfUrl: "/docs/pdf/t2.pdf"
  },
  { 
    name: "Template 3", 
    imageUrl: '/docs/img/t3.png', 
    docxUrl: "/docs/docx/t3.docx",
    pdfUrl: "/docs/pdf/t3.pdf"
  },
];

const CardsPage = () => {
  return (
    <div className="cards-container">
      {docs.map((doc, index) => (
        <Card
          key={index}
          docName={doc.name}
          docImageUrl={doc.imageUrl}
          docxFileUrl={doc.docxUrl}
          pdfFileUrl={doc.pdfUrl}
        />
      ))}
    </div>
  );
};

export default CardsPage;
