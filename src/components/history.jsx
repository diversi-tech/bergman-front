import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper, TextField, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Grid } from '@mui/material';
import ReferralsAxios from '../axios/referralsAxios';
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import UserAxios from '../axios/userAxios';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import BuildIcon from '@mui/icons-material/Build';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FileAxios from '../axios/fileAxios';
export const History = () => {
    const { userId } = useParams();
    const [candidateDetails, setCandidateDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState([]);
    const [fileName, setFileName] = useState('');
    const [open, setOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const candidateId = userId;
    useEffect(() => {
        const fetchCandidateProfile = async () => {
            try {
                const data = await CandidateProfilesAxios.getCandidateProfileById(candidateId);
                console.log("candidate:" + data);
                setCandidateDetails(prevDetails => ({
                    ...prevDetails,
                    name: data.firstName + " " + data.lastName,
                    phone: data.phoneNumber,
                    address: data.city + " " + data.address + " " + data.state,
                    experience: data.experienceYears,
                    summary: data.summary,
                    skills: data.skills,
                    education: data.education,
                    certifications: data.certifications,
                    githubProfile: data.githubProfile,
                    linkedinProfile: data.linkedinProfile,
                    userId: data.userId,
                    cv: data.cvEnglishFile
                }));
            } catch (error) {
                console.error('Error fetching candidate profile:', error);
            }
        };
        const fetchHistory = async () => {
            try {
                const response = await ReferralsAxios.getAllReferrals();
                console.log("referrals:", response);
                const candidateReferrals = response.filter(referral => referral.candidateId === parseInt(candidateId));
                setHistory(candidateReferrals);
            } catch (error) {
                console.error('Error fetching referrals:', error);
            }
        };
        const fetchUser = async () => {
            try {
                const response = await UserAxios.getAllUsers();
                console.log(response);
                const users = response;
                setUser(users);
                const filteredUser = users.find(user1 => user1.userId === candidateDetails.userId);
                if (filteredUser) {
                    setCandidateDetails(prevDetails => ({
                        ...prevDetails,
                        email: filteredUser.email
                    }));
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchCandidateProfile();
        fetchUser();
        fetchHistory();
    }, [candidateId, candidateDetails.userId]);
    const handleDetails = () => {
        setShowDetails(prevShowDetails => !prevShowDetails);
    };
    const [newHistory, setNewHistory] = useState({ name: '', date: '', comment: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHistory({ ...newHistory, [name]: value });
    };
    const addHistory = async () => {
        try {
            const addedHistory = await ReferralsAxios.addReferral(newHistory);
            console.log("addedHistory:" + addedHistory);
            setHistory([...history, addedHistory]);
            setNewHistory({ name: '', date: '', comment: '' });
            setOpenAddDialog(false);
        } catch (error) {
            console.error('Error adding history:', error);
        }
    };
    const toggleAddDialog = () => {
        setOpenAddDialog(!openAddDialog);
    };

    const handleView = async (fileName) => {
        if (!fileName) {
            alert('Please enter a file name.');
            return;
        }

        try {
            setFileName(fileName)
            const response = await FileAxios.getFileUrl(fileName);
            setFileUrl(response);
            setOpen(true);
        } catch (error) {
            alert('Error viewing file');
        }
    };
    return (
        <Box p={3} sx={{ direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom fontWeight='bold' color='black'>פרטי מועמד</Typography>
            <Paper elevation={3} sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={2}>
                        <Typography variant="h7" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon color="primary" />
                            <strong>שם:</strong> {candidateDetails.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h7" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon color="primary" />
                            <strong>פלאפון:</strong> {candidateDetails.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h7" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon color="primary" />
                            <strong>מייל:</strong> {candidateDetails.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h7" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon color="primary" />
                            <strong>מיקום:</strong> {candidateDetails.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="צפייה בקורות חיים">
                            <IconButton variant="contained" onClick={() => handleView(candidateDetails.cv)} color="primary"
                                sx={{ borderRadius: '50%' }}>
                                <DescriptionIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ p: 1 }}>
                                <Typography variant="subtitle1" component="div">
                                    שם החברה
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ p: 1 }}>
                                <Typography variant="subtitle1" component="div">
                                    תאריך
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ p: 1 }}>
                                <Typography variant="subtitle1" component="div">
                                    תגובה
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((historyItem, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" sx={{ p: 1 }}>
                                    <Typography variant="body1" component="div">
                                        {historyItem.referralSource}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ p: 1 }}>
                                    <Typography variant="body1" component="div">
                                        {historyItem.referralDate}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ p: 1 }}>
                                    <Typography variant="body1" component="div">
                                        {historyItem.remarks}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Button variant="contained" onClick={handleDetails}>
                {showDetails ? "פחות פרטים " : " פרטים נוספים"}
            </Button>
            {showDetails && (
                <Box p={3} sx={{ direction: 'rtl' }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', bgcolor: 'white' }}>
                        <Box sx={{ width: '90%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>אזור בו מעוניין לעבוד:</Typography>
                                <Typography variant="body1">{candidateDetails.address}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WorkIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>וותק:</Typography>
                                <Typography variant="body1">{candidateDetails.experience}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DescriptionIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>תקציר:</Typography>
                                <Typography variant="body1">{candidateDetails.summary}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SchoolIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>השכלה:</Typography>
                                <Typography variant="body1">{candidateDetails.education}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BuildIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>כישרונות:</Typography>
                                <Typography variant="body1">{candidateDetails.skills}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GitHubIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>גיטהב:</Typography>
                                <Typography variant="body1">{candidateDetails.githubProfile}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkedInIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>פרופיל LinkedIn:</Typography>
                                <Typography variant="body1">{candidateDetails.linkedinProfile}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};