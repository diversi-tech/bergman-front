import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Grid,
  List,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon, Add as AddIcon, ExpandLess } from '@mui/icons-material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import copanyAxios from '../axios/companyAxios'; // עדכן את הנתיב בהתאם למיקום הקובץ
import { useDispatch, useSelector } from 'react-redux';
import { FillCompnyData } from '../redux/action/companyAction';
import ReferralsAxios from '../axios/referralsAxios';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#DC004E',
    },
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(0);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openReferenceDialog, setOpenReferenceDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({ id: null, name: '', contactPerson: { firstName: '', lastName: '', phone: '', email: '' } });
  const [currentReference, setCurrentReference] = useState({ date: '', candidates: '' });
  const [errors, setErrors] = useState({});
  const [expandedCompanyId, setExpandedCompanyId] = useState(null);
  const [expandedReferenceId, setExpandedReferenceId] = useState(null);
  const [refrals,setRefrals]=useState([])
  const dispatch = useDispatch();
  const comany = useSelector(state => state.listCompany)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (comany > 0) {
          setCompanies(comany);
        }
        else {
          const response = await copanyAxios.getAll();
          setCompanies(response);
          dispatch(FillCompnyData(response.data));
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [dispatch, comany]);




  // const fetchCompanies = async () => {
  //   try {
  //     debugger
  //     const response = await copanyAxios.getAll();
  //     setCompanies(response.data);
  //   } catch (error) {
  //     console.error('Error fetching companies:', error);
  //   }
  // };

  const openAddCompanyDialog = () => {
    setIsEditing(false);
    setCurrentCompany({ id: null, name: '', contactPerson: { firstName: '', lastName: '', phone: '', email: '' } });
    setOpenFormDialog(true);
  };

  const openEditCompanyDialog = (company) => {
    debugger
    setIsEditing(true);
    setCurrentCompany(company);
    setOpenFormDialog(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contactPerson.')) {
      const contactField = name.split('.')[1];
      setCurrentCompany({ ...currentCompany, contactPerson: { ...currentCompany.contactPerson, [contactField]: value } });
    } else {
      setCurrentCompany({ ...currentCompany, [name]: value });
    }
  };

  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setCurrentReference({ ...currentReference, [name]: value });
  };

  const validateContact = () => {
    let tempErrors = {};
    if (!currentCompany.contactPerson.firstName) tempErrors.firstName = "שם פרטי הוא שדה חובה";
    if (!currentCompany.contactPerson.lastName) tempErrors.lastName = "שם משפחה הוא שדה חובה";
    if (!currentCompany.contactPerson.phone) {
      tempErrors.phone = "טלפון הוא שדה חובה";
    } else if (!/^\d{9,10}$/.test(currentCompany.contactPerson.phone)) {
      tempErrors.phone = "פורמט טלפון לא תקין, חייב להכיל 9 או 10 ספרות";
    }
    if (!currentCompany.contactPerson.email) {
      tempErrors.email = "מייל הוא שדה חובה";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentCompany.contactPerson.email)) {
      tempErrors.email = "פורמט מייל לא תקין";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveCompany = () => {
    setOpenFormDialog(false);
    setOpenContactDialog(true);
  };



  const saveContact = async () => {
    if (validateContact()) {
      try {
        if (isEditing) {
          await copanyAxios.update(currentCompany.id, currentCompany);
        }
        else {
          await copanyAxios.create(currentCompany);
        }
        // fetchCompanies();
        try {
          const response = await copanyAxios.getAll();
          setCompanies(response);
          dispatch(FillCompnyData(response.data));
          setOpenContactDialog(false);
        }
        catch (error) {
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error saving company:', error);
      }
    }
  };

  const confirmDelete = (companyId) => {
    setCompanyToDelete(companyId);
    setShowDeleteConfirmation(true);
  };

  const deleteContact = async () => {
    const dell = await copanyAxios.delete(companyToDelete);
    if (dell) {
      const response = await copanyAxios.getAll();
      setCompanies(response);
      dispatch(FillCompnyData(response.data));
      setOpenContactDialog(false);
      alert("צריך להציג הודעה שנמחק בהצלחה")
    }
    else {
      setShowDeleteConfirmation(false);
      setCompanyToDelete(null);
    }
  };



  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setCompanyToDelete(null);
  };

  const handleExpandClick = (id) => {
    debugger
    setExpandedCompanyId(expandedCompanyId === id ? null : id);
  };

  // const handleExpandReferenceClick = async (id) => {
  //   debugger
  //   setExpandedReferenceId(expandedReferenceId === id ? null : id);
  //   const refral=await getReferralByComanyId(id)

  // };
  // const handleExpandReferenceClick = async (id) => {
  //   debugger
  //   setExpandedReferenceId(expandedReferenceId === id ? null : id);
  //   const references = await ReferralsAxios.getAllReferrals();
  //     references.map(company => comany.referralSource!= null && comany.referralSource.id==id ? setRefrals(company) : null);
  // };

  // לחברה חיפוש הפניה
  const handleExpandReferenceClick = async (id) => {
    setExpandedReferenceId(expandedReferenceId === id ? null : id);
    const references = await ReferralsAxios.getAllReferrals();
    setRefrals(prevReferrals => {
        const updatedReferrals = [...prevReferrals];
        references.forEach(company => {
            if (company.referralSource && company.referralSource.id === id) {
                updatedReferrals.push(company);
            }
        });
        return updatedReferrals;
    });
};

  const getReferencesForCompany = (companyId) => {
    const company = companies.find(company => company.id === companyId);
    return company && company.references ? company.references : [];
  };

  const openAddReferenceDialog = (companyId) => {
    setCurrentCompany(companies.find(company => company.id === companyId));
    setCurrentReference({ date: '', candidates: '' });
    setOpenReferenceDialog(true);
  };

  const saveReference = () => {
    const updatedCompanies = companies.map(company => {
      if (company.id === currentCompany.id) {
        const updatedReferences = [...getReferencesForCompany(company.id), {
          date: currentReference.date,
          candidates: currentReference.candidates.split(',')
        }];
        return { ...company, references: updatedReferences };
      }
      return company;
    });

    setCompanies(updatedCompanies);
    setOpenReferenceDialog(false);
  };

  const deleteReference = (companyId, referenceIndex) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          const updatedReferences = company.references.filter((_, index) => index !== referenceIndex);
          return { ...company, references: updatedReferences };
        }
        return company;
      })
    );
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box dir="rtl" display="flex" flexDirection="column" minHeight="100vh" p={3}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <IconButton color="primary" onClick={openAddCompanyDialog}>
              <AddIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {companies.map((company) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                <Paper elevation={3} style={{ overflow: 'hidden', textAlign: 'center', padding: '16px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {company.companyName}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" component="span">
                      איש קשר
                    </Typography>
                    <IconButton
                      onClick={() => handleExpandClick(company.id)}
                      aria-expanded={expandedCompanyId === company.id}
                      aria-label="show more"
                    >
                      {expandedCompanyId === company.id ? <ExpandLess /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedCompanyId === company.id} timeout="auto" unmountOnExit>
                    <Box p={2}>
                      <Typography>שם פרטי: {company.contact.firstName}</Typography>
                      <Typography>שם משפחה: {company.contact.lastName}</Typography>
                      <Typography>טלפון: {company.contact.phone}</Typography>
                      <Typography>מייל: {company.contact.email}</Typography>
                      <Box mt={2}>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => { openEditCompanyDialog(company); }}
                          style={{ marginRight: '8px' }}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => { e.stopPropagation(); confirmDelete(company.id); }}
                        >
                          מחק
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Typography variant="body2" component="span">
                      הפניות
                    </Typography>
                    <IconButton
                      onClick={() => handleExpandReferenceClick(company.id)}
                      aria-expanded={expandedReferenceId === company.id}
                      aria-label="show more"
                    >
                      {expandedReferenceId === company.id ? <ExpandLess /> : <ExpandMoreIcon />}
                    </IconButton>                 
                    <Button onClick={() => openAddReferenceDialog(company.id)} color="primary">
                      הוסף הפניה
                    </Button>
                    {refrals.map((r) => (
                      <Box p={2}>
                        <Typography> תאריך הפניה:{r.updatedAt}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Collapse in={expandedReferenceId === company.id} timeout="auto" unmountOnExit>
                    <Box mt={2}>
                      {getReferencesForCompany(company.id).map((reference, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="body2" component="div">תאריך: {reference.date}</Typography>
                          <Typography variant="body2" component="div">מועמדים:</Typography>
                          <List>
                            {reference.candidates.map((candidate, idx) => (
                              <ListItem key={idx}>
                                <ListItemText primary={candidate} />
                              </ListItem>
                            ))}
                          </List>
                          <Button onClick={() => deleteReference(company.id, index)} color="secondary">
                            מחק פניה
                          </Button>
                          {index < getReferencesForCompany(company.id).length - 1 && <Divider />}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle>{isEditing ? 'ערוך חברה' : 'הוסף חברה חדשה'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                נא למלא את הפרטים הבאים:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="שם החברה"
                type="text"
                fullWidth
                variant="outlined"
                value={currentCompany.name}
                onChange={handleFormChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenFormDialog(false)} color="primary">
                ביטול
              </Button>
              <Button onClick={saveCompany} color="primary">
                המשך
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openContactDialog} onClose={() => setOpenContactDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle>פרטי איש קשר</DialogTitle>
            <DialogContent>
              <DialogContentText>
                נא למלא את פרטי איש הקשר של החברה:
              </DialogContentText>
              <TextField
                margin="dense"
                name="contactPerson.firstName"
                label="שם פרטי"
                type="text"
                fullWidth
                variant="outlined"
                value={currentCompany.contactPerson.firstName}
                onChange={handleFormChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                margin="dense"
                name="contactPerson.lastName"
                label="שם משפחה"
                type="text"
                fullWidth
                variant="outlined"
                value={currentCompany.contactPerson.lastName}
                onChange={handleFormChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                margin="dense"
                name="contactPerson.phone"
                label="טלפון"
                type="text"
                fullWidth
                variant="outlined"
                value={currentCompany.contactPerson.phone}
                onChange={handleFormChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                margin="dense"
                name="contactPerson.email"
                label="מייל"
                type="email"
                fullWidth
                variant="outlined"
                value={currentCompany.contactPerson.email}
                onChange={handleFormChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenContactDialog(false)} color="primary">
                ביטול
              </Button>
              <Button onClick={saveContact} color="primary">
                שמור
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openReferenceDialog} onClose={() => setOpenReferenceDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle>הוסף פניה</DialogTitle>
            <DialogContent>
              <DialogContentText>
                נא למלא את פרטי הפניה:
              </DialogContentText>
              <TextField
                margin="dense"
                name="date"
                label="תאריך"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={currentReference.date}
                onChange={handleReferenceChange}
              />
              <TextField
                margin="dense"
                name="candidates"
                label="מועמדים"
                type="text"
                fullWidth
                variant="outlined"
                value={currentReference.candidates}
                onChange={handleReferenceChange}
                helperText="הכנס שמות מועמדים מופרדים בפסיקים"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenReferenceDialog(false)} color="primary">
                ביטול
              </Button>
              <Button onClick={saveReference} color="primary">
                שמור
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={showDeleteConfirmation} onClose={cancelDelete} maxWidth="xs" fullWidth>
            <DialogTitle>מחיקת חברה</DialogTitle>
            <DialogContent>
              <DialogContentText>
                האם אתה בטוח שברצונך למחוק חברה זו?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="primary">
                ביטול
              </Button>
              <Button onClick={deleteContact} color="secondary">
                מחק
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default CompanyManagement;



