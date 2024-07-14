
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, TextField, Autocomplete, Grid, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch, useSelector } from "react-redux";
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';
import UserAxios from "../axios/userAxios";
import { FillUsersData } from "../redux/action/userAction";
import OptionsAxios from "../axios/optionsAxios";
import { FillOptionData } from "../redux/action/optionsAction";
import { FillEnumData } from "../redux/action/enamActions";
import EnumsAxios from "../axios/enumAxios";
import UserOptionsAxios from "../axios/userOptionsAxios";
import { FillUsersOptionsData } from "../redux/action/userOptionsAction";
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import { History } from './history'; // Import useHistory for navigation
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditDocumentIcon from '@mui/icons-material/Description';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const theme =
  createTheme({
    direction: 'rtl',
    palette: {
      mode: 'light',
    },
  });

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});




export const Filter = () => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [checkedCandidates, setCheckedCandidates] = useState({});
  const [candidatesFromServer, setCandidatesFromServer] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [enums, setEnums] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const dispatch = useDispatch();
  const candidateProfiles = useSelector(state => state.listCandidateProfile);
  const users1 = useSelector(state => state.listUsers);
  const options1 = useSelector(state => state.listOptions);
  const enums1 = useSelector(state => state.listEnums);
  const userOptions1 = useSelector(state => state.listUserUserOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (candidateProfiles > 0) {
          setCandidatesFromServer(candidateProfiles);
        } else {
          const response = await CandidateProfilesAxios.getAllCandidateProfiles();
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
        if (userOptions1 > 0) {
          setUserOptions(userOptions1);
        } else {
          const response = await UserOptionsAxios.getAllUserOptions();
          setUserOptions(response);
          dispatch(FillUsersOptionsData(response.data));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch, candidateProfiles, users1, options1, enums1, userOptions1]);

  useEffect(() => {
    setFilteredCandidates(candidatesFromServer);
  }, [candidatesFromServer]);

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleCopyEmails = async () => {
    const emailsToCopy = selectedCandidates.map(candidate => candidate.email);
    if (emailsToCopy.length > 0) {
      for (const email of emailsToCopy) {
        await copyTextToClipboard(email);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      alert('Emails copied successfully');
    } else {
      alert("No emails to copy");
    }
  };

  const handleClearEmails = () => {
    setSelectedCandidates([]);
    setCheckedCandidates({});
    alert('Email selection cleared');
  };

  const handleFilterCandidates = () => {
    const filterByType = (type, selectedValues) => {
      if (selectedValues.length === 0) return candidatesFromServer.map(c => c.candidateId);

      const enumItem = enums.find(e => e.enumType === type);
      const optionsByType = options.filter(o => o.enumId === enumItem.enumId);
      const optionsIds = selectedValues.map(value => {
        const option = optionsByType.find(o => o.optionsValue === value);
        return option ? option.optionsId : null;
      }).filter(id => id !== null);

      return candidatesFromServer.filter(candidate => {
        return optionsIds.every(optionsId =>
          userOptions.some(userOption =>
            userOption.candidateId === candidate.candidateId && userOption.optionsId === optionsId
          )
        );
      }).map(c => c.candidateId);
    };

    const languageCandidates = filterByType("Languages", selectedLanguages);
    const techCandidates = filterByType("Technologies", selectedTechnologies);
    const locationCandidates = filterByType("City", selectedLocations);
    const programmingLangCandidates = filterByType("Programming Languages", selectedProgrammingLanguages);

    const finalCandidates = candidatesFromServer.filter(candidate =>
      languageCandidates.includes(candidate.candidateId) &&
      techCandidates.includes(candidate.candidateId) &&
      locationCandidates.includes(candidate.candidateId) &&
      programmingLangCandidates.includes(candidate.candidateId)
    );

    setFilteredCandidates(finalCandidates);
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
    const enumId = enumItem.enumId;
    const enumType = enumItem.enumType;
    const filteredOptions = options.filter(option => option.enumId === enumId).map(option => option.optionsValue);

    return (
      <Grid item xs={12} sm={6} md={3} lg={2} key={enumId} style={{ margin: '5px', marginTop: '50px' }}>
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
                    style={{ margin: '0px 0px', width: '100%' }} // הוספת רווח והתאמת רוחב
                  />
                )}
                popupIcon={<ArrowDropDownIcon style={{ fill: 'black' }} />} // חץ קטן ועדין עם צבע מלא
              />
            </div>
          </ThemeProvider>
        </CacheProvider>
      </Grid>
    );
  };

  return (
    <div style={{ justifyContent: 'center' }}>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {enums.map(enumItem => renderAutocomplete(enumItem))}
          <Grid item xs={12} sm={6} md={3} lg={2} style={{ margin: '5px', marginTop: '50px' }}>
            <Button
              variant="contained"
              className="btnView1"
              onClick={handleFilterCandidates}
              startIcon={<SearchIcon />}
              style={{
                width: '100px', // רוחב
                height: '50px', // גובה
                fontWeight: 'bold', // עובי
                fontSize: '16px', // גודל טקסט
                margin: '0px'
              }}
              fullWidth
            >
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br /><br /><br />
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={handleCopyEmails}>
          העתק מיילים
        </Button>
        <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={handleClearEmails}>
          בטל בחירת מיילים
        </Button>
      </Box>
      <br />
      <Box display="flex" justifyContent="center">
        <TableContainer component={Paper} style={{ width: '80%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>שם</b></TableCell>
                <TableCell align="center"><b>מייל</b></TableCell>
                <TableCell align="center"><b>פלאפון</b></TableCell>
                <TableCell align="center"><b>בחירה להעתקת מיילים</b></TableCell>
                <TableCell align="center"><b>פעולות</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{candidate.firstName}</TableCell>
                  <TableCell align="center">{users.find(u => u.userId === candidate.userId)?.email || 'N/A'}</TableCell>
                  <TableCell align="center">{candidate.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={checkedCandidates[candidate.email] || false}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        if (isChecked) {
                          setSelectedCandidates(prev => [...prev, candidate]);
                          setCheckedCandidates(prev => ({ ...prev, [candidate.email]: true }));
                        } else {
                          setSelectedCandidates(prev => prev.filter(sel => sel.email !== candidate.email));
                          setCheckedCandidates(prev => ({ ...prev, [candidate.email]: false }));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={2}>
                      <Tooltip title="היסטוריית פרטי מועמד">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: '50%' }}
                          onClick={() => navigate(`/History/${candidate.candidateId}`)}                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="עריכת פרטי מועמד">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: '50%' }}
                          onClick={() => navigate(`/History/${candidate.candidateId}?mode=edit`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="צפייה בקורות חיים">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: '50%' }}
                          onClick={() => window.open(candidate.cvUrl, '_blank')} // קישור לקובץ
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
