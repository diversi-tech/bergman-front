
import React from 'react';

const DocumentDownloader = ({ documentId }) => {
  const handleDownload = () => {
    fetch(`/api/documents/${documentId}/download`, {
      method: 'GET',
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf'); // שם הקובץ המורד
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => console.error('Error downloading document:', error));
  };

  return (
    <button onClick={handleDownload}>הורד מסמך</button>
  );
};

export default DocumentDownloader;