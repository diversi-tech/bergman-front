// import React, { useEffect, useState } from 'react';
// import {
//   Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Autocomplete
// } from '@mui/material'
// import HistoryIcon from '@mui/icons-material/History';
// import { useDispatch, useSelector } from "react-redux";
// import CandidateProfilesAxios from '../axios/candidateProfileAxios';
// import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';
// import UserAxios from "../axios/userAxios";
// import { FillUsersData } from "../redux/action/userAction";
// import OptionsAxios from "../axios/optionsAxios";
// import { FillOptionData } from "../redux/action/optionsAction";
// import { FillEnumData } from "../redux/action/enumActions";
// import EnumsAxios from "../axios/enumAxios";
// import UserOptionsAxios from "../axios/userOptionsAxios";
// import { FillUsersOptionsData } from "../redux/action/userOptionsAction";
// import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
// import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from 'stylis';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import ReferralsAxios from '../axios/referralsAxios';
// import { FillReferralsData } from '../redux/action/referralsAction';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import FileAxios from '../axios/fileAxios';
// import { Downloading } from '@mui/icons-material';

// const theme =
//   createTheme({
//     direction: 'rtl',
//     palette: {
//       mode: 'light',
//     },
//   });

// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// export const Filter = ({ onClose, candidate }) => {
//   const navigate = useNavigate();
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] = useState([]);
//   const [selectedTechnologies, setSelectedTechnologies] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [checkedCandidates, setCheckedCandidates] = useState({});
//   const [candidatesFromServer, setCandidatesFromServer] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [enums, setEnums] = useState([]);
//   const [userOptions, setUserOptions] = useState([]);
//   const [referrals, setReferrals] = useState([]);
//   const [currentCandidate, setCurrentCandidate] = useState({})
//   const [openEdit, setOpenEdit] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [open, setOpen] = useState(false);
//   const [fileUrl, setFileUrl] = useState('');



//   const dispatch = useDispatch();
//   const candidateProfiles = useSelector(state => state.listCandidateProfile);
//   const users1 = useSelector(state => state.listUsers);
//   const options1 = useSelector(state => state.listOptions);
//   const enums1 = useSelector(state => state.listEnums);
//   const userOptions1 = useSelector(state => state.listUserUserOptions);
//   const referrals1 = useSelector(state => state.referrals);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         debugger
//         if (candidateProfiles > 0) {
//           setCandidatesFromServer(candidateProfiles);
//         } else {
//           const response = await CandidateProfilesAxios.getAllCandidateProfiles();
//           setCandidatesFromServer(response);
//           dispatch(FillCavdidateProfileData(response.data));
//         }
//         if (users1 > 0) {
//           setUsers(users1);
//         } else {
//           const response = await UserAxios.getAllUsers();
//           setUsers(response);
//           dispatch(FillUsersData(response.data));
//         }
//         if (options1 > 0) {
//           setOptions(options1);
//         } else {
//           const response = await OptionsAxios.getAllOptions();
//           setOptions(response);
//           dispatch(FillOptionData(response.data));
//         }
//         if (enums1 > 0) {
//           setEnums(enums1);
//         } else {
//           const response = await EnumsAxios.getAllEnums();
//           setEnums(response);
//           dispatch(FillEnumData(response.data));
//         }
//         if (userOptions1 > 0) {
//           setUserOptions(userOptions1);
//         } else {
//           const response = await UserOptionsAxios.getAllUserOptions();
//           setUserOptions(response);
//           dispatch(FillUsersOptionsData(response.data));
//         }
//         if (referrals1 > 0) {
//           setUserOptions(referrals1);
//         } else {
//           const response = await ReferralsAxios.getAllReferrals();
//           setReferrals(response);
//           dispatch(FillReferralsData(response.data));
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//     fetchData();
//   }, [dispatch, candidateProfiles, users1, options1, enums1, userOptions1, referrals1]);

//   useEffect(() => {

//     setFilteredCandidates(candidatesFromServer);
//   }, [filteredCandidates]);

//   useEffect(() => {
//     if (open) {
//       setCurrentCandidate(candidatesFromServer);
//     }
//   }, [open, candidate]);

//   const handleEditOpen = (candidate) => {
//     const candidateEmail = users.find(u => u.userId === candidate.userId)?.email || '';
//     const referral = referrals.find(r => r.candidateId === candidate.candidateId) || {};

//     setCurrentCandidate({
//       ...candidate,
//       email: candidateEmail,
//       referralSource: referral.referralSource || '',
//       referralDate: referral.referralDate ? formatDateTime(referral.referralDate) : '',
//       remarks: referral.remarks || '',
//       country: candidate.country || '',
//       city: candidate.city || '',
//       address: candidate.address || '',
//       experience: candidate.experience || '',
//       summary: candidate.summary || '',
//       education: candidate.education || '',
//       certifications: candidate.certifications || '',
//       skills: candidate.skills || '',
//       githubProfile: candidate.githubProfile || '',
//       linkedinProfile: candidate.linkedinProfile || '',
//     });
//     setOpenEdit(true);
//   };

//   const handleEditClose = () => {
//     setOpenEdit(false)
//   };


//   const handleEditChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'referralDate') {
//       setCurrentCandidate((prevCandidate) => ({
//         ...prevCandidate,
//         [name]: formatDateTime(value),
//       }));
//     } else {
//       setCurrentCandidate((prevCandidate) => ({
//         ...prevCandidate,
//         [name]: value,
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     try {
//       // dispatch(FillCavdidateProfileData(response.data));

//       await CandidateProfilesAxios.updateCandidateProfile(currentCandidate.candidateId, currentCandidate);
//       setOpenEdit(false)
//       const candidate1 = await CandidateProfilesAxios.getAllCandidateProfiles()
//       setCandidatesFromServer(candidate1);
//       dispatch(FillCavdidateProfileData(candidate1.data))
//       alert(`השינויים עבור ${currentCandidate.firstName} ${currentCandidate.lastName} נשמרו בהצלחה`); // הצגת הודעה שהשינויים נשמרו
//       setSnackbarOpen(true)
//     } catch (error) {
//       console.error('Error updating candidate:', error);
//     }
//   };

//   // const handleSnackbarClose = () => {
//   //   setSnackbarOpen(false);
//   // };

//   const copyTextToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       console.log('Text copied to clipboard:', text);
//     } catch (err) {
//       console.error('Failed to copy text', err);
//     }
//   };

//   const handleCopyEmails = async () => {
//     const emailsToCopy = selectedCandidates.map(candidate => candidate.email);
//     if (emailsToCopy.length > 0) {
//       for (const email of emailsToCopy) {
//         await copyTextToClipboard(email);
//         await new Promise(resolve => setTimeout(resolve, 500));
//       }
//       alert('Emails copied successfully');
//     } else {
//       alert("No emails to copy");
//     }
//   };

//   const handleClearEmails = () => {
//     setSelectedCandidates([]);
//     setCheckedCandidates({});
//     alert('Email selection cleared');
//   };

//   // פונקציה לעדכון תאריך לפורמט הנדרש
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
//   };

//   const handleFilterCandidates = () => {
//     const filterByType = (type, selectedValues) => {
//       if (selectedValues.length === 0) return candidatesFromServer.map(c => c.candidateId);

//       const enumItem = enums.find(e => e.enumType === type);
//       const optionsByType = options.filter(o => o.enumId === enumItem.enumId);
//       const optionsIds = selectedValues.map(value => {
//         const option = optionsByType.find(o => o.optionsValue === value);
//         return option ? option.optionsId : null;
//       }).filter(id => id !== null);

//       return candidatesFromServer.filter(candidate => {
//         return optionsIds.every(optionsId =>
//           userOptions.some(userOption =>
//             userOption.candidateId === candidate.candidateId && userOption.optionsId === optionsId
//           )
//         );
//       }).map(c => c.candidateId);
//     };

//     const languageCandidates = filterByType("Languages", selectedLanguages);
//     const techCandidates = filterByType("Technologies", selectedTechnologies);
//     const locationCandidates = filterByType("City", selectedLocations);
//     const programmingLangCandidates = filterByType("Programming Languages", selectedProgrammingLanguages);

//     const finalCandidates = candidatesFromServer.filter(candidate =>
//       languageCandidates.includes(candidate.candidateId) &&
//       techCandidates.includes(candidate.candidateId) &&
//       locationCandidates.includes(candidate.candidateId) &&
//       programmingLangCandidates.includes(candidate.candidateId)
//     );

//     setFilteredCandidates(finalCandidates);
//   };
//   const handleView = async (fileName) => {
//     debugger
//     if (!fileName) {
//       alert('Please enter a file name.');
//       return;
//     }

//     try {
//       setFileName(fileName)
//       const response = await FileAxios.getFileUrl(fileName);
//       setFileUrl(response);
//       setOpen(true);
//     } catch (error) {
//       alert('Error viewing file');
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setFileUrl('');
//   };

//   const handleDownload = async () => {
//     debugger
//     if (!fileName) {
//       alert('Please enter a file name to download.');
//       return;
//     }

//     try {
//       const response = await FileAxios.downloadFile(fileName);
//       const url = window.URL.createObjectURL(new Blob([response]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       alert('Error downloading file');
//     }
//   };


//   const handleChange = (type, value) => {
//     if (type === "Languages") {
//       setSelectedLanguages(value);
//     } else if (type === "Technologies") {
//       setSelectedTechnologies(value);
//     } else if (type === "City") {
//       setSelectedLocations(value);
//     } else if (type === "Programming Languages") {
//       setSelectedProgrammingLanguages(value);
//     }
//   };

//   const renderAutocomplete = (enumItem) => {
//     const enumId = enumItem.enumId;
//     const enumType = enumItem.enumType;
//     const filteredOptions = options.filter(option => option.enumId === enumId).map(option => option.optionsValue);

//     return (
//       <Grid item xs={12} sm={6} md={3} lg={2} key={enumId} style={{ margin: '5px', marginTop: '50px' }}>
//         <CacheProvider value={cacheRtl}>
//           <ThemeProvider theme={theme}>
//             <div dir="rtl">
//               <Autocomplete
//                 multiple
//                 id={enumType}
//                 options={filteredOptions}
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option}
//                 renderOption={(props, option, { selected }) => (
//                   <li {...props} key={option}>
//                     {option}
//                   </li>
//                 )}
//                 onChange={(event, value) => handleChange(enumType, value)}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={enumType}
//                     inputProps={{ ...params.inputProps, readOnly: true }}
//                     style={{ margin: '0px 0px', width: '100%', backgroundColor: '#fff' }} // רקע לבן
//                   />
//                 )}
//                 popupIcon={<ArrowDropDownIcon style={{ fill: 'black' }} />} // חץ קטן ועדין עם צבע מלא
//               />
//             </div>

//           </ThemeProvider>
//         </CacheProvider>
//       </Grid>
//     );
//   };

//   return (
//     <div style={{ justifyContent: 'center' }}>
//       <Box display="flex" justifyContent="center">
//         <Grid container spacing={0} justifyContent="center" alignItems="center">
//           {enums.map(enumItem => renderAutocomplete(enumItem))}
//           <Grid item xs={12} sm={6} md={3} lg={2} style={{ margin: '5px', marginTop: '50px' }}>
//             <Button
//               variant="contained"
//               className="btnView1"
//               onClick={handleFilterCandidates}
//               startIcon={<SearchIcon />}
//               style={{
//                 width: '100px', // רוחב
//                 height: '50px', // גובה
//                 fontWeight: 'bold', // עובי
//                 fontSize: '16px', // גודל טקסט
//                 margin: '0px'
//               }}
//               fullWidth
//             >
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <br /><br /><br />
//       <Box display="flex" justifyContent="center" gap={2}>
//         <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={handleCopyEmails}>
//           העתק מיילים
//         </Button>
//         <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={handleClearEmails}>
//           בטל בחירת מיילים
//         </Button>
//       </Box>
//       <br />
//       <Box display="flex" justifyContent="center">
//         <TableContainer component={Paper} style={{ width: '80%' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center"><b>שם</b></TableCell>
//                 {/* <TableCell align="center"><b>מייל</b></TableCell> */}
//                 <TableCell align="center"><b>פלאפון</b></TableCell>
//                 <TableCell align="center"><b>בחירה להעתקת מיילים</b></TableCell>
//                 <TableCell align="center"><b>פעולות</b></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredCandidates.map((candidate, index) => (
//                 <TableRow key={index}>

//                   <TableCell align="center">{candidate.firstName}</TableCell>
//                   <TableCell align="center">{users.find(u => u.userId === candidate.userId)?.email || 'N/A'}</TableCell>
//                   <TableCell align="center">{candidate.phoneNumber}</TableCell>
//                   <TableCell align="center">
//                     <Checkbox
//                       checked={checkedCandidates[candidate.email] || false}
//                       onChange={(event) => {
//                         const isChecked = event.target.checked;
//                         if (isChecked) {
//                           setSelectedCandidates(prev => [...prev, candidate]);
//                           setCheckedCandidates(prev => ({ ...prev, [candidate.email]: true }));
//                         } else {
//                           setSelectedCandidates(prev => prev.filter(sel => sel.email !== candidate.email));
//                           setCheckedCandidates(prev => ({ ...prev, [candidate.email]: false }));
//                         }
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={2}>
//                       <Tooltip title="היסטוריית הפניות">
//                         <IconButton
//                           color="primary"
//                           sx={{ borderRadius: '50%' }}
//                           onClick={() => navigate(`/History/${candidate.candidateId}`)}                        >
//                           <HistoryIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="עריכת הפניות">
//                         <IconButton
//                           color="primary"
//                           sx={{ borderRadius: '50%' }}
//                           onClick={() => handleEditOpen(candidate)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="צפייה בקורות חיים">
//                         <IconButton variant="contained" onClick={() => handleView(candidate.cvEnglishFile)} color="primary"
//                           sx={{ borderRadius: '50%' }}>
//                           <DescriptionIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
//                         <DialogTitle>AA</DialogTitle>
//                         <DialogContent>
//                           {fileUrl && (
//                             <Box position="relative">
//                               <iframe
//                                 src={fileUrl}
//                                 style={{ width: '100%', height: '80vh', border: 'none' }}
//                                 title="File Preview"
//                               />
//                               <IconButton
//                                 variant="contained"
//                                 onClick={handleDownload}
//                                 style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
//                               >
//                                 <Downloading />
//                               </IconButton>
//                             </Box>
//                           )}
//                         </DialogContent>
//                         <DialogActions>
//                           <Button onClick={handleClose} color="primary">
//                             סגור
//                           </Button>
//                         </DialogActions>
//                       </Dialog>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <Dialog
//         open={openEdit}
//         onClose={handleEditClose}
//         dir="rtl"
//         fullWidth
//         maxWidth="sm"
//         PaperProps={{
//           style: {
//             minHeight: '50vh',
//             maxHeight: '90vh',
//           },
//         }}
//       >
//         <DialogTitle align='center'>ערוך פרטי מועמד</DialogTitle>
//         <DialogContent>
//           <CacheProvider value={cacheRtl}>
//             <ThemeProvider theme={theme}>
//               <div dir="rtl">
//                 <TextField
//                   margin="dense"
//                   name="firstName"
//                   label="שם פרטי"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.firstName}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="lastName"
//                   label="שם משפחה"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.lastName}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="email"
//                   label="אימייל"
//                   type="email"
//                   fullWidth
//                   value={currentCandidate.email || ''}
//                   onChange={handleEditChange}
//                   error={!!emailError}
//                   helperText={emailError}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="phoneNumber"
//                   label="טלפון"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.phoneNumber}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="state"
//                   label="מדינה"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.state}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="city"
//                   label="עיר"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.city}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="address"
//                   label="כתובת"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.address}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="referralSource"
//                   label="שם החברה"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.referralSource}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="referralDate"
//                   label="תאריך"
//                   type="datetime-local"
//                   fullWidth
//                   value={currentCandidate.referralDate}
//                   onChange={handleEditChange}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="remarks"
//                   label="תגובה"
//                   type="text"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={currentCandidate.remarks}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="experienceYears"
//                   label="וותק"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.experienceYears}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="summary"
//                   label="תקציר"
//                   type="text"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={currentCandidate.summary}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="education"
//                   label="השכלה"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.education}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="area to work"
//                   label="אזור בו מעוניין לעבוד"
//                   type="text"
//                   fullWidth
//                   value={currentCandidate.locationCandidates}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="skills"
//                   label="כשרונות"
//                   type="text"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={currentCandidate.skills}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="githubProfile"
//                   label="גיטהב"
//                   type="url"
//                   fullWidth
//                   value={currentCandidate.githubProfile}
//                   onChange={handleEditChange}
//                 />
//                 <TextField
//                   margin="dense"
//                   name="linkedinProfile"
//                   label="פרופיל LinkedIn"
//                   type="url"
//                   fullWidth
//                   value={currentCandidate.linkedinProfile}
//                   onChange={handleEditChange}
//                 />
//               </div>
//             </ThemeProvider>
//           </CacheProvider>
//         </DialogContent>
//         <DialogActions>
//           <Tooltip title='ביטול' style={{ top: '100%' }}>
//             <Button variant="contained" color="primary" style={{ margin: '15px' }} onClick={handleEditClose}>
//               <CancelIcon />
//             </Button>
//           </Tooltip>
//           <Tooltip title='שמור' style={{ bottom: '100%' }}>
//             <Button variant="contained" color="primary" style={{ marginLeft: '50px' }} onClick={handleEditSubmit}>
//               <SaveIcon />
//             </Button>
//           </Tooltip>
//         </DialogActions>
//         {/* <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//           <Alert onClose={handleSnackbarClose} severity="success">
//             {snackbarMessage}
//           </Alert>
//         </Snackbar> */}

//       </Dialog>

//     </div>
//   );
// };

import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Chip,
  Checkbox,
  TextField,
  Autocomplete,
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  SnackbarContent,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CandidateAxios from '../axios/candidateAxios';
import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';
import UserAxios from "../axios/userAxios";
import { FillUsersData } from "../redux/action/userAction";
import OptionsAxios from "../axios/optionsAxios";
import { FillOptionData } from "../redux/action/optionsAction";
import { FillEnumData } from "../redux/action/enumActions";
import EnumsAxios from "../axios/enumAxios";
import UserOptionsAxios from "../axios/userOptionsAxios";
import { FillUsersOptionsData } from "../redux/action/userOptionsAction";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ReferralsAxios from "../axios/referralsAxios";
import { FillReferralsData } from "../redux/action/referralsAction";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FileAxios from '../axios/fileAxios';
import { Downloading } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import { History } from "./history"; // Import useHistory for navigation
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import makeAnimated from "react-select/animated";
import emailAxios from "../axios/emailAxios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
// import makeAnimated from 'react-select/animated';
// import { EditorState, Editor } from 'draft-js';
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// import CandidateAxios from "../axios/candidateAxios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
  },
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export const Filter = ({ onClose, candidate }) => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] =
    useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [checkedCandidates, setCheckedCandidates] = useState({});
  const [candidatesFromServer, setCandidatesFromServer] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [enums, setEnums] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const dispatch = useDispatch();
  const candidateProfiles = useSelector((state) => state.listCandidateProfile);
  const users1 = useSelector((state) => state.listUsers);
  const options1 = useSelector((state) => state.listOptions);
  const enums1 = useSelector((state) => state.listEnums);
  const userOptions1 = useSelector((state) => state.listUserUserOptions);
  const referrals1 = useSelector((state) => state.referrals);
  //
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const [greenCandidates, setGreenCandidates] = useState([]);
  const [emails, setEmails] = useState([]);
  const [openMail, setOpenMail] = useState(false); //
  const [openOptions, setOpenOptions] = useState(false); // משתנה המציין אם החלונית עם האפשרויות פתוחה
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notSend, setnotSend] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const styleMap = {
    LEFT: {
      textAlign: "left",
    },
    CENTER: {
      textAlign: "center",
    },
    RIGHT: {
      textAlign: "right",
    },
  };





  
  useEffect(() => {
    const fetchData = async () => {
      debugger

      try {
        if (candidateProfiles > 0) {
          setCandidatesFromServer(candidateProfiles);
        } else {
          const response = await CandidateAxios.getAllCandidate();
          setCandidatesFromServer(response);
          dispatch(FillCavdidateProfileData(response.data));
        }
        if (users1 > 0) {
          setUsers(users1);
        } else {
          const response = await UserAxios.getAllUsers();
          setUsers(response);
          dispatch(FillUsersData(response.data));
        }
        if (options1 > 0) {
          setOptions(options1);
        } else {
          const response = await OptionsAxios.getAllOptions();
          setOptions(response);
          dispatch(FillOptionData(response.data));
        }
        if (enums1 > 0) {
          setEnums(enums1);
        } else {
          const response = await EnumsAxios.getAllEnums();
          setEnums(response);
          dispatch(FillEnumData(response.data));
        }
        // if (userOptions1 > 0) {
        //   setUserOptions(userOptions1);
        // } else {
        //   const response = await UserOptionsAxios.getAllUserOptions();
        //   setUserOptions(response);
        //   dispatch(FillUsersOptionsData(response.data));
        // }
        if (referrals1 > 0) {
          setUserOptions(referrals1);
        } else {
          const response = await ReferralsAxios.getAllReferrals();
          console.log("refferal: ",response)
          setReferrals(response);
          dispatch(FillReferralsData(response.data));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [
    dispatch,
    candidateProfiles,
    users1,
    options1,
    enums1,
    userOptions1,
    referrals1,
  ]);

  useEffect(() => {
    setFilteredCandidates(candidatesFromServer);
    if (emails.length > 0 && subject) {
      setIsSendDisabled(false);
    } else {
      setIsSendDisabled(true);
    }
  }, [candidatesFromServer,emails, subject]);
  useEffect(() => {
    if (open) {
      setCurrentCandidate(candidatesFromServer);
    }
  }, [open, candidate]);





  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleClickOpen = () => {
    setOpenMail(true);
  };
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleAlignment = (alignment) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithAlignment = Modifier.applyInlineStyle(
      contentState,
      selection,
      alignment
    );
    const newEditorState = EditorState.push(
      editorState,
      contentStateWithAlignment,
      "change-inline-style"
    );
    setEditorState(newEditorState);
  };

  const toggleBlockType = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    handleEditorChange(newState);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File uploaded: ${file.name}`);
      // ניתן להוסיף כאן לוגיקה נוספת לטיפול בקבצים
    }
  };
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const handleCloses = () => {
    setOpenMail(false);
    setLoading(false);
    setBody("");
    setSubject("");
  };
  const handleSend = async () => {
    setLoading(true);
    let more = {
      to: emails,
      subject: subject,
      body: `
      <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
                text-align: right;
                direction: rtl;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 20px;
                text-align: right;
              }
              h1 {
                color: #4CAF50;
                font-size: 24px;
                margin-top: 0;
              }
              p {
                color: #555;
                line-height: 1.6;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background-color:white ;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
              }
              .footer {
                font-size: 14px;
                color: #777;
                text-align: right;
                margin-top: 20px;
              }
              img {
                max-width: 100%;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
               <h3>${body}</h3>
               <a href="https://bergman-front.onrender.com/" class="button"> לאתר..... </a>
              <div class="footer">
                <h4>בברכה<br/>חנה ברגמן</h4>
              </div>
               <p>___________________________________________________________ </p>
               <p> הודעה זו נשלחה ממערכת אוטומטית. אין להשיב על הודעה זו.</P>
            </div>
          </body>
          </html>
      `,
    };
    setBody("");
    setSubject("");
    try {
      await emailAxios.addEmail(more); // קריאה לשרת לשליחת המיילים
      setLoading(false);
      setSnackbarOpen(true); // הצגת ה-Snackbar לאחר שהמיילים נשלחו בהצלחה
    } catch (error) {
      console.error("Failed to send emails:", error);
      setLoading(false);
      setnotSend(true);
      // טיפול בשגיאה אם השליחה נכשלה, לדוגמה הצגת הודעה למשתמש או פעולות נוספות
    } finally {
      handleClose();
    }
  };
  const toggleCandidateColor = (candidateId) => {
    const candidate = filteredCandidates.find(
      (u) => u.id === candidateId
    );
    const userId = candidate.id;
    const candidateEmail =
      users.find((user) => user.id === userId)?.person.email || "N/A";

    if (greenCandidates.includes(candidateId)) {
      // אם הכפתור היה בצבע ירוק ואנחנו מעבירים אותו לכחול
      setGreenCandidates(greenCandidates.filter((id) => id !== candidateId));
      setEmails(emails.filter((email) => email !== candidateEmail));
    } else {
      // אם הכפתור היה בצבע כחול ואנחנו מעבירים אותו לירוק
      setGreenCandidates([...greenCandidates, candidateId]);
      setEmails([...emails, candidateEmail]);
    }
  };
  //


  
  const handleEditOpen = (candidate) => {

    
    const candidateEmail =
    filteredCandidates.find((u) => u.id === candidate.id)?.person.email || "";
    const referral =
      referrals.find((r) => r.id === candidate.id) || {};
    setCurrentCandidate({
      ...candidate,
      email: candidateEmail,
      firstName: candidate.person.firstName,
      lastName: candidate.person.lastName,
      phoneNumber: candidate.person.phoneNumber,
      referralSource: referral.referralSource || "",
      referralDate: referral.referralDate
        ? formatDateTime(referral.referralDate)
        : "",
      remarks: referral.remarks || "",
      country: candidate.country || "",
      city: candidate.city || "",
      experience: candidate.experience || "",
      summary: candidate.summary || "",
      education: candidate.education || "",
      certifications: candidate.certifications || "",
      skills: candidate.skills || "",
      portfolioWebsite: candidate.portfolioWebsite || "",
      linkedinProfile: candidate.linkedinProfile || "",
    });
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditChange = (event) => {
    debugger
    const { name, value } = event.target;
    if (name === "referralDate") {
      setCurrentCandidate((prevCandidate) => ({
        ...prevCandidate,
        [name]: formatDateTime(value),
      }));
    } else {
      setCurrentCandidate((prevCandidate) => ({
        ...prevCandidate,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      // dispatch(FillCavdidateProfileData(response.data));

      await CandidateAxios.updateCandidate(currentCandidate.candidateId, currentCandidate);
      setOpenEdit(false)
      const candidate1 = await CandidateAxios.getAllCandidate()
      setCandidatesFromServer(candidate1);
      dispatch(FillCavdidateProfileData(candidate1.data));
      alert(
        `השינויים עבור ${currentCandidate.person.firstName} ${currentCandidate.person.lastName} נשמרו בהצלחה`
      ); // הצגת הודעה שהשינויים נשמרו
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };
  // const handleSnackbarClose = () => {
  //   setSnackbarOpen(false);

  // פונקציה לעדכון תאריך לפורמט הנדרש
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  const handleFilterCandidates = () => {
    const filterByType = (type, selectedValues) => {
      if (selectedValues.length === 0)
        return candidatesFromServer.map((c) => c.candidateId);
      const enumItem = enums.find((e) => e.enumType === type);
      const optionsByType = options.filter((o) => o.enumId === enumItem.enumId);
      const optionsIds = selectedValues
        .map((value) => {
          const option = optionsByType.find((o) => o.optionsValue === value);
          return option ? option.optionsId : null;
        })
        .filter((id) => id !== null);
      return candidatesFromServer
        .filter((candidate) => {
          return optionsIds.every((optionsId) =>
            userOptions.some(
              (userOption) =>
                userOption.candidateId === candidate.candidateId &&
                userOption.optionsId === optionsId
            )
          );
        })
        .map((c) => c.candidateId);
    };
    const languageCandidates = filterByType("Languages", selectedLanguages);
    const techCandidates = filterByType("Technologies", selectedTechnologies);
    const locationCandidates = filterByType("City", selectedLocations);
    const programmingLangCandidates = filterByType(
      "Programming Languages",
      selectedProgrammingLanguages
    );
    const finalCandidates = candidatesFromServer.filter(
      (candidate) =>
        languageCandidates.includes(candidate.candidateId) &&
        techCandidates.includes(candidate.candidateId) &&
        locationCandidates.includes(candidate.candidateId) &&
        programmingLangCandidates.includes(candidate.candidateId)
    );
    setFilteredCandidates(finalCandidates);
  };
  const handleView = async (fileName) => {
    debugger;
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }
    try {
      setFileName(fileName);
      const response = await FileAxios.getFileUrl(fileName);
      setFileUrl(response);
      setOpen(true);
    } catch (error) {
      alert("Error viewing file");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setFileUrl("");
  };
  const handleDownload = async () => {
    debugger;
    if (!fileName) {
      alert("Please enter a file name to download.");
      return;
    }
    try {
      const response = await FileAxios.downloadFile(fileName);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Error downloading file");
    }
  };
  const handleChange = (type, value) => {
    if (type === "Languages") {
      setSelectedLanguages(value);
    } else if (type === "Technologies") {
      setSelectedTechnologies(value);
    } else if (type === "City") {
      setSelectedLocations(value);
    } else if (type === "Programming Languages") {
      setSelectedProgrammingLanguages(value);
    }
  };
  const renderAutocomplete = (enumItem) => {
    const enumId = enumItem.id;
    const enumType = enumItem.enumType;
    const filteredOptions = options
      .filter((option) => option.id === enumId)
      .map((option) => option.optionsValue);
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        lg={2}
        key={enumId}
        style={{ margin: "5px", marginTop: "50px" }}
      >
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div dir="rtl">
              <Autocomplete
                multiple
                id={enumType}
                options={filteredOptions}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                onChange={(event, value) => handleChange(enumType, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={enumType}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    style={{ margin: "0px 0px", width: "100%" }} // הוספת רווח והתאמת רוחב
                  />
                )}
                popupIcon={<ArrowDropDownIcon style={{ fill: "black" }} />} // חץ קטן ועדין עם צבע מלא
              />
            </div>
          </ThemeProvider>
        </CacheProvider>
      </Grid>
    );
  };
  return (
    <div style={{ justifyContent: "center" }}>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {enums.map((enumItem) => renderAutocomplete(enumItem))}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            style={{ margin: "5px", marginTop: "50px" }}
          >
            <Button
              variant="contained"
              className="btnView1"
              onClick={handleFilterCandidates}
              startIcon={<SearchIcon />}
              style={{
                width: "100px", // רוחב
                height: "50px", // גובה
                fontWeight: "bold", // עובי
                fontSize: "16px", // גודל טקסט
                margin: "0px",
              }}
              fullWidth
            ></Button>
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <br />
      <Box>
        <div>
          {/* מיילים */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            sx={{ width: "200px", margin: "0 auto" }}
          >
            שליחת מייל
          </Button>
          <Dialog open={openMail} onClose={handleCloses}>
            <DialogTitle
              sx={{ width: "500px", margin: "0 auto", direction: "rtl" }}
            >
              שליחת מייל
            </DialogTitle>
            <DialogContent>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <FormControl fullWidth margin="normal">
                      <Autocomplete
                        multiple
                        id="email-autocomplete"
                        options={filteredCandidates.map((candidate) => {
                          const email = candidate.person.email;
                          return (
                            <option key={candidate.id} value={email}>
                              {email}
                            </option>
                          );
                        })}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        value={emails}
                        open={openOptions}
                        onOpen={() => {
                          setOpenOptions(true);
                        }}
                        onClose={() => {
                          setOpenOptions(false);
                        }}
                        onChange={(event, newValue) => {
                          const uniqueEmails = newValue.filter(
                            (email, index) => newValue.indexOf(email) === index
                          );
                          setEmails(uniqueEmails);
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="נמענים"
                            inputProps={{
                              ...params.inputProps,
                              readOnly: true,
                            }}
                            style={{ margin: "0px 0px", width: "100%" }} // הוספת רווח והתאמת רוחב
                          />
                        )}
                        fullWidth
                        margin="normal"
                        rows={8}
                      />
                    </FormControl>
                  </div>
                </ThemeProvider>
              </CacheProvider>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      label="נושא"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      fullWidth
                      margin="normal"
                      rows={8}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    {/* <TextField
                      label=""
                      value={body}
                      onChange={handleBodyChange}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={8}
                    /> */}
                    <Box>
                      <Box
                        sx={{
                          border: "1px solid #ccc",
                          padding: "16px",
                          minHeight: "200px",

                          //  onChange={handleBodyChange}
                        }}
                      >
                        <Editor
                          value={body}
                          editorState={editorState}
                          handleKeyCommand={handleKeyCommand}
                          onChange={setEditorState}
                          customStyleMap={styleMap}
                        />
                      </Box>
                      <Toolbar>
                        <Toolbar>
                          <IconButton onClick={() => toggleInlineStyle("BOLD")}>
                            <FormatBoldIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleInlineStyle("ITALIC")}
                          >
                            <FormatItalicIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleInlineStyle("UNDERLINE")}
                          >
                            <FormatUnderlinedIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              toggleBlockType("unordered-list-item")
                            }
                          >
                            <FormatListBulletedIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleBlockType("ordered-list-item")}
                          >
                            <FormatListNumberedIcon />
                          </IconButton>
                          <IconButton onClick={() => toggleAlignment("LEFT")}>
                            <FormatAlignLeftIcon />
                          </IconButton>
                          <IconButton onClick={() => toggleAlignment("CENTER")}>
                            <FormatAlignCenterIcon />
                          </IconButton>
                          <IconButton onClick={() => toggleAlignment("RIGHT")}>
                            <FormatAlignRightIcon />
                          </IconButton>
                          <IconButton component="label">
                            <input
                              type="file"
                              hidden
                              onChange={handleFileUpload}
                            />
                            <AttachFileIcon />
                          </IconButton>
                        </Toolbar>
                      </Toolbar>
                    </Box>
                  </div>
                </ThemeProvider>
              </CacheProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloses} color="secondary">
                ביטול
              </Button>
              <Button
                onClick={handleSend}
                color="primary"
                disabled={isSendDisabled}
              >
                שליחה
              </Button>
              <Backdrop
                open={loading}
                style={{
                  zIndex: 1000,
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CircularProgress
                  color="inherit"
                  sx={{ width: "80px !important", height: "80px !important" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloses}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "blue",
                    "&:hover": { backgroundColor: "darkblue" },
                  }}
                >
                  ביטול
                </Button>
              </Backdrop>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1000} // 10 שניות
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent
              message="המייל נשלח"
              sx={{
                justifyContent: "flex-end",
                minWidth: "auto", // מקטין את הריבוע לגודל הכיתוב
              }}
            />
          </Snackbar>
          <Snackbar
            open={notSend}
            autoHideDuration={1000} // 10 שניות
            onClose={() => setnotSend(false)}
          >
            <SnackbarContent
              message="המייל לא נשלח"
              sx={{
                justifyContent: "flex-end",
                minWidth: "auto", // מקטין את הריבוע לגודל הכיתוב
              }}
            />
          </Snackbar>
        </div>
      </Box>
      <br></br>
      <br></br>
      <Box display="flex" justifyContent="center">
        <TableContainer component={Paper} style={{ width: "80%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>בחר</b>
                </TableCell>
                <TableCell align="center">
                  <b>שם</b>
                </TableCell>
                <TableCell align="center">
                  <b>מייל</b>
                </TableCell>
                <TableCell align="center">
                  <b>פלאפון</b>
                </TableCell>
                <TableCell align="center">
                  <b>פעולות</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        toggleCandidateColor(candidate.id)
                      }
                    >
                      <EmailIcon
                        style={{
                          width: "20px",
                          height: "20px",
                          color: greenCandidates.includes(candidate.person.id)
                            ? "green"
                            : "blue",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{candidate.person.firstName}</TableCell>
                  <TableCell align="center">{candidate.person.email}</TableCell>
                  <TableCell align="center">{candidate.person.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={2}>
                      <Tooltip title="היסטוריית הפניות">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: "50%" }}
                          onClick={() =>
                            navigate(`/History/${candidate.id}`)
                          }
                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="עריכת הפניות">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: "50%" }}
                          onClick={() => handleEditOpen(candidate)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="צפייה בקורות חיים">
                        <IconButton
                          variant="contained"
                          onClick={() => handleView(candidate.cvEnglishFile)}
                          color="primary"
                          sx={{ borderRadius: "50%" }}
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                        open={open}
                        onClose={handleCloses}
                        maxWidth="lg"
                        fullWidth
                      >
                        <DialogTitle>AA</DialogTitle>
                        <DialogContent>
                          {fileUrl && (
                            <Box position="relative">
                              <iframe
                                src={fileUrl}
                                style={{
                                  width: "100%",
                                  height: "80vh",
                                  border: "none",
                                }}
                                title="File Preview"
                              />
                              <IconButton
                                variant="contained"
                                onClick={handleDownload}
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  left: "10px",
                                  color: "white",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                              >
                                <Downloading />
                              </IconButton>
                            </Box>
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloses} color="primary">
                            סגור
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                          {fileUrl && (
                            <Box position="relative">
                              <img
                                src={fileUrl}
                                alt="File Preview"
                                style={{ width: '100%', height: 'auto' }}
                              />
                              <IconButton variant="contained"
                                onClick={handleDownload}
                                style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                              >
                                <Downloading />
                              </IconButton>
                            </Box>
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                      </Dialog> */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        dir="rtl"
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            minHeight: "50vh",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle align="center">ערוך פרטי מועמד</DialogTitle>
        <DialogContent>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  margin="dense"
                  name="firstName"
                  label="שם פרטי"
                  type="text"
                  fullWidth
                  value={currentCandidate.firstName|| ""}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="lastName"
                  label="שם משפחה"
                  type="text"
                  fullWidth
                  value={currentCandidate.lastName|| ""}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="email"
                  label="אימייל"
                  type="email"
                  fullWidth
                  value={currentCandidate.email || ""}
                  onChange={handleEditChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="dense"
                  name="phoneNumber"
                  label="טלפון"
                  type="text"
                  fullWidth
                  value={currentCandidate.phoneNumber}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="referralSource"
                  label="שם החברה"
                  type="text"
                  fullWidth
                  value={currentCandidate.referralSource}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="referralDate"
                  label="תאריך"
                  type="datetime-local"
                  fullWidth
                  value={currentCandidate.referralDate}
                  onChange={handleEditChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="dense"
                  name="remarks"
                  label="תגובה"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={currentCandidate.remarks}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="state"
                  label="מדינה"
                  type="text"
                  fullWidth
                  value={currentCandidate.state}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="city"
                  label="עיר"
                  type="text"
                  fullWidth
                  value={currentCandidate.city}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="experienceYears"
                  label="וותק"
                  type="text"
                  fullWidth
                  value={currentCandidate.experienceYears}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="summary"
                  label="תקציר"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={currentCandidate.summary}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="education"
                  label="השכלה"
                  type="text"
                  fullWidth
                  value={currentCandidate.education}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="certifications"
                  label="תעודות"
                  type="text"
                  fullWidth
                  value={currentCandidate.certifications}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="skills"
                  label="כישורים"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={currentCandidate.skills}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="portfolioWebsite"
                  label="אתר המועמד"
                  type="url"
                  fullWidth
                  value={currentCandidate.portfolioWebsite}
                  onChange={handleEditChange}
                />
                <TextField
                  margin="dense"
                  name="linkedinProfile"
                  label="פרופיל LinkedIn"
                  type="url"
                  fullWidth
                  value={currentCandidate.linkedinProfile}
                  onChange={handleEditChange}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </DialogContent>
        <DialogActions>
          <Tooltip title="ביטול" style={{ top: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "15px" }}
              onClick={handleEditClose}
            >
              <CancelIcon />
            </Button>
          </Tooltip>
          <Tooltip title="שמור" style={{ bottom: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "50px" }}
              onClick={handleEditSubmit}
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        </DialogActions>
        {/* <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar> */}
      </Dialog>
    </div>
  );
};


