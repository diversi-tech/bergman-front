import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
const CombinedForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false); // New state to track if a file is uploaded
  const handleFileChange = (e, language) => {
    setSelectedFile(e.target.files[0]);
    setFileUploaded(true); // Update state to indicate a file has been uploaded
    handleFileUpload(language, e.target.files[0]);
  };
  const handleFileUpload = (language, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = `http://example.com/upload?language=${language}`;
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
      // Handle response after file upload
    }).catch(error => {
      console.error('Error uploading file: ', error);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileUploaded) {
      alert('יש להעלות קובץ אחד לפחות.');
      return;
    }
    // Handle form submission with user input
    // Assume default language as 'hebrew' for example purpose
    if (selectedFile) {
      handleFileUpload('hebrew', selectedFile);
    }
    // Reset the form fields after submission
    setName('');
    setEmail('');
    setPhone('');
    setSelectedFile(null);
    setFileUploaded(false); // Reset the file uploaded state
  };
  const triggerFileInput = (language) => {
    const fileInput = document.getElementById('hiddenFileInput');
    fileInput.click();
    fileInput.onchange = (e) => handleFileChange(e, language);
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>שם</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>מייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>טלפון</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>בחר שפה:</label>
          <button
            type="button"
            className="language-button"
            onClick={() => triggerFileInput('english')}
          >
            אנגלית
          </button>
          <button
            type="button"
            className="language-button"
            onClick={() => triggerFileInput('hebrew')}
          >
            עברית
          </button>
          <input
            type="file"
            id="hiddenFileInput"
            style={{ display: 'none' }}
            accept=".pdf, .docx"
          />
        </div>
        <button type="submit" className="submit-button">
          אישור
        </button>
      </form>
    </div>
  );
};
export default CombinedForm;