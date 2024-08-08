import React, { useEffect } from 'react';
import { Box, Button, Container, Snackbar, Alert, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import Downloading from '@mui/icons-material/Downloading';
import { useDispatch, useSelector } from 'react-redux'; // assuming you are using redux
import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance
import CandidateAxios from '../axios/candidateAxios';
import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';

const FileInput = styled('input')({
  display: 'none',
});

const UploadButton = styled(Button)({
  flex: '1 1 auto',
  maxWidth: '45%',
  padding: '15px',
  fontSize: '16px',
});

export const CV = () => {
  const user = useSelector(state => state.userReducer.currentUser);

  const [hebrewFile, setHebrewFile] = React.useState(null);
  const [englishFile, setEnglishFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogSeverity, setDialogSeverity] = React.useState('success');
  const [viewFile, setViewFile] = React.useState(null);
  const [fileUrl, setFileUrl] = React.useState(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e, language) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      setDialogTitle('Error');
      setDialogMessage('ניתן להעלות קבצים עד 10MB בלבד.');
      setDialogSeverity('error');
      setDialogOpen(true);
      return;
    }
    if (language === 'hebrew') {
      setHebrewFile(file);
    } else if (language === 'english') {
      setEnglishFile(file);
    }
  };

  const handleFileUpload = async (file, language) => {
    if (!file) return;

    const newFileName = `${user.id}_${language}_${file.name}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    try {
      await FileAxios.uploadFile(renamedFile);
    } catch (error) {
      setDialogTitle('Error');
      setDialogMessage('Error uploading file');
      setDialogSeverity('error');
      setDialogOpen(true);
      throw error; // Re-throw error after handling it
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hebrewFile && !englishFile) {
      setDialogTitle('Error');
      setDialogMessage('יש להעלות קובץ אחד לפחות.');
      setDialogSeverity('error');
      setDialogOpen(true);
      return;
    }

    setLoading(true);
    try {
      if (hebrewFile) {
        await handleFileUpload(hebrewFile, 'hebrew');
      }
      if (englishFile) {
        await handleFileUpload(englishFile, 'english');
      }

      setDialogTitle('Success');
      setDialogMessage('הקבצים הועלו בהצלחה: ' +
        (hebrewFile ? hebrewFile.name : '') +
        (hebrewFile && englishFile ? ', ' : '') +
        (englishFile ? englishFile.name : ''));
      setDialogSeverity('success');
      setDialogOpen(true);
      user.cvHebrewFile = hebrewFile;
      user.cvEnglishFile = englishFile;
      setHebrewFile(null);
      setEnglishFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  const handleViewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
      setViewFile(file);
      setDialogTitle('File Preview');
      setDialogOpen(true);
    }
  };

  const handleDownload = () => {
    if (viewFile) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = viewFile.name;
      link.click();
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewFile(null);
    setFileUrl(null);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Box display="flex" gap={2} alignItems="center" justifyContent="center" width="100%">
            <UploadButton
              variant="contained"
              component="label"
              onClick={() => triggerFileInput('hebrew')}
            >
              בחר קובץ בעברית
            </UploadButton>
            {hebrewFile && (
              <>
                <Tooltip title="צפייה בקורות חיים">
                  <IconButton onClick={() => handleViewFile(hebrewFile)} color="primary">
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">{hebrewFile.name}</Typography>
              </>
            )}
          </Box>
          <Box display="flex" gap={2} alignItems="center" justifyContent="center" width="100%">
            <UploadButton
              variant="contained"
              component="label"
              onClick={() => triggerFileInput('english')}
            >
              בחר קובץ באנגלית
            </UploadButton>
            {englishFile && (
              <>
                <Tooltip title="צפייה בקורות חיים">
                  <IconButton onClick={() => handleViewFile(englishFile)} color="primary">
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">{englishFile.name}</Typography>
              </>
            )}
          </Box>
          <Button type="submit" variant="contained" className="submit-button" disabled={loading}>
            {loading ? 'טוען...' : 'העלה קבצים'}
          </Button>
        </Box>
      </form>
      <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <CircularProgress color="inherit" sx={{ width: '80px !important', height: '80px !important' }} />
      </Backdrop>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {fileUrl && (
            <Box position="relative">
              <iframe
                src={fileUrl}
                style={{ width: '100%', height: '80vh', border: 'none' }}
                title="File Preview"
              />
              <IconButton
                variant="contained"
                onClick={handleDownload}
                style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <Downloading />
              </IconButton>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>סגור</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={dialogOpen && !fileUrl} autoHideDuration={6000} onClose={handleCloseDialog}>
        <Alert onClose={handleCloseDialog} severity={dialogSeverity}>
          {dialogMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CV;
