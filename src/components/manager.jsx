import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import {
    Alert, Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton,
    InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip,
    Typography
} from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// import { renderButtons, renderTable } from './yourHelperFunctions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import userAxios from '../axios/userAxios';
import userTypeAxios from '../axios/userTypeAxios';
import { FillUsersData } from '../redux/action/userAction';
import { FillUsersTypeData } from '../redux/action/userTypeAction';
import AddIcon from '@mui/icons-material/Add';

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
    const [managers, setManagers] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentManager, setCurrentManager] = useState({});
    const [newManager, setNewManager] = useState({ username: '', email: '', password: '', createdAt: new Date() });
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState(null);
    const [emailError, setEmailError] = useState('');
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentManager({ ...currentManager, [name]: value });
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('כתובת מייל לא תקינה');
            } else {
                setEmailError('');
            }
        }
    };

    const handleAddChange = (e) => {
        debugger
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
        const userType = e.target.value;
        setCurrentManager({ ...currentManager, userType });
    };

    const handleEditSubmit = async () => {
        if (emailError) return;
        try {
            await userAxios.updateUser(currentManager.userId, currentManager);
            setOpenEdit(false);
            const managers1 = await userAxios.getAllManagers();
            setManagers(managers1);
            dispatch(FillUsersData(managers1));
            setSnackbarMessage(`המשתמש ${currentManager.username} עודכן בהצלחה`);
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

    // const handleEmailSend = () => {
    //     window.open(`mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
    //     handleEmailDialogClose();
    // };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

        const renderButtons = () => (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', direction: 'rtl' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddOpen}
                style={{ marginBottom: '20px', padding: '20px 40px', fontSize: '20px' }}
            >הוסף מנהל</Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowTable(true)}
                style={{ padding: '20px 40px', fontSize: '20px' }}
            >
                הצג מנהלים
            </Button>
        </div>
    );

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
                                            <Avatar>{manager.username[0]}</Avatar>
                                            <Box ml={1} flexGrow={1} textAlign="center"> {/* flexGrow כדי למלא את השורה */}
                                                {manager.username}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {userTypes.find(type => type.userTypeId === manager.userType)?.userTypeName || 'N/A'}
                                    </TableCell>
                                    <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>
                                        {manager.email}


                                    </TableCell>


                                    <TableCell padding="none"><Tooltip title="לשליחת אימייל"><IconButton color="primary" onClick={() => handleEmailDialogOpen(manager.email || '')}>
                                        <MailIcon />
                                    </IconButton></Tooltip>
                                    </TableCell>

                                    <TableCell padding="none">
                                        <Tooltip title="עריכת מנהל">
                                            <IconButton color="primary" onClick={() => handleEditOpen(manager)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
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
                                    name="username"
                                    label="שם משתמש"
                                    type="text"
                                    fullWidth
                                    value={currentManager.username}
                                    onChange={handleEditChange}
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>

                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    name="email"
                                    label="אימייל"
                                    type="text"
                                    fullWidth
                                    value={currentManager.email}
                                    onChange={handleEditChange}
                                    error={!!emailError}
                                    helperText={emailError}
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
                                        value={currentManager.userType}
                                        onChange={handleUserTypeEditChange}
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

                    <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleEditClose}>ביטול</Button>
                    <Button variant="contained" color="primary" style={{ marginT: '16px' }} onClick={handleEditSubmit} disabled={!!emailError}>שמור</Button>
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
        <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleAddClose }>ביטול</Button>
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
                    {/* <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleEmailSend}>שלח</Button> */}
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


// import createCache from '@emotion/cache';
// import { CacheProvider } from '@emotion/react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import MailIcon from '@mui/icons-material/Mail';
// import {
//     Alert, Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton,
//     InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip,
//     Typography
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { prefixer } from 'stylis';
// import rtlPlugin from 'stylis-plugin-rtl';
// import userAxios from '../axios/userAxios';
// import userTypeAxios from '../axios/userTypeAxios';
// import { FillUsersData } from '../redux/action/userAction';
// import { FillUsersTypeData } from '../redux/action/userTypeAction';
// import AddIcon from '@mui/icons-material/Add';

// const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'walla.co.il', 'hotmail.com'];
// const theme =
//     createTheme({
//         direction: 'rtl',
//         palette: {
//             mode: 'light',
//         },
//     });

// const cacheRtl = createCache({
//     key: 'muirtl',
//     stylisPlugins: [prefixer, rtlPlugin],
// });

// export const Manager = () => {
//     const dispatch = useDispatch();
//     const users1 = useSelector(state => state.listUsers);
//     const [users, setUsers] = useState([]);

//     const [userTypes, setUserType] = useState([]);
//     const [managers, setManagers] = useState([]);
//     const [openEdit, setOpenEdit] = useState(false);
//     const [openAdd, setOpenAdd] = useState(false);
//     const [currentManager, setCurrentManager] = useState({});
//     const [newManager, setNewManager] = useState({ username: '', email: '', password: '', createdAt: new Date() });
//     const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
//     const [managerToDelete, setManagerToDelete] = useState(null);
//     const [emailError, setEmailError] = useState('');
//     const [openEmailDialog, setOpenEmailDialog] = useState(false);
//     const [emailRecipient, setEmailRecipient] = useState('');
//     const [emailSubject, setEmailSubject] = useState('');
//     const [emailBody, setEmailBody] = useState('');
//     const [showTable, setShowTable] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (users1 && users1.length > 0) {
//                     setUsers(users1)
//                     dispatch(FillUsersData(users1));
//                     const managers1 = await userAxios.getAllManagers();
//                     setManagers(managers1);
//                 } else {
//                     const users1 = await userAxios.getAllUsers();
//                     const managers1 = await userAxios.getAllManagers();
//                     const data1 = await userTypeAxios.getAllUserTypes();
//                     dispatch(FillUsersTypeData(data1));
//                     setUserType(data1);
//                     dispatch(FillUsersData(users1));
//                     setManagers(managers1);
//                 }
//                 setShowTable(true);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [dispatch]);

//     useEffect(() => {
//         console.log('users:', users);
//         console.log('managers:', managers);
//         console.log('showTable:', showTable);
//     }, [users, managers, showTable]);

//     const handleEditOpen = (manager) => {
//         setCurrentManager(manager);
//         setOpenEdit(true);
//     };

//     const handleEditClose = () => {
//         setOpenEdit(false);
//         setEmailError('');
//     };

//     const handleAddOpen = () => {
//         setNewManager({ username: '', email: '', password: '', createdAt: new Date() });
//         setOpenAdd(true);
//     };

//     const handleAddClose = () => {
//         setNewManager({ username: '', email: '', password: '', createdAt: new Date() });
//         setEmailError('');
//         setOpenAdd(false);
//     };

//     const handleDeleteWarningOpen = (manager) => {
//         setManagerToDelete(manager);
//         setOpenDeleteWarning(true);
//     };

//     const handleDeleteWarningClose = () => {
//         setOpenDeleteWarning(false);
//         setManagerToDelete(null);
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             await userAxios.deleteUser(managerToDelete.userId);
//             const managers1 = await userAxios.getAllManagers();
//             setManagers(managers1);
//             dispatch(FillUsersData(managers1));
//             setSnackbarMessage(`המשתמש ${managerToDelete.username} נמחק בהצלחה`);
//             setSnackbarOpen(true);
//             handleDeleteWarningClose();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const validateEmail = (email) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentManager({ ...currentManager, [name]: value });
//         if (name === 'email') {
//             if (!validateEmail(value)) {
//                 setEmailError('כתובת מייל לא תקינה');
//             } else {
//                 setEmailError('');
//             }
//         }
//     };

//     const handleAddChange = (e) => {
//         const { name, value } = e.target;
//         setNewManager({ ...newManager, [name]: value });
//         if (name === 'email') {
//             if (!validateEmail(value)) {
//                 setEmailError('כתובת מייל לא תקינה');
//             } else {
//                 setEmailError('');
//             }
//         }
//     };

//     const handleUserTypeChange = (e) => {
//         const userType = e.target.value;
//         setNewManager({ ...newManager, userType });
//     };

//     const handleUserTypeEditChange = (e) => {
//         const userType = e.target.value;
//         setCurrentManager({ ...currentManager, userType });
//     };

//     const handleEditSubmit = async () => {
//         if (emailError) return;
//         try {
//             await userAxios.updateUser(currentManager.userId, currentManager);
//             setOpenEdit(false);
//             const managers1 = await userAxios.getAllManagers();
//             setManagers(managers1);
//             dispatch(FillUsersData(managers1));
//             setSnackbarMessage(`המשתמש ${currentManager.username} עודכן בהצלחה`);
//             setSnackbarOpen(true);
//         } catch (error) {
//             console.error('Error updating manager:', error);
//         }
//     };

//     const handleAddSubmit = async () => {
//         if (emailError) return;
//         try {
//             await userAxios.addUser(newManager);
//             setOpenAdd(false);
//             const managers1 = await userAxios.getAllManagers();
//             setManagers(managers1);
//             dispatch(FillUsersData(managers1));
//             setSnackbarMessage(`המשתמש ${newManager.username} נוסף בהצלחה`);
//             setSnackbarOpen(true);
//         } catch (error) {
//             console.error('Error adding manager:', error);
//         }
//     };

//     const handleEmailDialogOpen = (email) => {
//         setEmailRecipient(email);
//         setOpenEmailDialog(true);
//     };

//     const handleEmailDialogClose = () => {
//         setOpenEmailDialog(false);
//         setEmailRecipient('');
//         setEmailSubject('');
//         setEmailBody('');
//     };

//     const handleSnackbarClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setSnackbarOpen(false);
//     };

//     const renderTable = () => (
//         <>
//             <Typography variant="h4" color={'black'} sx={{ mb: 2, fontWeight: 'bold' }} style={{ marginTop: '50px' }}>רשימת המשתמשים</Typography>
//             <div style={{ padding: '20px', textAlign: 'center', direction: 'rtl', marginTop: '30px' }}>
//                 <TableContainer component={Paper} style={{ margin: '0 auto', maxWidth: '80%' }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>שם משתמש</TableCell>
//                                 <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>סוג משתמש</TableCell>
//                                 <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>אימייל</TableCell>
//                                 <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>פעולות</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {managers.map((manager) => (
//                                 <TableRow key={manager.userId}>
//                                     <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>{manager.username}</TableCell>
//                                     <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>{manager.userType?.typeName}</TableCell>
//                                     <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>{manager.email}</TableCell>
//                                     <TableCell style={{ direction: 'rtl', textAlign: 'center' }}>
//                                         <Tooltip title="ערוך">
//                                             <IconButton onClick={() => handleEditOpen(manager)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="מחק">
//                                             <IconButton onClick={() => handleDeleteWarningOpen(manager)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="שלח מייל">
//                                             <IconButton onClick={() => handleEmailDialogOpen(manager.email)}>
//                                                 <MailIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <Tooltip title="הוסף משתמש">
//                     <Button
//                         onClick={handleAddOpen}
//                         variant="contained"
//                         color="primary"
//                         startIcon={<AddIcon />}
//                         sx={{ marginTop: '30px', direction: 'rtl' }}
//                     >
//                         הוסף משתמש
//                     </Button>
//                 </Tooltip>
//             </div>
//         </>
//     );

//     return (
//         <CacheProvider value={cacheRtl}>
//             <ThemeProvider theme={theme}>
//                 <Box sx={{ textAlign: 'center', mb: 2, direction: 'rtl' }}>
//                     <Typography variant="h4" color={'black'} sx={{ mb: 2, fontWeight: 'bold' }} style={{ marginTop: '50px' }}>ניהול משתמשים</Typography>
//                     {showTable && renderTable()}
//                 </Box>

//                 <Dialog open={openEdit} onClose={handleEditClose}>
//                     <DialogTitle>ערוך משתמש</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             name="username"
//                             label="שם משתמש"
//                             type="text"
//                             fullWidth
//                             value={currentManager.username || ''}
//                             onChange={handleEditChange}
//                         />
//                         <TextField
//                             margin="dense"
//                             name="email"
//                             label="אימייל"
//                             type="email"
//                             fullWidth
//                             value={currentManager.email || ''}
//                             onChange={handleEditChange}
//                             error={!!emailError}
//                             helperText={emailError}
//                         />
//                         <TextField
//                             margin="dense"
//                             name="password"
//                             label="סיסמה"
//                             type="password"
//                             fullWidth
//                             value={currentManager.password || ''}
//                             onChange={handleEditChange}
//                             autoComplete="new-password"
//                         />
//                         <FormControl fullWidth margin="dense">
//                             <InputLabel>סוג משתמש</InputLabel>
//                             <Select
//                                 name="userType"
//                                 value={currentManager.userType?.userTypeId || ''}
//                                 onChange={handleUserTypeEditChange}
//                             >
//                                 {userTypes.map((type) => (
//                                     <MenuItem key={type.userTypeId} value={type.userTypeId}>
//                                         {type.typeName}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleEditClose} color="primary">ביטול</Button>
//                         <Button onClick={handleEditSubmit} color="primary">שמור</Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Dialog open={openAdd} onClose={handleAddClose}>
//                     <DialogTitle>הוסף משתמש</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             name="username"
//                             label="שם משתמש"
//                             type="text"
//                             fullWidth
//                             value={newManager.username}
//                             onChange={handleAddChange}
//                             autoComplete="off"
//                         />
//                         <TextField
//                             margin="dense"
//                             name="email"
//                             label="אימייל"
//                             type="email"
//                             fullWidth
//                             value={newManager.email}
//                             onChange={handleAddChange}
//                             error={!!emailError}
//                             helperText={emailError}
//                         />
//                         <TextField
//                             margin="dense"
//                             name="password"
//                             label="סיסמה"
//                             type="password"
//                             fullWidth
//                             value={newManager.password}
//                             onChange={handleAddChange}
//                             autoComplete="new-password"
//                         />
//                         <FormControl fullWidth margin="dense">
//                             <InputLabel>סוג משתמש</InputLabel>
//                             <Select
//                                 name="userType"
//                                 value={newManager.userType || ''}
//                                 onChange={handleUserTypeChange}
//                             >
//                                 {userTypes.map((type) => (
//                                     <MenuItem key={type.userTypeId} value={type.userTypeId}>
//                                         {type.typeName}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleAddClose} color="primary">ביטול</Button>
//                         <Button onClick={handleAddSubmit} color="primary">שמור</Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Dialog open={openDeleteWarning} onClose={handleDeleteWarningClose}>
//                     <DialogTitle>אזהרת מחיקה</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             האם אתה בטוח שברצונך למחוק את המשתמש {managerToDelete?.username}?
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleDeleteWarningClose} color="primary">ביטול</Button>
//                         <Button onClick={handleDeleteConfirm} color="secondary">מחק</Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Dialog open={openEmailDialog} onClose={handleEmailDialogClose}>
//                     <DialogTitle>שלח מייל</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             margin="dense"
//                             label="נמען"
//                             type="email"
//                             fullWidth
//                             value={emailRecipient}
//                             disabled
//                         />
//                         <TextField
//                             margin="dense"
//                             label="נושא"
//                             type="text"
//                             fullWidth
//                             value={emailSubject}
//                             onChange={(e) => setEmailSubject(e.target.value)}
//                         />
//                         <TextField
//                             margin="dense"
//                             label="תוכן המייל"
//                             type="text"
//                             fullWidth
//                             multiline
//                             rows={4}
//                             value={emailBody}
//                             onChange={(e) => setEmailBody(e.target.value)}
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleEmailDialogClose} color="primary">ביטול</Button>
//                         <Button color="primary">שלח</Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Snackbar
//                     open={snackbarOpen}
//                     autoHideDuration={6000}
//                     onClose={handleSnackbarClose}
//                     message={snackbarMessage}
//                 />
//             </ThemeProvider>
//         </CacheProvider>
//     );
// };
