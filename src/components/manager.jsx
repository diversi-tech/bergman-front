import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import {
    Alert, Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Tooltip, Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prefixer } from 'stylis';
import emailAxios from '../axios/emailAxios'
import rtlPlugin from 'stylis-plugin-rtl';
import userAxios from '../axios/userAxios';
import userTypeAxios from '../axios/userTypeAxios';
import { FillUsersData } from '../redux/action/userAction';
import { FillUsersTypeData } from '../redux/action/userTypeAction';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'walla.co.il', 'hotmail.com'];
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
export const Manager = () => {
    const dispatch = useDispatch();
    const users1 = useSelector(state => state.listUsers);
    const [users, setUsers] = useState([]);
    const [userTypes, setUserType] = useState([]);
    const [persons, setPersons] = useState([]);
    const [managers, setManagers] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentManager, setCurrentManager] = useState({});
    const [newManager, setNewManager] = useState({ username: '', email: '', password: '', createdAt: new Date() });
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [emailRecipient, setEmailRecipient] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (users1 > 0) {
                    setUsers(users1)
                    dispatch(FillUsersData(users1));
                    const managers1 = await userAxios.getAllManagers();
                    setManagers(managers1);
                }
                else {
                    const users1 = await userAxios.getAllUsers();
                    const managers1 = await userAxios.getAllManagers();
                    const data1 = await userTypeAxios.getAllUserTypes();
                    dispatch(FillUsersTypeData(data1));
                    setUserType(data1);
                    dispatch(FillUsersData(users1));
                    setManagers(managers1);
                    setShowTable(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);
    const handleEditOpen = (manager) => {
        debugger
        setCurrentManager(manager);
        setOpenEdit(true);
    };
    const handleEditClose = () => {
        setOpenEdit(false);
        setEmailError('');
    };
    const handleAddOpen = () => {
        setNewManager({ username: '', email: '', password: '', createdAt: new Date() });
        setOpenAdd(true);
    };
    const handleAddClose = () => {
        setNewManager({ username: '', email: '', password: '', createdAt: new Date() });
        setEmailError('');
        setOpenAdd(false);
    };
    const handleDeleteWarningOpen = (manager) => {
        setManagerToDelete(manager);
        setOpenDeleteWarning(true);
    };
    const handleDeleteWarningClose = () => {
        setOpenDeleteWarning(false);
        setManagerToDelete(null);
    };
    const handleDeleteConfirm = async () => {
        try {
            await userAxios.deleteUser(managerToDelete.userId);
            const managers1 = await userAxios.getAllManagers();
            setManagers(managers1);
            dispatch(FillUsersData(managers1));
            setSnackbarMessage(`המשתמש ${managerToDelete.username} נמחק בהצלחה`);
            setSnackbarOpen(true);
            handleDeleteWarningClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'firstName' || name === 'lastName') {
            const lettersOnly = /^[\p{L}]+$/u;

            if (!lettersOnly.test(value)) {
                error = 'השדה יכול להכיל רק אותיות';
            }
        }
        if (name === 'email') {
            if (!validateEmail(value)) {
                error = 'כתובת מייל לא תקינה';
            }
        }
        setCurrentManager(prevManager => ({
            ...prevManager,
            person: {
                ...prevManager.person,
                [name]: value
            }
        }));
        if (name === 'firstName' || name === 'lastName') {
            setFirstNameError(name === 'firstName' ? error : '');
            setLastNameError(name === 'lastName' ? error : '');
        } else if (name === 'email') {
            setEmailError(error);
        }
    };
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewManager({ ...newManager, [name]: value });
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('כתובת מייל לא תקינה');
            } else {
                setEmailError('');
            }
        }
    };
    const handleUserTypeChange = (e) => {
        const userType = e.target.value;
        setNewManager({ ...newManager, userType });
    };
    const handleUserTypeEditChange = (e) => {
        const selectedUserTypeId = e.target.value;
        // למצוא את סוג המשתמש המתאים מתוך הרשימה
        const selectedUserType = userTypes.find(type => type.id === selectedUserTypeId);
        // עדכון המצב עם סוג המשתמש הנבחר
        setCurrentManager(prevManager => ({
            ...prevManager,
            userType: selectedUserType || { id: '', userTypeName: '' }
        }));
    };
    const handleEditSubmit = async () => {
        debugger
        if (emailError) return;
        try {
            await userAxios.updateUser(currentManager.id, currentManager);
            setOpenEdit(false);
            const managers1 = await userAxios.getAllManagers();
            setManagers(managers1);
            dispatch(FillUsersData(managers1));
            setSnackbarMessage(`המשתמש ${currentManager.person.firstName} ${currentManager.person.lastName} עודכן בהצלחה`);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating manager:', error);
        }
    };
    const handleAddSubmit = async () => {
        if (emailError) return;
        try {
            await userAxios.addUser(newManager);
            setOpenAdd(false);
            const managers1 = await userAxios.getAllManagers();
            setManagers(managers1);
            dispatch(FillUsersData(managers1));
            setSnackbarMessage(`המשתמש ${newManager.username} נוסף בהצלחה`);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding manager:', error);
        }
    };
    const handleEmailDialogOpen = (email) => {
        setEmailRecipient(email);
        setOpenEmailDialog(true);
    };
    const handleEmailDialogClose = () => {
        setOpenEmailDialog(false);
        setEmailRecipient('');
        setEmailSubject('');
        setEmailBody('');
    };
    const handleEmailSend = async () => {
        debugger
        let emailData = {
            to: [emailRecipient],
            subject: emailSubject,
            body: emailBody
        };

        console.log('Email Data:', emailData);

        try {
            await emailAxios.addEmail(emailData);
            setSnackbarMessage('הדוא"ל נשלח בהצלחה');
            setSnackbarOpen(true);
            handleEmailDialogClose();
        } catch (error) {
            console.error('שגיאה בשליחת דוא"ל:', error.response ? error.response.data : error.message);
            setSnackbarMessage('שגיאה בשליחת דוא"ל');
            setSnackbarOpen(true);
        }
        handleEmailDialogClose()
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    const renderTable = () => (
        <>
            <Typography variant="h4" color={'black'} sx={{ mb: 2, fontWeight: 'bold' }} style={{ marginTop: '50px' }}>רשימת המשתמשים</Typography>
            <div style={{ padding: '20px', textAlign: 'center', direction: 'rtl', marginTop: '30px' }}>
                <TableContainer component={Paper} style={{ margin: '0 auto', maxWidth: '80%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ direction: 'rtl', fontWeight: 'bold', textAlign: 'center' }}>שם משתמש</TableCell>
                                <TableCell style={{ direction: 'rtl', fontWeight: 'bold', textAlign: 'center' }}>סוג משתמש</TableCell>
                                <TableCell style={{ direction: 'rtl', fontWeight: 'bold', textAlign: 'center' }}>אימייל</TableCell>
                                <TableCell style={{ direction: 'rtl', fontWeight: 'bold', textAlign: 'center' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managers.map((manager) => (
                                <TableRow key={manager.userId}>
                                    <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Avatar>{manager.person.firstName[0]}{manager.person.lastName[0]}</Avatar>
                                            <Box ml={1} flexGrow={1} textAlign="center">
                                                {manager.person.firstName} {manager.person.lastName}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {manager.userType.userTypeName}
                                    </TableCell>
                                    <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>
                                        {manager.person.email}
                                    </TableCell>
                                    <TableCell padding="none"><Tooltip title="לשליחת אימייל"><IconButton color="primary" onClick={() => handleEmailDialogOpen(manager.person.email || '')}>
                                        <MailIcon />
                                    </IconButton></Tooltip>
                                    </TableCell>
                                    <TableCell padding="none">
                                        <div style={{ padding: "0px 20px" }}>
                                            <Tooltip title="עריכת מנהל">
                                                <IconButton color="primary" onClick={() => handleEditOpen(manager)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>

                                    <TableCell padding="0px 20px">
                                        <Tooltip title="מחיקת מנהל">
                                            <IconButton color="primary" onClick={() => handleDeleteWarningOpen(manager)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>
                <Tooltip title='הוסף משתמש'>
                    <IconButton color="primary" onClick={handleAddOpen}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
    return (
        <>
            {renderTable()}
            <Dialog open={openEdit} onClose={handleEditClose} dir="rtl" //style={{ textAlign: 'center' }}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        minHeight: '50vh', // גובה מינימלי
                        maxHeight: '90vh', // גובה מקסימלי
                    },
                }}>
                <DialogTitle>ערוך מנהל</DialogTitle>
                <DialogContent>
                    <DialogContentText>ערוך את פרטי המנהל</DialogContentText>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    name="firstName"
                                    label="שם פרטי"
                                    type="text"
                                    fullWidth
                                    value={currentManager?.person?.firstName || ''}
                                    onChange={handleEditChange}
                                    error={!!firstNameError}
                                    helperText={firstNameError}
                                />
                                <TextField
                                    margin="dense"
                                    name="lastName"
                                    label="שם משפחה"
                                    type="text"
                                    fullWidth
                                    value={currentManager?.person?.lastName || ''}
                                    onChange={handleEditChange}
                                    error={!!lastNameError}
                                    helperText={lastNameError}
                                />
                                <TextField
                                    margin="dense"
                                    name="email"
                                    label="אימייל"
                                    type="text"
                                    fullWidth
                                    value={currentManager?.person?.email || ''}
                                    onChange={handleEditChange}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <FormControl fullWidth margin="dense">
                                    <InputLabel>סוג משתמש</InputLabel>
                                    <Select
                                        value={currentManager?.userType?.id}
                                        onChange={handleUserTypeEditChange}
                                        name="userType"
                                        label="סוג משתמש"
                                        MenuProps={{ PaperProps: { style: { direction: 'rtl' } } }}
                                    >
                                        {userTypes.filter((type) => type.id !== 2).map((type) => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.userTypeName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                </DialogContent>
                <DialogActions>
                    <Tooltip title='ביטול' style={{ top: '100%' }}>
                        <Button variant="contained" color="primary" style={{ margin: '15px' }} onClick={handleEditClose}>
                            <CancelIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title='שמור' style={{ bottom: '100%' }}>
                        <Button variant="contained" color="primary" style={{ marginLeft: '15px' }} onClick={handleEditSubmit} disabled={!!emailError}>
                            <SaveIcon />
                        </Button>
                    </Tooltip>
                </DialogActions>
            </Dialog>
            <Dialog open={openAdd} onClose={handleAddClose} style={{ textAlign: 'center' }} dir="rtl"
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        minHeight: '50vh', // גובה מינימלי
                        maxHeight: '90vh', // גובה מקסימלי
                    },
                }}>
                <DialogTitle>הוסף משתמש</DialogTitle>
                <DialogContent>
                    <DialogContentText>מלא את פרטי המשתמש החדש</DialogContentText>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    name="username"
                                    label="שם משתמש"
                                    type="text"
                                    fullWidth
                                    value={newManager.username}
                                    onChange={handleAddChange}
                                    autoComplete="new-password" // הוסף את התכונה הזו
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                    <Autocomplete
                        freeSolo
                        options={emailDomains.map((domain) => `${newManager.email.split('@')[0]}@${domain}`)}
                        renderInput={(params) => (
                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                    <div dir="rtl">
                                        <TextField
                                            {...params}
                                            margin="dense"
                                            name="email"
                                            label="אימייל"
                                            type="email"
                                            fullWidth
                                            value={newManager.email}
                                            onChange={handleAddChange}
                                            error={!!emailError}
                                            helperText={emailError}
                                            autoComplete="new-password" // הוסף את התכונה הזו
                                        />
                                    </div>
                                </ThemeProvider>
                            </CacheProvider>
                        )}
                    />
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    name="password"
                                    label="סיסמה"
                                    type="password"
                                    fullWidth
                                    value={newManager.password}
                                    onChange={handleAddChange}
                                    autoComplete="new-password" // הוסף את התכונה הזו
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <FormControl fullWidth margin="dense">
                                    <InputLabel>סוג משתמש</InputLabel>
                                    <Select
                                        value={newManager.userType}
                                        onChange={handleUserTypeChange}
                                        name="userType"
                                        label="סוג משתמש"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    direction: 'rtl',
                                                },
                                            },
                                        }}
                                    >
                                        {userTypes
                                            .filter((type) => type.userTypeId !== 2) // סינון אופציה מספר 2
                                            .map((type) => (
                                                <MenuItem
                                                    key={type.userTypeId}
                                                    value={type.userTypeId}>
                                                    {type.userTypeName}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleAddClose}>ביטול</Button>
                    <Button variant="contained" color="primary" onClick={handleAddSubmit} disabled={!!emailError}>הוסף</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteWarning} onClose={handleDeleteWarningClose} dir="rtl">
                <DialogTitle>אזהרה</DialogTitle>
                <DialogContent>
                    <DialogContentText>האם אתה בטוח שאתה רוצה למחוק את המנהל הזה?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleDeleteWarningClose}>ביטול</Button>
                    <Button variant="contained" style={{ margin: '16px' }} onClick={handleDeleteConfirm} color="error">מחק</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEmailDialog} onClose={handleEmailDialogClose} dir="rtl">
                <DialogTitle>שלח מייל</DialogTitle>
                <DialogContent>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    label="נמען"
                                    type="email"
                                    fullWidth
                                    value={emailRecipient}
                                    disabled
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    label="נושא"
                                    type="text"
                                    fullWidth
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    label="תוכן"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleEmailDialogClose}>ביטול</Button>
                    <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleEmailSend}>שלח</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};