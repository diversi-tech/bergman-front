
import React from 'react';
import Button from '@mui/material/Button';


// const DocumentDownloader = ({ documentId }) => {
//   const handleDownload = () => {
//     fetch(`/api/documents/${documentId}/download`, {
//       method: 'GET',
//     })
//     .then(response => response.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(new Blob([blob]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'document.pdf'); // שם הקובץ המורד
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch(error => console.error('Error downloading document:', error));
//   };

//   return (
//     <button onClick={handleDownload}>הורד מסמך</button>
//   );
// };

// export default DocumentDownloader;


const DownloadButton = () => {
  return (
    <a href="/מסכים לפרויקט.pdf" download="example.pdf">
      <Button variant="contained" color="primary">
      להורדת קורות חיים</Button>
    </a>
  );
};

export default DownloadButton;