import { Alert, Autocomplete, Box, Button, Chip, Container, FormControl, InputLabel, ListItemText, MenuItem, Paper, Select, TextField, Typography, Stack, CircularProgress, Backdrop, Tooltip } from '@mui/material';
import React, { useEffect, useState, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { CV } from './CV';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';
import UserAxios from "../axios/userAxios";
import { FillUsersData } from "../redux/action/userAction";
import OptionsAxios from "../axios/optionsAxios";
import { FillOptionData } from "../redux/action/optionsAction";
import { FillEnumData } from "../redux/action/enumActions";
import EnumsAxios from "../axios/enumAxios";
import CandidateOptionsAxios from '../axios/candidateOptionsAxios';
import CandidateAxios from '../axios/candidateAxios';
import ReferralsAxios from '../axios/referralsAxios';
import { FillCandidateOptionsData } from '../redux/action/candidateOptionsAction';
import { FillReferralsData } from '../redux/action/referralsAction';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userAxios from '../axios/userAxios';
import { prefixer } from 'stylis';
import createCache from "@emotion/cache";

import rtlPlugin from 'stylis-plugin-rtl';

import {
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import { styled } from '@mui/system';

import FileAxios from '../axios/fileAxios'; // adjust the path to your axios instance
import Downloading from '@mui/icons-material/Downloading';
const cities = [
  'תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'נתניה', 'אשדוד', 'פתח תקווה', 'ראשון לציון',
  'הרצליה', 'רעננה', 'כפר סבא', 'בת ים', 'חולון', 'רמת גן', 'גבעתיים', 'נהריה', 'עפולה', 'עכו',
  'צפת', 'טבריה', 'מודיעין', 'אילת', 'אור יהודה', 'כפר יונה', 'מגדל העמק', 'מעלה אדומים', 'נשר',
  'עכו', 'רמלה', 'רחובות', 'תל אביב יפו', 'נתניה', 'שדרות', 'קרית שמונה', 'חדרה', 'קרית ביאליק',
  'קרית אתא', 'קרית מוצקין', 'כפר סבא', 'כפר יונה', 'נמל תעופה בן-גוריון', 'אשקלון', 'רמת השרון',
  'הרצליה', 'חולון', 'בת ים', 'רמת גן', 'גבעתיים'
];

const theme =
  createTheme({
    direction: 'rtl',
    palette: {
      mode: 'light',
    },
  });
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});


const UploadButton = styled(Button)({
  flex: '1 1 auto',
  maxWidth: '45%',
  padding: '15px',
  fontSize: '16px',
});
export const Profile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    // כאן תוסיף את הלוגיקה שלך לשמירת העדכונים
    // אחרי שמירת העדכונים בהצלחה, נפתח את ה-Dialog
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [urlError, setUrlError] = React.useState(false);
  const [locationsInputValue, setLocationsInputValue] = React.useState('');
  const [locationsOpen, setLocationsOpen] = React.useState(false);
  const [skillsFocused, setSkillsFocused] = React.useState(false);
  const [locationsFocused, setLocationsFocused] = React.useState(false);
  const [originalSkills, setOriginalSkills] = React.useState([]);
  const [originalLocations, setOriginalLocations] = React.useState([]);
  const [originalLinkedinUrl, setOriginalLinkedinUrl] = React.useState('');
  const [candidatesFromServer, setCandidatesFromServer] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [enums, setEnums] = useState([]);
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);


  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.currentUser);
  const candidateProfiles = useSelector((state) => state.listCandidateProfile);
  const users1 = useSelector((state) => state.listUsers);
  const options1 = useSelector((state) => state.listOptions);
  const enums1 = useSelector((state) => state.listEnums);
  const candidateOptions1 = useSelector((state) => state.listCandidateOptions);
  const referrals1 = useSelector((state) => state.referrals);



  //file
  const [hebrewFile, setHebrewFile] = React.useState(null);
  const [englishFile, setEnglishFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpenFile, setDialogOpenFile] = React.useState(false);
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
      setDialogOpenFile(true);
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
      setDialogOpenFile(true);
      throw error; // Re-throw error after handling it
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!hebrewFile && !englishFile) {
      setDialogTitle('Error');
      setDialogMessage('יש להעלות קובץ אחד לפחות.');
      setDialogSeverity('error');
      setDialogOpenFile(true);
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
      setDialogOpenFile(true);
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
      setDialogOpenFile(true);
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

  const handleCloseDialogFile = () => {
    setDialogOpenFile(false);
    setViewFile(null);
    setFileUrl(null);
  };
  //


  const [currentUser, setCurrentUser] = useState({
    id: '',
    person: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      createdAt: '',
      updatedAt: '',
      emailPerson: []
    },
    user: {
      id: '',
      person: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        createdAt: '',
        updatedAt: '',
        emailPerson: []
      },
      password: '',
      enabled: true,
      userType: {
        id: '2',
        userTypeName: 'משתמש'
      }
    },
    city: {
      id: '',
      enumType: '',
      optionsValue: ''
    },
    coverLater: '',
    experienceYears: '',
    education: '',
    linkedinProfile: '',
    githubProfile: '',
    cvHebrewFile: '',
    cvEnglishFile: '',
    cityName: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger
        if (candidateProfiles > 0) {
          setCandidatesFromServer(candidateProfiles);
        } else {
          const response = await CandidateAxios.getAllCandidate();
          setCandidatesFromServer(response);
          dispatch(FillCavdidateProfileData(response.data));
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
        if (candidateOptions1 > 0) {
          setCandidateOptions(candidateOptions1);
        } else {
          debugger
          const response = await CandidateOptionsAxios.getAllCandidateOptions();
          setCandidateOptions(response);
          dispatch(FillCandidateOptionsData(response.data));
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
    candidateOptions1,
  
  ]);
  // useEffect(() => {
  //   debugger
  //   if (user && candidatesFromServer) {
  //     const isCandidate = candidatesFromServer.some(candidate => candidate.person.id === user.person.id);
  //     if (isCandidate) {
  //       setCurrentUser(user);
  //     }
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const token = Cookies.get("jwtToken");
  //   if (token !== undefined) {
  //     try {
  //       // נסה לפרש את התוקן
  //       const decodedToken = jwtDecode(token);
  //       if(decodedToken.userTypeId === 2) {
  //         debugger
  //         setCurrentUser(candidatesFromServer.filter((x) => x.person.id === decodedToken.personId)[0]);
  //       };
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    debugger
    if (token && typeof token === 'string') {
        try {
            // פענוח הטוקן
            const decodedToken = jwtDecode(token);

            // בדיקת סוג המשתמש והגדרת המשתמש הנוכחי בהתאם
            if(decodedToken.userTypeId === 2) {
                const candidate = candidatesFromServer.find(candidate => candidate.person.id === decodedToken.personId);
                
                if (candidate) {
                    setCurrentUser(candidate);
                }
            }
        } catch (err) {
            console.error("Failed to decode token:", err);
        }
    } else {
        console.error("Invalid token specified: must be a string");
    }
}, []);


  const handleLinkedinChange = (event) => {
    const url = event.target.value;
    setLinkedinUrl(url);
    setUrlError(!(url.startsWith('https://www.linkedin.com/') || url === ''));
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue === '') return [];
    const filtered = options.filter(option =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    return filtered.length > 0 ? filtered : ['אין תוצאות'];
  };

  // const categorizedSelectedSkills = Object.keys(categorizedSkills).reduce((acc, category) => {
  //   const selected = selectedSkills.filter(skill => categorizedSkills[category].includes(skill));
  //   if (selected.length > 0) {
  //     acc[category] = selected;
  //   }
  //   return acc;
  // }, {});

  // const handleSubmit = () => {
  //   const isUpdated =
  //     JSON.stringify(selectedOptions) !== JSON.stringify(originalSkills) ||
  //     JSON.stringify(selectedLocations) !== JSON.stringify(originalLocations) ||
  //     linkedinUrl !== originalLinkedinUrl;

  //   if (isUpdated) {
  //     console.log('Submitted Data:', {
  //       skills: selectedOptions,
  //       locations: selectedLocations,
  //       linkedinUrl: linkedinUrl,
  //       cv: true,
  //     });
  //     alert('העדכונים נשמרו בהצלחה');
  //     navigate('/home');
  //   } else {
  //     alert('לא היו שינויים לשמירה');
  //   }
  // };
  const [errorMessage, setErrorMessage] = React.useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[א-ת]+\s+[א-ת]+$/, 'יש למלא שם פרטי ושם משפחה בעברית')
      .required('שדה חובה'),
    email: Yup.string().email('כתובת מייל לא תקינה').required('שדה חובה'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'מספר לא תקין')
      .required('שדה חובה'),
    city: Yup.string().required('שדה חובה'),
    experience: Yup.number()
      .required('שדה חובה')
      .min(1, 'שנות ניסיון מינימליות הן 1')
      .max(10, 'שנות ניסיון מקסימליות הן 10'),
  });

  const formik = useFormik({
    initialValues: {
      city: currentUser?.cityName || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('שדה חובה'),
      email: Yup.string().email('כתובת מייל לא תקינה').required('שדה חובה'),
      phone: Yup.string().required('שדה חובה'),
      city: Yup.string().required('שדה חובה'),
    }),
    onSubmit: (values) => {
      // setData(values);
    },
  });
  const iconColor = 'primary'

  //ss
  const handleChangeSkills = (event) => {
    const value = event.target.value;
    setSelectedOptions(value);
  };

  const handleOptionClickSkills = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.some(selected => selected.id === option.id)) {
        return prevSelected.filter(selected => selected.id !== option.id);
      } else {
        return [...prevSelected, option];
      }
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      person: {
        ...prevState.person,
        email: value,
        firstName:value,
        lastName: value,
        phoneNumber: value
      },
      user: {
        ...prevState.user,
        person: {
          email: value,
          firstName:value,
          lastName: value,
          phoneNumber: value,
          createdAt: value,
          updatedAt: value,
        },
        password: value,
        enabled: true,
        userType: {
          id: '2',
          userTypeName: 'משתמש'
        }
      },
      city: {
        id: value,
        enumType: value,
        optionsValue: value,
      },
      coverLater:value,
      experienceYears: value,
      education: value,
      linkedinProfile: value,
      githubProfile: value,
      cvHebrewFile: value,
      cvEnglishFile: value,
      cityName: value,
    }));
  };

  const handleDeleteSkills = (optionToDelete) => {
    setSelectedOptions((prevSelected) => prevSelected.filter(option => option.id !== optionToDelete.id));
  };

  // שמירת הנתונים הנבחרים לשרת
  const handleSubmitSkills = () => {
    const candidateOptions = selectedOptions.map(option => ({
      // TODO:לכתוב כאן id של הנוכחי
      currentUser,
      optionId: option.id
    }));

    axios.post('http://localhost:8080/api/candidateOptions', candidateOptions)
      .then(response => {
        console.log('Candidate options saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving candidate options:', error);
      });
  };

  // קבלת רשימת enumTypes ייחודיים
  const enumTypes = [...new Set(options.map(option => option.enumType))];

  // ee
  const [hasHigherEducation, setHasHigherEducation] = useState('');
  const [educationFields, setEducationFields] = useState('');

  // useEffect(() => {
  //   setCurrentUser({ hasHigherEducation, educationFields });
  // }, [hasHigherEducation, educationFields]);

  // useEffect(() => {
  //   setHasChanged(true);
  // }, [hasHigherEducation, educationFields]);

  const handleEducationChange = (index, event) => {
    const newEducationFields = [...educationFields];
    newEducationFields[index] = event.target.value;
    setEducationFields(newEducationFields);
  };

  const handleAddEducation = () => {
    if (educationFields.every(field => field.trim() !== '')) {
      setEducationFields([...educationFields, '']);
    }
  };

  const handleEducationRadioChange = (event) => {
    setHasHigherEducation(event.target.value);
  };

  const handleDeleteEducation = (index) => {
    if (educationFields.length > 1) {
      const newEducationFields = educationFields.filter((_, i) => i !== index);
      setEducationFields(newEducationFields);
    }
  };

  //ww

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'right' }}>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <ContactMailIcon sx={{ marginRight: 2, color: 'black' }} />
              <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>פרטי קשר</Typography>
            </Box>
            {errorMessage && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <form dir="rtl">
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      fullWidth
                      label="שם פרטי"
                      variant="outlined"
                      margin="normal"
                      id="name"
                      name="firstName"
                      value={currentUser.person.firstName}
                      onChange={handleChange}
                    /></div>
                    </ThemeProvider>
                  </CacheProvider>
                  <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      fullWidth
                      label="אימייל"
                      variant="outlined"
                      margin="normal"
                      id="email"
                      name="email"
                      value={currentUser.person.email}
                      onChange={handleChange}
                      sx={{ backgroundColor: 'white' }}
                    />
                    </div>
                </ThemeProvider>
              </CacheProvider>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div dir="rtl">
                    <TextField
                      fullWidth
                      label="טלפון"
                      variant="outlined"
                      margin="normal"
                      id="phone"
                      name="phoneNumber"
                      value={currentUser.person.phoneNumber}
                      onChange={handleChange}
                      sx={{ backgroundColor: 'white' }}
                    />
                  </div>
                </ThemeProvider>
              </CacheProvider>
            </form>
          </Paper>
        </Container>
      </Box >
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Typography variant="h6" color={'black'}>
              העלאת קורות חיים
            </Typography>
            <Container maxWidth="sm">
              <form onSubmit={handleSubmitFile}>
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
                        <Tooltip title="צפייה בקובץ ">
                          <IconButton onClick={() => handleViewFile(hebrewFile)} color="primary">
                            <DescriptionIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                  {hebrewFile && (
                    <Typography variant="body2" align="center">{hebrewFile.name}</Typography>
                  )}
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
                        <Tooltip title="צפייה בקובץ">
                          <IconButton onClick={() => handleViewFile(englishFile)} color="primary">
                            <DescriptionIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                  {englishFile && (
                    <Typography variant="body2" align="center">{englishFile.name}</Typography>
                  )}
                  <Button type="submit" variant="contained" className="submit-button" disabled={loading}>
                    {loading ? 'טוען...' : 'העלה קבצים'}
                  </Button>
                </Box>
              </form>
              <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff', display: 'flex', flexDirection: 'column' }}>
                <CircularProgress color="inherit" sx={{ width: '80px !important', height: '80px !important' }} />
              </Backdrop>
              <Dialog open={dialogOpenFile} onClose={handleCloseDialogFile} maxWidth="lg" fullWidth>
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
                  <Button onClick={handleCloseDialogFile}>סגור</Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              טכנולוגיות כישורים ושפות
            </Typography>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  multiple
                  value={selectedOptions}
                  onChange={handleChangeSkills}
                  renderValue={() => null}
                >
                  {enumTypes.map((enumType) => (
                    (enumType !== 'ערים' && enumType !== 'אזורים') && (
                      <React.Fragment key={enumType}>
                        <MenuItem disabled>{enumType}</MenuItem>
                        {options.filter(option => option.enumType === enumType).map((option) => (
                          <MenuItem key={option.id} value={option} onClick={() => handleOptionClickSkills(option)}>
                            <ListItemText primary={option.optionsValue} />
                          </MenuItem>
                        ))}
                      </React.Fragment>
                    )))}
                </Select>
              </FormControl>
              <Box sx={{ mt: 2 }}>
                {enumTypes.map(enumType => {
                  if (enumType === 'ערים' || enumType === 'אזורים') return null;
                  const selectedByEnumType = selectedOptions.filter(option => option.enumType === enumType);
                  return selectedByEnumType.length > 0 && (
                    <Box key={enumType} sx={{ mb: 2 }}>
                      <Typography variant="h6">{enumType}</Typography>
                      {selectedByEnumType.map(option => (
                        <Chip
                          key={option.id}
                          label={option.optionsValue}
                          onDelete={() => handleDeleteSkills(option)}
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
                  );
                })}
              </Box>
            </div>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              אזורים בהם אתה מעוניין לעבוד
            </Typography>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>בחירת אופציות</InputLabel>
              <Select
                fullWidth
                value={selectedOptions}
                onChange={handleChangeSkills}
                renderValue={() => null}
              >
                {enumTypes.map((enumType) => (
                  (enumType === 'ערים' || enumType === 'אזורים') && (

                    <React.Fragment key={enumType}>
                      <MenuItem disabled>{enumType}</MenuItem>
                      {options.filter(option => option.enumType === enumType).map((option) => (
                        <MenuItem key={option.id} value={option} onClick={() => handleOptionClickSkills(option)}>
                          <ListItemText primary={option.optionsValue} />
                        </MenuItem>
                      ))}
                    </React.Fragment>
                  )))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              {enumTypes.map(enumType => {
                if (enumType !== 'ערים' && enumType !== 'אזורים') return null;
                const selectedByEnumType = selectedOptions.filter(option => option.enumType === enumType);
                return selectedByEnumType.length > 0 && (
                  <Box key={enumType} sx={{ mb: 2 }}>
                    <Typography variant="h6">{enumType}</Typography>
                    {selectedByEnumType.map(option => (
                      <Chip
                        key={option.id}
                        label={option.optionsValue}
                        onDelete={() => handleDeleteSkills(option)}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                );
              })}
            </Box>

          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <LinkedInIcon sx={{ color: 'black' }} />
              <Typography variant="body1" sx={{ color: 'black' }}>
                קישור לפרופיל LinkedIn:
              </Typography>
            </Stack>

            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <div dir="rtl">
                  <TextField
                  
                    id="linkedin-url"
                    label="קישור לפרופיל LinkedIn"
                    variant="outlined"
                    fullWidth
                    name="linkedinProfile"
                    value={currentUser.linkedinProfile}
                    onChange={handleChange}
                    error={urlError}
                    helperText={urlError ? "הקישור אינו תקין" : ""}
                    sx={{ color: 'black' }}
                  />
                </div>
              </ThemeProvider>
            </CacheProvider>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
              <GitHubIcon sx={{ color: 'black' }} />
              <Typography variant="body1" sx={{ color: 'black' }}>
                קישור לגיטהאב:
              </Typography>
            </Stack>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <div dir="rtl">
                  <TextField
                    id="github-url"
                    label="קישור לגיטהאב"
                    variant="outlined"
                    fullWidth
                    name="githubProfile"
                    value={currentUser.githubProfile}
                    onChange={handleChange}
                    error={urlError}
                    helperText={urlError ? "הקישור אינו תקין" : ""}
                    sx={{ color: 'black' }}
                  /></div>
              </ThemeProvider>
            </CacheProvider>

          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon color="black" sx={{ mr: 1 }} />
                <Typography variant="h6"> השכלה גבוהה </Typography>
              </Box>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="body1" mb={1}>
                  האם למדת בתוכנית תואר אקדמי? *
                </Typography>
                <RadioGroup
                  value={hasHigherEducation}
                  onChange={handleEducationRadioChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="כן" />
                  <FormControlLabel value="no" control={<Radio />} label="לא" />
                </RadioGroup>
              </FormControl>

              {hasHigherEducation === 'yes' && (
                <>
                  {educationFields.map((field, index) => (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}>

                      <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                          <div dir="rtl">
                            <TextField
                              multiline
                              minRows={2}
                              fullWidth
                              label={`השכלה גבוהה ${index + 1}`}
                              variant="outlined"
                              value={currentUser.educationStatus}
                              onChange={(event) => handleEducationChange(index, event)}
                              sx={{ mr: 1 }}
                            /></div>
                        </ThemeProvider>
                      </CacheProvider>

                      {index > 0 && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteEducation(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Box display="flex" alignItems="center" width="100%">
                    <IconButton color="primary" onClick={handleAddEducation}>
                      <AddIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      הוסף תואר נוסף
                    </Typography>
                  </Box>
                </>
              )}
            </Paper>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Box display="flex" alignItems="center">
              <Box marginRight={1}>
                <WorkOutlineIcon sx={{ color: '#0033A0' }} /> {/* צבע כחול */}
              </Box>
              <Typography variant="h6">ניסיון תעסוקתי</Typography>
            </Box>
            <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 1 }}>
              כמה שנות ניסיון תעסוקתי יש לך? <span style={{ color: 'red' }}>*</span>
            </Typography>
            <form>
              <FormControl variant="outlined" margin="normal" sx={{ width: '150px' }}>
                <InputLabel id="experience-label">שנות ניסיון</InputLabel>

                <Select
                  dir="rtl"
                  labelId="experience-label"
                  id="experience-select"
                  value={currentUser.experience}
                  onChange={handleChange}
                  label="שנות ניסיון"
                  required
                >
                  {[...Array(50).keys()].map((value) => (
                    <MenuItem key={value + 1} value={value + 1}>
                      {value + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'right' }}>
              <Box sx={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">מכתב מקדים (אופציונלי)</Typography>
                </Box>

                <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={theme}>
                    <div dir="rtl">
                      <TextField
                        id="cover-letter"
                        label="מכתב מקדים"
                        multiline
                        value={currentUser.coverLater}
                        rows={4}
                        placeholder="מכתב מקדים"
                        variant="outlined"
                        fullWidth
                        helperText="אופציונלי"
                        onChange={handleChange} // עדכון ערך מהקלט
                      />
                    </div>
                  </ThemeProvider>
                </CacheProvider>
              </Box>
            </Container>
          </Paper>
        </Container>
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#0000FF', // צבע כחול
            padding: '15px 30px', // גודל הכפתור
            fontSize: '18px', // גודל הטקסט
            marginBottom: '16px', // רווח אחרי הכפתור
          }}
        >
          שמירת עדכונים
        </Button>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle sx={{ textAlign: 'right' }}>הודעה</DialogTitle>
          <DialogContent sx={{ textAlign: 'right' }}>
            <Typography>העדכונים עבור המשתמש נשמרו בהצלחה!</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              סגור
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container >
  );
};

export default Profile;
