// src/components/YourComponent.js
import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import PdfDocument from './PdfDocument';

const YourComponent = () => {
  const [showPdf, setShowPdf] = useState(false);

  const handlePrintClick = () => {
    setShowPdf(true);
  };

  const handleClosePdf = () => {
    setShowPdf(false);
  };

  return (
    <div>
      <button onClick={handlePrintClick}>Print</button>
      {showPdf && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: 'white',
              padding: '10px',
            }}
          >
            <button onClick={handleClosePdf} style={{ marginBottom: '10px' }}>
              Close
            </button>
            <PDFViewer width="100%" height="90%">
              <PdfDocument />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
