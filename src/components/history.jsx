import React, { useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper, TextField,
    IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useLocation } from 'react-router-dom';
import ReferralsAxios from '../axios/referralsAxios';
import CandidateProfilesAxios from '../axios/candidateProfileAxios';
import UserAxios from '../axios/userAxios';
import './history.css';
import SaveIcon from '@mui/icons-material/Save';

export const History = () => {
    const { userId } = useParams();
    const location = useLocation();
    const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit';

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
    const [newHistory, setNewHistory] = useState({ name: '', date: '', comment: '' });

    const candidateId = userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch candidate profile
                const candidateProfile = await CandidateProfilesAxios.getCandidateProfileById(candidateId);
                setCandidateDetails({
                    name: `${candidateProfile.firstName} ${candidateProfile.lastName}`,
                    phone: candidateProfile.phoneNumber,
                    email: '',
                    address: `${candidateProfile.city} ${candidateProfile.address} ${candidateProfile.state}`,
                    experience: candidateProfile.experienceYears,
                    summary: candidateProfile.summary,
                    skills: candidateProfile.skills,
                    education: candidateProfile.education,
                    certifications: candidateProfile.certifications,
                    portfolioWebsite: candidateProfile.portfolioWebsite,
                    linkedinProfile: candidateProfile.linkedinProfile,
                    userId: candidateProfile.userId
                });

                // Fetch referrals history
                const referrals = await ReferralsAxios.getAllReferrals();
                const candidateReferrals = referrals.filter(referral => referral.candidateId === parseInt(candidateId));
                setHistory(candidateReferrals);

                // Fetch user details
                const users = await UserAxios.getAllUsers();
                setUser(users);

                // Find user email and update candidate details
                const filteredUser = users.find(user => user.userId === candidateProfile.userId);
                if (filteredUser) {
                    setCandidateDetails(prevDetails => ({
                        ...prevDetails,
                        email: filteredUser.email
                    }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [candidateId]);

    const handleCandidateDetailsChange = (e) => {
        const { name, value } = e.target;
        setCandidateDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const saveCandidateDetails = async () => {
        try {
            const updatedCandidateDetails = {
                firstName: candidateDetails.name.split(' ')[0],
                lastName: candidateDetails.name.split(' ')[1],
                phoneNumber: candidateDetails.phone,
                city: candidateDetails.address.split(' ')[0],
                address: candidateDetails.address.split(' ').slice(1).join(' '),
                state: candidateDetails.address.split(' ').pop(),
                experienceYears: candidateDetails.experience,
                summary: candidateDetails.summary,
                skills: candidateDetails.skills,
                education: candidateDetails.education,
                certifications: candidateDetails.certifications,
                portfolioWebsite: candidateDetails.portfolioWebsite,
                linkedinProfile: candidateDetails.linkedinProfile,
                userId: candidateDetails.userId
            };
            await CandidateProfilesAxios.updateCandidateProfile(candidateId, updatedCandidateDetails);
            console.log("Updated candidate details:", updatedCandidateDetails);
        } catch (error) {
            console.error('Error updating candidate details:', error);
        }
    };

    const addHistory = async () => {
        try {
            const addedHistory = await ReferralsAxios.addReferral(newHistory);
            console.log("Added history:", addedHistory);
            setHistory([...history, addedHistory]);
            setNewHistory({ name: '', date: '', comment: '' });
            setOpenAddDialog(false);
        } catch (error) {
            console.error('Error adding history:', error);
        }
    };

    const saveHistory = async (index) => {
        try {
            const updatedHistoryItem = history[index];
            await ReferralsAxios.updateReferral(updatedHistoryItem.referralId, updatedHistoryItem);
            console.log("Updated history item:", updatedHistoryItem);
        } catch (error) {
            console.error('Error updating history:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHistory({ ...newHistory, [name]: value });
    };

    const toggleAddDialog = () => {
        setOpenAddDialog(!openAddDialog);
    };

    const handleDetails = () => {
        setShowDetails(true);
    };

    return (
        <Box p={3} sx={{ direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom fontWeight='bold' color='black'>פרטי מועמד</Typography>

            {/* Candidate Details Section */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ mb: 2 }}>
                    {isEditMode ? (
                        <>
                            <TextField
                                label="שם"
                                value={candidateDetails.name}
                                name="name"
                                onChange={handleCandidateDetailsChange}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="פלאפון"
                                value={candidateDetails.phone}
                                name="phone"
                                onChange={handleCandidateDetailsChange}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="מייל"
                                value={candidateDetails.email}
                                name="email"
                                onChange={handleCandidateDetailsChange}
                                fullWidth
                                margin="dense"
                            />
                        </>
                    ) : (
                        <div className="details">
                            <label className="lbl">שם: {candidateDetails.name}</label>
                            <label className="lbl" style={{ flexBasis: '50%' }}>פלאפון: {candidateDetails.phone}</label>
                            <label className="lbl">מייל: {candidateDetails.email}</label>
                        </div>
                    )}
                </Box>

                {isEditMode && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="מיקום"
                            value={candidateDetails.address}
                            name="address"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="וותק"
                            value={candidateDetails.experience}
                            name="experience"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="תקציר"
                            value={candidateDetails.summary}
                            name="summary"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="השכלה"
                            value={candidateDetails.education}
                            name="education"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="תעודות"
                            value={candidateDetails.certifications}
                            name="certifications"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="כישורים"
                            value={candidateDetails.skills}
                            name="skills"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="אתר המועמד"
                            value={candidateDetails.portfolioWebsite}
                            name="portfolioWebsite"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="פרופיל LinkedIn"
                            value={candidateDetails.linkedinProfile}
                            name="linkedinProfile"
                            onChange={handleCandidateDetailsChange}
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                )}

                {/* Action Buttons */}
                {isEditMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={saveCandidateDetails} sx={{ ml: 2 }}>שמור שינויים</Button>
                        <Button variant="contained">ביטול</Button>
                    </Box>
                )}
            </Paper>

            {/* Referrals History Table */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>שם החברה</TableCell>
                            <TableCell align='center'>תאריך</TableCell>
                            <TableCell align='center'>תגובה</TableCell>
                            {/* {isEditMode && <TableCell align='center'>פעולות</TableCell>} */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((historyItem, index) => (
                            <TableRow key={index}>
                                <TableCell align='center'>
                                    {isEditMode ? (
                                        <TextField
                                            value={historyItem.referralSource}
                                            onChange={(e) => {
                                                const updatedHistory = [...history];
                                                updatedHistory[index].referralSource = e.target.value;
                                                setHistory(updatedHistory);
                                            }}
                                        />
                                    ) : (
                                        historyItem.referralSource
                                    )}
                                </TableCell>
                                <TableCell align='center'>
                                    {isEditMode ? (
                                        <TextField
                                            type="date"
                                            value={historyItem.referralDate}
                                            onChange={(e) => {
                                                const updatedHistory = [...history];
                                                updatedHistory[index].referralDate = e.target.value;
                                                setHistory(updatedHistory);
                                            }}
                                        />
                                    ) : (
                                        historyItem.referralDate
                                    )}
                                </TableCell>
                                <TableCell align='center'>
                                    {isEditMode ? (
                                        <TextField
                                            value={historyItem.remarks}
                                            onChange={(e) => {
                                                const updatedHistory = [...history];
                                                updatedHistory[index].remarks = e.target.value;
                                                setHistory(updatedHistory);
                                            }}
                                        />
                                    ) : (
                                        historyItem.remarks
                                    )}
                                </TableCell>
                                {isEditMode && (
                                    <TableCell align='center'>
                                        <Tooltip title="שמור שינויים">
                                            <IconButton onClick={() => saveHistory(index)}>
                                                <SaveIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Add History Button */}
                {isEditMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={toggleAddDialog}
                        >
                            הוסף היסטוריה
                        </Button>
                    </Box>
                )}
            </Paper>
            {!isEditMode && (
                <Button variant="contained" onClick={handleDetails}>
                    להצגת כל פרטי המועמד
                </Button>
            )}

            {/* Add History Dialog */}
            <Dialog open={openAddDialog} onClose={toggleAddDialog} fullWidth>
                <DialogTitle>הוספת היסטוריה חדשה</DialogTitle>
                <DialogContent>
                    <TextField
                        label="שם החברה"
                        name="name"
                        value={newHistory.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="תאריך"
                        name="date"
                        type="date"
                        value={newHistory.date}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="הערה"
                        name="comment"
                        value={newHistory.comment}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="שמור היסטוריה חדשה">
                                        <IconButton onClick={addHistory}>
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAddDialog} color="secondary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>

            {showDetails && (
                <Box p={3} sx={{ direction: 'rtl' }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>מיקום:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.address}
                                        name="address"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.address}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>וותק:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.experience}
                                        name="experience"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.experience}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>תקציר:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.summary}
                                        name="summary"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.summary}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>השכלה:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.education}
                                        name="education"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.education}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>תעודות:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.certifications}
                                        name="certifications"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.certifications}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>כישורים:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.skills}
                                        name="skills"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.skills}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>אתר המועמד:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.portfolioWebsite}
                                        name="portfolioWebsite"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.portfolioWebsite}</Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>פרופיל LinkedIn:</Typography>
                                {isEditMode ? (
                                    <TextField
                                        value={candidateDetails.linkedinProfile}
                                        name="linkedinProfile"
                                        onChange={handleCandidateDetailsChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="body1">{candidateDetails.linkedinProfile}</Typography>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};