import React, { useState } from 'react';
import FileAxios from '../axios/fileAxios';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Download as DownloadIcon, Visibility as ViewIcon } from '@mui/icons-material';

export const FileUploadComponent = ({ userID }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const newFileName = `${userID}_${selectedFile.name}`;
    const renamedFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
    });

    try {
      const response = await FileAxios.uploadFile(renamedFile);
      alert(`File uploaded successfully: ${response}`);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const handleDownload = async () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    try {
      const response = await FileAxios.downloadFile(fileName);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error downloading file');
    }
  };

  const handleDelete = async () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    try {
      await FileAxios.deleteFile(fileName);
      alert('File deleted successfully');
    } catch (error) {
      alert('Error deleting file');
    }
  };

  const handleView = async () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    try {
      const response = await FileAxios.viewFile(fileName);
      const url = window.URL.createObjectURL(new Blob([response]));
      const newWindow = window.open(url, '_blank');
      const link = newWindow.document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      link.style.position = 'absolute';
      link.style.top = '10px';
      link.style.left = '10px';
      link.innerHTML = '<DownloadIcon />';
      newWindow.document.body.appendChild(link);
    } catch (error) {
      alert('Error viewing file');
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6">Upload Resume</Typography>
      <Button
        variant="contained"
        component="label"
      >
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
      >
        Upload File
      </Button>
      <TextField
        label="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownload}
        startIcon={<DownloadIcon />}
      >
        Download File
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleView}
        startIcon={<ViewIcon />}
      >
        View File
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
      >
        Delete File
      </Button>
    </Box>
  );
};
