// import { Button, Checkbox, TextField, Autocomplete, Grid, Box } from "@mui/material";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import * as React from 'react';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { useState } from "react";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// export const Filter = () => {
//     //שמירת הערכים שנבחרו
//     const [selectedCandidates, setSelectedCandidates] = useState([]); // סטאטוס לבחירת המועמדים להעתקה
//     const [selectedExperience, setSelectedExperience] = useState([null])
//     const [selectedLanguages, setSelectedLanguages] = useState([]);
//     const [selectedTechnologies, setSelectedTechnologies] = useState([]);
//     const [selectedLocations, setSelectedLocations] = useState([]);
//     const [checkedCandidates, setCheckedCandidates] = useState({});

//     // פונקציה לסינון המועמדים
//     const handleSearch = () => {
//         alert("hello")
//         debugger
//         // כאן תוסיף את לוגיקת הסינון שלך
//     };

//     // פונקציה להעתקת טקסט ללוח
//     const copyTextToClipboard = async (text) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             console.log('טקסט הועתק ללוח:', text);
//         } catch (err) {
//             console.error('העתקת הטקסט נכשלה', err);
//         }
//     };

//     //פונקציה להעתקת מיילים מהמועמדים שנבחרו
//     const handleCopyEmails = async () => {
//         const emailsToCopy = selectedCandidates.map(candidate => candidate.email);
//         if (emailsToCopy.length > 0) {
//             for (const email of emailsToCopy) {
//                 await copyTextToClipboard(email);
//                 await new Promise(resolve => setTimeout(resolve, 500)); // זמן המתנה של 500 מילישניות בין כל העתקה
//             }
//             alert('המיילים הועתקו בהצלחה');
//         } else {
//             alert("אין מיילים להעתקה");
//         }
//     };

//     // פונקציה לביטול בחירת כל המיילים
//     const handleClearEmails = () => {
//         setSelectedCandidates([]);
//         setCheckedCandidates({});
//         alert('בחירת כל המיילים בוטלה');
//     };

//     //פונקציה גנרית לטיפול בשינוי ב-Autocomplete
//     const handleChange = (type, value) => {
//         if (type === "languages") {
//             setSelectedLanguages(value);
//         } else if (type === "technologies") {
//             setSelectedTechnologies(value);
//         } else if (type === "locations") {
//             setSelectedLocations(value);
//         }

//         const selectedLabels = value.map(v => v);
//         const filteredOptions = allOptions[type].filter(option =>
//             !selectedLabels.includes(option)
//         );

//         setOptions(prev => ({ ...prev, [type]: filteredOptions }));
//     };


//     // רשימת המועמדים
//     const candidates = [
//         {
//             name: "John Doe",
//             email: "john.doe@example.com",
//             phone: "123-456-7890"
//         },
//         {
//             name: "Jane Smith",
//             email: "jane.smith@example.com",
//             phone: "987-654-3210"
//         },
//         {
//             name: "Michael Brown",
//             email: "michael.brown@example.com",
//             phone: "555-555-5555"
//         }
//     ];

//     // האופציות לחיפוש ולסינון נתונים
//     const experience = [0, 1, 2, 3]
//     //משתנה לניהול שאר האופציות
//     const allOptions = {
//         languages: ["c", "c++", "Angular"],
//         technologies: [".Net", "WebAPI", "Docker"],
//         locations: [
//             'תל אביב', 'ירושלים', 'אשדוד', 'חיפה', 'ראשון לציון', 'פתח תקווה',
//             'נתניה', 'באר שבע', 'חולון', 'רמת גן', 'אשקלון', 'רחובות',
//             'בית שמש', 'הרצליה', 'כפר סבא', 'חדרה', 'מודיעין-מכבים-רעות',
//             'לוד', 'רעננה', 'רמלה', 'נהריה', 'יבנה', 'קריית גת', 'אילת',
//             'קריית ביאליק', 'קריית מוצקין', 'עפולה', 'קריית אונו', 'קריית ים',
//             'קריית אתא', 'צפת', 'טבריה', 'אופקים', 'סחנין', 'שפרעם', 'טייבה',
//             'נצרת', 'באקה אל-גרביה', 'עכו', 'טמרה', 'כפר קאסם', 'דימונה', 'אריאל',
//             'קלנסווה', 'טירת כרמל', 'נשר', 'אור עקיבא', 'מגדל העמק', 'קריית מלאכי',
//             'שדרות', 'קריית שמונה', 'ערד', 'יקנעם עילית', 'כפר יונה',
//             'יהוד-מונוסון', 'ראש העין', 'גבעת שמואל', 'נוף הגליל', 'מעלות-תרשיחא'
//         ]
//     };

//     const [options, setOptions] = useState({
//         languages: allOptions.languages,
//         technologies: allOptions.technologies,
//         locations: allOptions.locations
//     });

//     return <div style={{ justifyContent: 'center' }}>
//         <Box display="flex" justifyContent="center">
//             <Grid container spacing={2} justifyContent="center">
//                 {/* נסיון */}
//                 <Grid item xs={2}>
//                     <Autocomplete
//                         id="experience"
//                         options={experience}
//                         getOptionLabel={(option) => option.toString()}
//                         onChange={(event, value) => setSelectedExperience(value ? value.experience : null)}
//                         renderInput={(params) => (
//                             <TextField {...params} label="נסיון" />
//                         )}
//                     />
//                 </Grid>
//                 {/* שפות תכנות  */}
//                 <Grid item xs={2}>
//                     <Autocomplete
//                         multiple
//                         id="Programming languages"
//                         options={options.languages}
//                         disableCloseOnSelect
//                         getOptionLabel={(option) => option}
//                         renderOption={(props, option, { selected }) => (
//                             <li {...props}>
//                                 {option}
//                             </li>
//                         )}
//                         onChange={(event, value) => handleChange("languages", value)}
//                         renderInput={(params) => (
//                             <TextField {...params} label="שפות תכנות" />
//                         )}
//                     />
//                 </Grid>
//                 {/* טכנולוגיות*/}
//                 <Grid item xs={2}>
//                     <Autocomplete
//                         multiple
//                         id="Technologies"
//                         options={options.technologies}
//                         disableCloseOnSelect
//                         getOptionLabel={(option) => option}
//                         renderOption={(props, option, { selected }) => (
//                             <li {...props}>
//                                 {option}
//                             </li>
//                         )}
//                         onChange={(event, value) => handleChange("technologies", value)}
//                         renderInput={(params) => (
//                             <TextField {...params} label="טכנולוגיות" />
//                         )}
//                     />
//                 </Grid>
//                 {/* מיקום */}
//                 <Grid item xs={2}>
//                     <Autocomplete
//                         multiple
//                         id="location"
//                         options={options.locations}
//                         disableCloseOnSelect
//                         getOptionLabel={(option) => option}
//                         renderOption={(props, option, { selected }) => (
//                             <li {...props}>
//                                 {option}
//                             </li>
//                         )}
//                         onChange={(event, value) => handleChange("locations", value)}
//                         renderInput={(params) => (
//                             <TextField {...params} label="מיקום" />
//                         )}
//                     />
//                 </Grid>
//                 <Grid item xs={2}>
//                     <Button variant="contained" className="btnView1" style={{ margin: '15px' }}
//                         onClick={() => handleSearch()}>
//                         חפש</Button>
//                 </Grid>
//             </Grid>
//         </Box>
//         <br /><br /><br />
//         <Box display="flex" justifyContent="center" gap={2}>
//             <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={() => handleCopyEmails()}>
//                 העתק מיילים
//             </Button>
//             <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={() => handleClearEmails()}>
//                 בטל בחירת מיילים
//             </Button>
//         </Box>
//         <br />
//         {/* הצגת המועמדים */}

//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell align="center"><b>שם</b></TableCell>
//                         <TableCell align="center"><b>מייל</b></TableCell>
//                         <TableCell align="center"><b>פלאפון</b></TableCell>
//                         <TableCell align="center"><b>בחירה להעתקת מיילים</b></TableCell>
//                         <TableCell align="center"><b>פעולות</b></TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {candidates.map((candidate, index) => (
//                         <TableRow key={index}>
//                             <TableCell align="center">{candidate.name}</TableCell>
//                             <TableCell align="center">{candidate.email}</TableCell>
//                             <TableCell align="center">{candidate.phone}</TableCell>
//                             <TableCell align="center">
//                                 <Checkbox
//                                     checked={checkedCandidates[candidate.email] || false}
//                                     onChange={(event) => {
//                                         const isChecked = event.target.checked;
//                                         if (isChecked) {
//                                             setSelectedCandidates(prev => [...prev, candidate]);
//                                             setCheckedCandidates(prev => ({ ...prev, [candidate.email]: true }));
//                                         } else {
//                                             setSelectedCandidates(prev => prev.filter(sel => sel.email !== candidate.email));
//                                             setCheckedCandidates(prev => ({ ...prev, [candidate.email]: false }));
//                                         }
//                                     }}
//                                 />
//                             </TableCell>
//                             <TableCell align="center">
//                                 <Box display="flex" justifyContent="center" gap={2}>
//                                     <Button variant="contained" className="btnView">
//                                         מעבר לדף ההסטוריה
//                                     </Button>
//                                     <Button variant="contained" className="btnView">
//                                         לצפייה בקורות חיים
//                                     </Button>
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     </div>
// }


import { Button, Checkbox, TextField, Autocomplete, Grid, Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from "react-redux";
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import { FillCavdidateProfileData } from '../redux/action/candidate_profileAction';
import UserAxios from "../axios/userAxios";
import { FillUsersData } from "../redux/action/userAction";
import OptionsAxios from "../axios/optionsAxios";

const API_URL = 'http://localhost:8080/api/candidateProfiles';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export const Filter = () => {
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([null]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [checkedCandidates, setCheckedCandidates] = useState({});
    const [candidatesFromServer, setCandidatesFromServer] = useState([]);
    const [users, setUsers] = useState([]);
    const [myOptions, setMyOptions] = useState([]);

    const dispatch = useDispatch();
    const condidatProfiles = useSelector(state => state.listCandidateProfile);
    const users1 = useSelector(state => state.listUsers);
    const options1 = useSelector(state => state.listOptions);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (condidatProfiles > 0) {
                    setCandidatesFromServer(condidatProfiles);
                }
                else {
                    const response = await CandidateProfilesAxios.getAllCandidateProfiles();
                    setCandidatesFromServer(response);
                    dispatch(FillCavdidateProfileData(response.data))

                }
                if (users1 > 0) {
                    setUsers(users1);
                }
                else {
                    const response = await UserAxios.getAllUsers();
                    setUsers(response);
                    dispatch(FillUsersData(response.data))

                }
                if (options1 > 0) {
                    setMyOptions(options1);
                }
                else {
                    const response = await OptionsAxios.getAllOptions();
                    setMyOptions(response);
                    dispatch(FillUsersData(response.data))

                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [dispatch]);


    const handleSearch = () => {
        alert("hello");
        debugger;
        // כאן תוסיף את לוגיקת הסינון שלך
    };
    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('טקסט הועתק ללוח:', text);
        } catch (err) {
            console.error('העתקת הטקסט נכשלה', err);
        }
    };
    const handleCopyEmails = async () => {
        const emailsToCopy = selectedCandidates.map(candidate => candidate.email);
        if (emailsToCopy.length > 0) {
            for (const email of emailsToCopy) {
                await copyTextToClipboard(email);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            alert('המיילים הועתקו בהצלחה');
        } else {
            alert("אין מיילים להעתקה");
        }
    };
    const handleClearEmails = () => {
        setSelectedCandidates([]);
        setCheckedCandidates({});
        alert('בחירת כל המיילים בוטלה');
    };
    const handleChange = (type, value) => {
        if (type === "languages") {
            setSelectedLanguages(value);
        } else if (type === "technologies") {
            setSelectedTechnologies(value);
        } else if (type === "locations") {
            setSelectedLocations(value);
        }
        const selectedLabels = value.map(v => v);
        const filteredOptions = allOptions[type].filter(option =>
            !selectedLabels.includes(option)
        );
        setOptions(prev => ({ ...prev, [type]: filteredOptions }));
    };

    // רשימת האופציות לחיפוש ולסינון נתונים
    const experience = [0, 1, 2, 3];
    const allOptions = {
        languages: ["c", "c++", "Angular"],
        technologies: [".Net", "WebAPI", "Docker"],
        locations: [
            'תל אביב', 'ירושלים', 'אשדוד', 'חיפה', 'ראשון לציון', 'פתח תקווה',
            'נתניה', 'באר שבע', 'חולון', 'רמת גן', 'אשקלון', 'רחובות',
            'בית שמש', 'הרצליה', 'כפר סבא', 'חדרה', 'מודיעין-מכבים-רעות',
            'לוד', 'רעננה', 'רמלה', 'נהריה', 'יבנה', 'קריית גת', 'אילת',
            'קריית ביאליק', 'קריית מוצקין', 'עפולה', 'קריית אונו', 'קריית ים',
            'קריית אתא', 'צפת', 'טבריה', 'אופקים', 'סחנין', 'שפרעם', 'טייבה',
            'נצרת', 'באקה אל-גרביה', 'עכו', 'טמרה', 'כפר קאסם', 'דימונה', 'אריאל',
            'קלנסווה', 'טירת כרמל', 'נשר', 'אור עקיבא', 'מגדל העמק', 'קריית מלאכי',
            'שדרות', 'קריית שמונה', 'ערד', 'יקנעם עילית', 'כפר יונה',
            'יהוד-מונוסון', 'ראש העין', 'גבעת שמואל', 'נוף הגליל', 'מעלות-תרשיחא'
        ]
    };
    const [options, setOptions] = useState({
        languages: allOptions.languages,
        technologies: allOptions.technologies,
        locations: allOptions.locations
    });
    return (
        <div style={{ justifyContent: 'center' }}>
            <Box display="flex" justifyContent="center">
                <Grid container spacing={2} justifyContent="center">
                    {/* נסיון */}
                    <Grid item xs={2}>
                        <Autocomplete
                            id="experience"
                            options={experience}
                            getOptionLabel={(option) => option.toString()}
                            onChange={(event, value) => setSelectedExperience(value ? value.experience : null)}
                            renderInput={(params) => (
                                <TextField {...params} label="נסיון" />
                            )}
                        />
                    </Grid>
                    {/* שפות תכנות */}
                    <Grid item xs={2}>
                        <Autocomplete
                            multiple
                            id="Programming languages"
                            options={options.languages}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    {option}
                                </li>
                            )}
                            onChange={(event, value) => handleChange("languages", value)}
                            renderInput={(params) => (
                                <TextField {...params} label="שפות תכנות" />
                            )}
                        />
                    </Grid>
                    {/* טכנולוגיות*/}
                    <Grid item xs={2}>
                        <Autocomplete
                            multiple
                            id="Technologies"
                            options={options.technologies}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    {option}
                                </li>
                            )}
                            onChange={(event, value) => handleChange("technologies", value)}
                            renderInput={(params) => (
                                <TextField {...params} label="טכנולוגיות" />
                            )}
                        />
                    </Grid>
                    {/* מיקום */}
                    <Grid item xs={2}>
                        <Autocomplete
                            multiple
                            id="location"
                            options={options.locations}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    {option}
                                </li>
                            )}
                            onChange={(event, value) => handleChange("locations", value)}
                            renderInput={(params) => (
                                <TextField {...params} label="מיקום" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" className="btnView1" style={{ margin: '15px' }}
                            onClick={() => handleSearch()}>
                            חפש
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <br /><br /><br />
            <Box display="flex" justifyContent="center" gap={2}>
                <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={() => handleCopyEmails()}>
                    העתק מיילים
                </Button>
                <Button variant="contained" className="btnView" style={{ margin: '15px' }} onClick={() => handleClearEmails()}>
                    בטל בחירת מיילים
                </Button>
            </Box>
            <br />
            {/* הצגת המועמדים */}
            <TableContainer component={Paper}>
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
                        {candidatesFromServer.map((candidatesFromServer, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{candidatesFromServer.firstName}</TableCell>
                                <TableCell align="center">{users.find(u => u.userId === candidatesFromServer.userId)?.email || 'N/A'}
                                </TableCell>
                                <TableCell align="center">{candidatesFromServer.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={checkedCandidates[candidatesFromServer.email] || false}
                                        onChange={(event) => {
                                            const isChecked = event.target.checked;
                                            if (isChecked) {
                                                setSelectedCandidates(prev => [...prev, candidatesFromServer]);
                                                setCheckedCandidates(prev => ({ ...prev, [candidatesFromServer.email]: true }));
                                            } else {
                                                setSelectedCandidates(prev => prev.filter(sel => sel.email !== candidatesFromServer.email));
                                                setCheckedCandidates(prev => ({ ...prev, [candidatesFromServer.email]: false }));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center" gap={2}>
                                        <Tooltip title="דף הסטוריה">
                                            <IconButton color="primary" sx={{ borderRadius: '50%' }}>
                                                <HistoryIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="צפיה בקורות חיים">
                                            <IconButton color="primary" sx={{ borderRadius: '50%' }}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};