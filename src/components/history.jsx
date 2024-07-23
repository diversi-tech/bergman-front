import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper, TextField, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Grid } from '@mui/material';
import ReferralsAxios from '../axios/referralsAxios';
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import UserAxios from '../axios/userAxios';
import { useParams } from 'react-router-dom';
// import { Paper, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import BuildIcon from '@mui/icons-material/Build';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export const History = () => {
    const { userId } = useParams();
    const [candidateDetails, setCandidateDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        experience: '',
        summary: '',
        skills: '',
        education: '',
        certifications: '',
        portfolioWebsite: '',
        linkedinProfile: '',
        userId: 0
    });
    const [showDetails, setShowDetails] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState([]);
    const candidateId = userId; // ניתן להחליף את ה-ID הזה ב-ID האמיתי של המועמד
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
                    portfolioWebsite: data.portfolioWebsite,
                    linkedinProfile: data.linkedinProfile,
                    userId: data.userId
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
        setShowDetails(true);
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
    return (
        <Box p={3} sx={{ direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom fontWeight='bold' color='black'>פרטי מועמד</Typography>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="h6" component="div">
                            <strong>שם:</strong> {candidateDetails.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" component="div">
                            <strong>פלאפון:</strong> {candidateDetails.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" component="div">
                            <strong>מייל:</strong> {candidateDetails.email}
                        </Typography>
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
                לפרטים נוספים            </Button>
            {showDetails && (
                <Box p={3} sx={{ direction: 'rtl' }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', bgcolor: '#f5f5f5' }}>
                        <Box sx={{ width: '90%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>מיקום:</Typography>
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
                                <VerifiedIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>תעודות:</Typography>
                                <Typography variant="body1">{candidateDetails.certifications}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BuildIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>כישורים:</Typography>
                                <Typography variant="body1">{candidateDetails.skills}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LanguageIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>אתר המועמד:</Typography>
                                <Typography variant="body1">{candidateDetails.portfolioWebsite}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkedInIcon color="primary" />
                                <Typography sx={{ fontWeight: 'bold' }}>פרופיל LinkedIn:</Typography>
                                <Typography variant="body1">{candidateDetails.linkedinProfile}</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* <Paper elevation={3} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>פרטי מועמד</Typography>
                        <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>מיקום:</Typography>
                                <Typography variant="body1">{candidateDetails.address}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>וותק:</Typography>
                                <Typography variant="body1">{candidateDetails.experience}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>תקציר:</Typography>
                                <Typography variant="body1">{candidateDetails.summary}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>השכלה:</Typography>
                                <Typography variant="body1">{candidateDetails.education}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>תעודות:</Typography>
                                <Typography variant="body1">{candidateDetails.certifications}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>כישורים:</Typography>
                                <Typography variant="body1">{candidateDetails.skills}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>אתר המועמד:</Typography>
                                <Typography variant="body1">{candidateDetails.portfolioWebsite}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>linkedinProfile:</Typography>
                                <Typography variant="body1">{candidateDetails.linkedinProfile}</Typography>
                            </Box>
                        </Box>
                    </Paper> */}
                </Box>
            )}
        </Box>
    );
};