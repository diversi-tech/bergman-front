import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper, TextField, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './history.css';
import ReferralsAxios from '../axios/referralsAxios';
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import UserAxios from '../axios/userAxios';
import { useParams } from 'react-router-dom';

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
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <div className="details">
                    <label className="lbl">שם: {candidateDetails.name}</label>
                    <label className="lbl" style={{ flexBasis: '50%' }}>פלאפון: {candidateDetails.phone}</label>
                    <label className="lbl">מייל: {candidateDetails.email}</label>
                </div>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>שם החברה</TableCell>
                            <TableCell align='center'>תאריך</TableCell>
                            <TableCell align='center'>תגובה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((historyItem, index) => (
                            <TableRow key={index}>
                                <TableCell align='center'>{historyItem.referralSource}</TableCell>
                                <TableCell align='center'>{historyItem.referralDate}</TableCell>
                                <TableCell align='center'>{historyItem.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                <Tooltip title="הוספת היסטוריה" arrow>
                    <IconButton
                        onClick={toggleAddDialog}
                        sx={{
                            backgroundColor: '#2976D2',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1b5da0'
                            }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Dialog open={openAddDialog} onClose={toggleAddDialog}>
                <DialogTitle>הוסף היסטוריה חדשה</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="שם החברה"
                        name="name"
                        value={newHistory.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="תאריך"
                        type='date'
                        name="date"
                        value={newHistory.date}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" />,
                        }}
                        sx={{
                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                marginLeft: '10px',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="תגובה"
                        name="comment"
                        value={newHistory.comment}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAddDialog}>ביטול</Button>
                    <Button onClick={addHistory} variant="contained">הוסף</Button>
                </DialogActions>
            </Dialog>

            <Button variant="contained" onClick={handleDetails}>
                להצגת כל פרטי המועמד
            </Button>
            {showDetails && (
                <Box p={3} sx={{ direction: 'rtl' }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
                    </Paper>
                </Box>
            )}
        </Box>
    );
};
