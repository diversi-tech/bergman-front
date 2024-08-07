import { Alert, Autocomplete, Box, Button, Chip, Container, FormControl, InputLabel, ListItemText, MenuItem, Paper, Select, TextField, Typography, Stack } from '@mui/material';
import React, { useEffect, useState, useCallback } from "react";

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
const cities = [
  'תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'נתניה', 'אשדוד', 'פתח תקווה', 'ראשון לציון',
  'הרצליה', 'רעננה', 'כפר סבא', 'בת ים', 'חולון', 'רמת גן', 'גבעתיים', 'נהריה', 'עפולה', 'עכו',
  'צפת', 'טבריה', 'מודיעין', 'אילת', 'אור יהודה', 'כפר יונה', 'מגדל העמק', 'מעלה אדומים', 'נשר',
  'עכו', 'רמלה', 'רחובות', 'תל אביב יפו', 'נתניה', 'שדרות', 'קרית שמונה', 'חדרה', 'קרית ביאליק',
  'קרית אתא', 'קרית מוצקין', 'כפר סבא', 'כפר יונה', 'נמל תעופה בן-גוריון', 'אשקלון', 'רמת השרון',
  'הרצליה', 'חולון', 'בת ים', 'רמת גן', 'גבעתיים'
];


export const Profile = () => {
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
        id: '',
        userTypeName: ''
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
        if (candidateOptions1 > 0) {
          setCandidateOptions(candidateOptions1);
        } else {
          debugger
          const response = await CandidateOptionsAxios.getAllCandidateOptions();
          setCandidateOptions(response);
          dispatch(FillCandidateOptionsData(response.data));
        }
        if (referrals1 > 0) {
          setReferrals(referrals1);
        } else {
          const response = await ReferralsAxios.getAllReferrals();
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
    candidateOptions1,
    referrals1,
  ]);
  useEffect(() => {
    debugger
    if (user && candidatesFromServer) {
      const isCandidate = candidatesFromServer.some(candidate => candidate.person.id === user.person.id);
      if (isCandidate) {
        setCurrentUser(user);
      }
    }
  }, [user]);


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

  const handleSubmit = () => {
    const isUpdated =
      JSON.stringify(selectedOptions) !== JSON.stringify(originalSkills) ||
      JSON.stringify(selectedLocations) !== JSON.stringify(originalLocations) ||
      linkedinUrl !== originalLinkedinUrl;

    if (isUpdated) {
      console.log('Submitted Data:', {
        skills: selectedOptions,
        locations: selectedLocations,
        linkedinUrl: linkedinUrl,
        cv: true,
      });
      alert('העדכונים נשמרו בהצלחה');
      navigate('/home');
    } else {
      alert('לא היו שינויים לשמירה');
    }
  };
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
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
  const [hasHigherEducation, setHasHigherEducation] = useState(currentUser.hasHigherEducation || 'no');
  const [educationFields, setEducationFields] = useState(currentUser.educationFields || ['']);

  // useEffect(() => {
  //   setData({ hasHigherEducation, educationFields });
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
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="שם פרטי ומשפחה"
                variant="outlined"
                margin="normal"
                id="name"
                name="name"
                value={currentUser.person.firstName}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <Autocomplete
                fullWidth
                id="city"
                options={cities}
                value={currentUser.person.cityName}
                onChange={(event, newValue) => formik.setFieldValue('city', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="עיר"
                    variant="outlined"
                    margin="normal"
                    value={currentUser.cityName}
                    onChange={handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    sx={{ backgroundColor: 'white' }} // צבע רקע לבן
                  />
                )}
              />
              <TextField
                fullWidth
                label="אימייל"
                variant="outlined"
                margin="normal"
                id="email"
                name="email"
                value={currentUser.person.email}
                onChange={handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ backgroundColor: 'white' }} // צבע רקע לבן
              />
              <TextField
                fullWidth
                label="טלפון"
                variant="outlined"
                margin="normal"
                id="phone"
                name="phone"
                value={currentUser.person.phoneNumber}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={{ backgroundColor: 'white' }} // צבע רקע לבן
              />
            </form>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Typography variant="h6" color={'black'}>
              העלאת קורות חיים
            </Typography>
            <CV />
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
                <InputLabel>בחירת אופציות</InputLabel>
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
            <TextField
              id="linkedin-url"
              label="קישור לפרופיל LinkedIn"
              variant="outlined"
              fullWidth
              value={currentUser.linkedin}
              onChange={handleChange}
              error={urlError}
              helperText={urlError ? "הקישור אינו תקין" : ""}
              sx={{ color: 'black' }}
            />
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
              <GitHubIcon sx={{ color: 'black' }} />
              <Typography variant="body1" sx={{ color: 'black' }}>
                קישור לגיטהאב:
              </Typography>
            </Stack>
            <TextField
              id="github-url"
              label="קישור לגיטהאב"
              variant="outlined"
              fullWidth
              value={currentUser.github}
              onChange={handleChange}
              error={urlError}
              helperText={urlError ? "הקישור אינו תקין" : ""}
              sx={{ color: 'black' }}
            />
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
                      <TextField
                        multiline
                        minRows={2}
                        fullWidth
                        label={`השכלה גבוהה ${index + 1}`}
                        variant="outlined"
                        value={currentUser.educationStatus}
                        onChange={(event) => handleEducationChange(index, event)}
                        sx={{ mr: 1 }}
                      />
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
              </Box>
            </Container>
          </Paper>
        </Container>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          שמירת עדכונים
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
