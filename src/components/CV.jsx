

// import { Box, Button, Container } from '@mui/material';
// import { styled } from '@mui/system';
// import '../App.css';
// import * as React from 'react';
// import { useSelector } from 'react-redux'; // assuming you are using redux
// import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance

// const FileInput = styled('input')({
//   display: 'none',
// });

// export const CV = () => {
//   const user = useSelector(state => state.userReducer.currentUser);

//   const [hebrewFile, setHebrewFile] = React.useState(null);
//   const [englishFile, setEnglishFile] = React.useState(null);

//   const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

//   const handleFileChange = (e, language) => {
//     const file = e.target.files[0];
//     if (file.size > MAX_FILE_SIZE) {
//       alert('ניתן להעלות קבצים עד 10MB בלבד.');
//       return;
//     }
//     if (language === 'hebrew') {
//       setHebrewFile(file);
//     } else if (language === 'english') {
//       setEnglishFile(file);
//     }
//   };

//   const handleFileUpload = async (file, language) => {
//     if (!file) return;

//     const newFileName = `${user.userId}_${language}_${file.name}`;
//     const renamedFile = new File([file], newFileName, { type: file.type });

//     try {
//       const response = await FileAxios.uploadFile(renamedFile);
//       alert(`File uploaded successfully: ${response}`);
//     } catch (error) {
//       alert('Error uploading file');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!hebrewFile && !englishFile) {
//       alert('יש להעלות קובץ אחד לפחות.');
//       return;
//     }

//     if (hebrewFile) {
//       await handleFileUpload(hebrewFile, 'hebrew');
//     }
//     if (englishFile) {
//       await handleFileUpload(englishFile, 'english');
//     }

//     setHebrewFile(null);
//     setEnglishFile(null);
//   };

//   const triggerFileInput = (language) => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = '.pdf, .docx';
//     fileInput.style.display = 'none';
//     document.body.appendChild(fileInput);

//     fileInput.addEventListener('change', (e) => {
//       handleFileChange(e, language);
//       document.body.removeChild(fileInput);
//     });

//     fileInput.click();
//   };

//   const handleViewFile = (file) => {
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       window.open(fileURL, '_blank');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container"></div>
//         <div className="input-container">
//           <br></br>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <Box display="flex" gap={2} alignItems="center">
//               <Button
//                 variant="contained"
//                 component="label"
//                 onClick={() => triggerFileInput('hebrew')}
//               >
//                 בחר קובץ בעברית
//               </Button>
//               {hebrewFile && (
//                 <>
//                   <span>{hebrewFile.name}</span>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleViewFile(hebrewFile)}
//                   >
//                     הצג קובץ
//                   </Button>
//                 </>
//               )}
//             </Box>
//             <Box display="flex" gap={2} alignItems="center">
//               <Button
//                 variant="contained"
//                 component="label"
//                 onClick={() => triggerFileInput('english')}
//               >
//                 בחר קובץ באנגלית
//               </Button>
//               {englishFile && (
//                 <>
//                   <span>{englishFile.name}</span>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleViewFile(englishFile)}
//                   >
//                     הצג קובץ
//                   </Button>
//                 </>
//               )}
//             </Box>
//             <Button type="submit" variant="contained" className="submit-button">
//               העלה קבצים
//             </Button>
//           </Box>
//         </div>
//       </form>
//     </Container>
//   );
// };

// export default CV;

// import { Box, Button, Container, Snackbar, Alert, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop, IconButton } from '@mui/material';
// import { styled } from '@mui/system';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import * as React from 'react';
// import { useSelector } from 'react-redux'; // assuming you are using redux
// import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance

// const FileInput = styled('input')({
//   display: 'none',
// });

// export const CV = () => {
//   const user = useSelector(state => state.userReducer.currentUser);

//   const [hebrewFile, setHebrewFile] = React.useState(null);
//   const [englishFile, setEnglishFile] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const [dialogOpen, setDialogOpen] = React.useState(false);
//   const [dialogMessage, setDialogMessage] = React.useState('');
//   const [dialogTitle, setDialogTitle] = React.useState('');
//   const [dialogSeverity, setDialogSeverity] = React.useState('success');
//   const [viewFile, setViewFile] = React.useState(null);

//   const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

//   const handleFileChange = (e, language) => {
//     const file = e.target.files[0];
//     if (file.size > MAX_FILE_SIZE) {
//       setDialogTitle('Error');
//       setDialogMessage('ניתן להעלות קבצים עד 10MB בלבד.');
//       setDialogSeverity('error');
//       setDialogOpen(true);
//       return;
//     }
//     if (language === 'hebrew') {
//       setHebrewFile(file);
//     } else if (language === 'english') {
//       setEnglishFile(file);
//     }
//   };

//   const handleFileUpload = async (file, language) => {
//     if (!file) return;

//     const newFileName = `${user.userId}_${language}_${file.name}`;
//     const renamedFile = new File([file], newFileName, { type: file.type });

//     try {
//       await FileAxios.uploadFile(renamedFile);
//     } catch (error) {
//       setDialogTitle('Error');
//       setDialogMessage('Error uploading file');
//       setDialogSeverity('error');
//       setDialogOpen(true);
//       throw error; // Re-throw error after handling it
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!hebrewFile && !englishFile) {
//       setDialogTitle('Error');
//       setDialogMessage('יש להעלות קובץ אחד לפחות.');
//       setDialogSeverity('error');
//       setDialogOpen(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       if (hebrewFile) {
//         await handleFileUpload(hebrewFile, 'hebrew');
//       }
//       if (englishFile) {
//         await handleFileUpload(englishFile, 'english');
//       }

//       setDialogTitle('Success');
//       setDialogMessage('הקבצים הועלו בהצלחה: ' + 
//         (hebrewFile ? hebrewFile.name : '') + 
//         (hebrewFile && englishFile ? ', ' : '') + 
//         (englishFile ? englishFile.name : ''));
//       setDialogSeverity('success');
//       setDialogOpen(true);
//       setHebrewFile(null);
//       setEnglishFile(null);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const triggerFileInput = (language) => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = '.pdf, .docx';
//     fileInput.style.display = 'none';
//     document.body.appendChild(fileInput);

//     fileInput.addEventListener('change', (e) => {
//       handleFileChange(e, language);
//       document.body.removeChild(fileInput);
//     });

//     fileInput.click();
//   };

//   const handleViewFile = (file) => {
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setViewFile(fileURL);
//       setDialogTitle('File Preview');
//       setDialogMessage(file.name);
//       setDialogOpen(true);
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setViewFile(null);
//   };

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container"></div>
//         <div className="input-container">
//           <br></br>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <Box display="flex" gap={2} alignItems="center">
//               <Button
//                 variant="contained"
//                 component="label"
//                 onClick={() => triggerFileInput('hebrew')}
//               >
//                 בחר קובץ בעברית
//               </Button>
//               {hebrewFile && (
//                 <>
//                   <IconButton onClick={() => handleViewFile(hebrewFile)}>
//                     <CheckCircleIcon color="success" />
//                   </IconButton>
//                   <Typography variant="body2">{hebrewFile.name}</Typography>
//                 </>
//               )}
//             </Box>
//             <Box display="flex" gap={2} alignItems="center">
//               <Button
//                 variant="contained"
//                 component="label"
//                 onClick={() => triggerFileInput('english')}
//               >
//                 בחר קובץ באנגלית
//               </Button>
//               {englishFile && (
//                 <>
//                   <IconButton onClick={() => handleViewFile(englishFile)}>
//                     <CheckCircleIcon color="success" />
//                   </IconButton>
//                   <Typography variant="body2">{englishFile.name}</Typography>
//                 </>
//               )}
//             </Box>
//             <Button type="submit" variant="contained" className="submit-button" disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : 'העלה קבצים'}
//             </Button>
//           </Box>
//         </div>
//       </form>
//       <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff', display: 'flex', flexDirection: 'column' }}>
//         <CircularProgress color="inherit" sx={{ width: '80px !important', height: '80px !important' }} />
//       </Backdrop>
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <Typography variant="body2">
//             {viewFile ? <iframe src={viewFile} width="100%" height="400px" /> : dialogMessage}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             סגור
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default CV;

import { Box, Button, Container, Snackbar, Alert, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import Downloading from '@mui/icons-material/Downloading';
import * as React from 'react';
import { useSelector } from 'react-redux'; // assuming you are using redux
import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance

const FileInput = styled('input')({
  display: 'none',
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

    const newFileName = `${user.userId}_${language}_${file.name}`;
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
        <div className="input-container"></div>
        <div className="input-container">
          <br></br>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" gap={2} alignItems="center">
              <Button
                variant="contained"
                component="label"
                onClick={() => triggerFileInput('hebrew')}
              >
                בחר קובץ בעברית
              </Button>
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
            <Box display="flex" gap={2} alignItems="center">
              <Button
                variant="contained"
                component="label"
                onClick={() => triggerFileInput('english')}
              >
                בחר קובץ באנגלית
              </Button>
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
              {loading ? <CircularProgress size={24} /> : 'העלה קבצים'}
            </Button>
          </Box>
        </div>
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
          <Button onClick={handleCloseDialog} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CV;

