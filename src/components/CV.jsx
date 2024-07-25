import React from 'react';
import { Container, Button, Box, Paper, Typography, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DocumentIcon from '@mui/icons-material/Article'; // Used Document Icon
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux'; // assuming you are using redux
import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance

const FileInput = styled('input')({
  display: 'none',
});

const CV = () => {
  const user = useSelector(state => state.userReducer.currentUser);

  const [hebrewFile, setHebrewFile] = React.useState(null);
  const [englishFile, setEnglishFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogSeverity, setDialogSeverity] = React.useState('success');
  const [viewFile, setViewFile] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState({
    hebrew: false,
    english: false,
  });

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
      setFileUploaded(prevState => ({ ...prevState, hebrew: false }));
    } else if (language === 'english') {
      setEnglishFile(file);
      setFileUploaded(prevState => ({ ...prevState, english: false }));
    }
  };

  const handleFileUpload = async (file, language) => {
    if (!file) return;

    const newFileName = `${user.userId}_${language}_${file.name}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    try {
      await FileAxios.uploadFile(renamedFile);
      setFileUploaded(prevState => ({ ...prevState, [language]: true }));
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

  const handleDeleteFile = (language) => {
    if (language === 'hebrew') {
      setHebrewFile(null);
      setFileUploaded(prevState => ({ ...prevState, hebrew: false }));
    } else if (language === 'english') {
      setEnglishFile(null);
      setFileUploaded(prevState => ({ ...prevState, english: false }));
    }
  };

  const handleViewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setViewFile(fileURL);
      setDialogTitle('File Preview');
      setDialogMessage(file.name);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewFile(null);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box marginRight={1}>
            <DescriptionIcon sx={{ color: 'rgb(244, 179, 76)' }} />
          </Box>
          <Typography variant="h6">העלאת קורות חיים</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="row" gap={2} sx={{ marginTop: 2 }}>
            <Box flexGrow={1}>
              <Button
                variant="contained"
                component="label"
                onClick={() => triggerFileInput('hebrew')}
                fullWidth
              >
                בחר קובץ בעברית
              </Button>
              {hebrewFile && !fileUploaded.hebrew && (
                <Box display="flex" alignItems="center" mt={1}>
                  <IconButton onClick={() => handleViewFile(hebrewFile)}>
                    <DocumentIcon color="primary" />
                  </IconButton>
                  <Typography variant="body2" sx={{ marginRight: 1 }}>
                    {hebrewFile.name}
                  </Typography>
                  <IconButton onClick={() => handleDeleteFile('hebrew')}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box flexGrow={1}>
              <Button
                variant="contained"
                component="label"
                onClick={() => triggerFileInput('english')}
                fullWidth
              >
                בחר קובץ באנגלית
              </Button>
              {englishFile && !fileUploaded.english && (
                <Box display="flex" alignItems="center" mt={1}>
                  <IconButton onClick={() => handleViewFile(englishFile)}>
                    <DocumentIcon color="primary" />
                  </IconButton>
                  <Typography variant="body2" sx={{ marginRight: 1 }}>
                    {englishFile.name}
                  </Typography>
                  <IconButton onClick={() => handleDeleteFile('english')}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          <Button type="submit" variant="contained" className="submit-button" disabled={loading} sx={{ marginTop: 2, width: '100%' }}>
            {loading ? <CircularProgress size={24} /> : 'העלה קבצים'}
          </Button>
        </form>
        <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff', display: 'flex', flexDirection: 'column' }}>
          <CircularProgress color="inherit" sx={{ width: '80px !important', height: '80px !important' }} />
        </Backdrop>
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xl">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            {viewFile ? (
              <iframe src={viewFile} width="100%" height="800px" title="File Preview" style={{ border: 'none' }} />
            ) : (
              <Typography variant="body2">
                {dialogMessage}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              סגור
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default CV;
