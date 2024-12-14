import { useState } from 'react';
import { Page, Document } from 'react-pdf';

const DocumentPreview = ({documents, onDocumentClose} ) => {
    

    const [numPages, setNumPages] = useState(null);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages); 
      };

    return(
        <div className="pdf-viewer">
            <div className='close-button-container'>
                <button className="close-button" onClick={onDocumentClose}>
        X
      </button>

            </div>
          <div className="documents-container">
            {documents.map((doc, index) => (
              <div key={index} className="pdf-container">
                <h4>{doc.category}</h4>

                <Document
                  file={doc.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={numPages} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
              </div>
            ))}
          </div>
        </div>
      )
}
export default DocumentPreview;
