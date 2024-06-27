import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import '../App.css';
const FileInput = styled('input')({
  display: 'none',
});
export const CombinedForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const handleFileChange = (e, language) => {
    setSelectedFile(e.target.files[0]);
    setFileUploaded(true);
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
    if (selectedFile) {
      handleFileUpload('hebrew', selectedFile);
    }
    setName('');
    setEmail('');
    setPhone('');
    setSelectedFile(null);
    setFileUploaded(false);
  };
  const triggerFileInput = (language) => {
    const fileInput = document.getElementById('hiddenFileInput');
    fileInput.click();
    fileInput.onchange = (e) => handleFileChange(e, language);
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <Typography variant="h6">שם</Typography>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="input-container">
          <Typography variant="h6">מייל</Typography>
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="input-container">
          <Typography variant="h6">טלפון</Typography>
          <TextField
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="input-container">
          <Typography variant="h6">בחר שפה:</Typography>
          <Button
            variant="contained"
            component="label"
            className="language-button"
            onClick={() => triggerFileInput('english')}
          >
            אנגלית
            <FileInput
              type="file"
              id="hiddenFileInput"
              accept=".pdf, .docx"
              onChange={(e) => handleFileChange(e, 'english')}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            className="language-button"
            onClick={() => triggerFileInput('hebrew')}
          >
            עברית
            <FileInput
              type="file"
              id="hiddenFileInput"
              accept=".pdf, .docx"
              onChange={(e) => handleFileChange(e, 'hebrew')}
            />
          </Button>
        </div>
        <Button type="submit" variant="contained" className="submit-button">
          אישור
        </Button>
      </form>
    </Container>
  );
};
export default CombinedForm;