import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import '../App.css';
import * as React from 'react';

const FileInput = styled('input')({
  display: 'none',
});

export const CV = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState(false);

  const handleFileChange = (e, language) => {
    setSelectedFile(e.target.files[0]);
    setFileUploaded(true);
    handleFileUpload(language, e.target.files[0]);
  };

  const handleFileUpload = (language, file) => {
    // Your existing file upload logic here
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
    setSelectedFile(null);
    setFileUploaded(false);
  };

  const triggerFileInput = (language) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf, .docx';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    fileInput.addEventListener('change', (e) => {
      handleFileChange(e, language);
      document.body.removeChild(fileInput);
    });

    fileInput.click();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <div className="input-container"></div>
        <div className="input-container">
          <br></br>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                component="label"
                className="language-button"
                onClick={() => triggerFileInput('english')}
              >
                אנגלית
              </Button>
              <Button
                variant="contained"
                component="label"
                className="language-button"
                onClick={() => triggerFileInput('hebrew')}
              >
                עברית
              </Button>
            </Box>
            <br></br>
            <Button type="submit" variant="contained" className="submit-button">
              אישור
            </Button>
          </Box>
        </div>
      </form>
    </Container>
  );
};

export default CV;
