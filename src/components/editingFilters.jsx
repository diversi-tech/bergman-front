import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel,
    MenuItem, Paper, Select, TextField, IconButton, Typography, Grid, Tooltip,
    ListItem, List, Collapse, Divider, Box
} from '@mui/material';
import { ExpandMore, ExpandLess, Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const theme = createTheme({
    direction: 'rtl',
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const sampleData = [
    { id: 1, category: 'טכנולוגיות', name: 'React' },
    { id: 2, category: 'שפות תכנות', name: 'JavaScript' },
    { id: 3, category: 'מיקום', name: 'ישראל' },
];

const sampleCategories = [
    { id: 1, name: 'טכנולוגיות' },
    { id: 2, name: 'שפות תכנות' },
    { id: 3, name: 'מיקום' },
];

export const EditingFilters = () => {
    const [data, setData] = useState(sampleData);
    const [categories] = useState(sampleCategories);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [emailError, setEmailError] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleEditOpen = (item) => {
        setCurrentItem(item);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setEmailError('');
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setCurrentItem({ ...currentItem, category });
    };

    const handleEditSubmit = () => {
        if (emailError) return;
        setData(data.map(item => item.id === currentItem.id ? currentItem : item));
        setOpenEdit(false);
    };

    const handleExpandClick = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleDeleteDialogOpen = (item) => {
        setItemToDelete(item);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleDelete = () => {
        if (itemToDelete) {
            setData(data.filter(item => item.id !== itemToDelete.id));
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const renderList = () => (
        <Grid container spacing={2} style={{ padding: '80px', direction: 'rtl', justifyContent: 'center', height: '80vh' }}>
            <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
                        קטגוריות
                    </Typography>
                    <List style={{ height: '100%', overflow: 'auto' }}>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body1" style={{ marginRight: '8px', fontSize: '1.2rem' }}>
                                            {category.name}
                                        </Typography>
                                        <IconButton onClick={() => handleExpandClick(category.id)}>
                                            {expandedCategory === category.id ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </div>
                                    <Tooltip title="הוסף">
                                        <IconButton color="primary" onClick={() => handleEditOpen(category)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                                <Divider />
                                <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {data.filter(item => item.category === category.name).map((item, index) => (
                                            <ListItem key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" style={{ fontSize: '1rem' }}>
                                                    {item.name}
                                                </Typography>
                                                <div>
                                                    <Tooltip title="ערוך">
                                                        <IconButton color="secondary" onClick={() => handleEditOpen(item)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="מחק">
                                                        <IconButton color="error" onClick={() => handleDeleteDialogOpen(item)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Box dir="rtl">
                    {renderList()}

                    <Dialog open={openEdit} onClose={handleEditClose} fullWidth maxWidth="sm">
                        <DialogTitle style={{ textAlign: 'right' }}>ערוך קטגוריה</DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{ textAlign: 'right' }}>
                                מלאי את הנתון לקטגוריה ולאיזה קטגוריה לשייך אותו
                            </DialogContentText>
                            <TextField
                                margin="dense"
                                name="name"
                                label="שם פריט"
                                type="text"
                                fullWidth
                                value={currentItem.name || ''}
                                onChange={handleEditChange}
                                InputProps={{
                                    style: { textAlign: 'right' }, // Align text to the right
                                }}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel style={{ textAlign: 'right' }}>סוג הקטגוריה</InputLabel>
                                <Select
                                    value={currentItem.category || ''}
                                    onChange={handleCategoryChange}
                                    name="category"
                                    label="סוג הקטגוריה"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                direction: 'rtl',
                                            },
                                        },
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditClose} color="primary">
                                ביטול
                            </Button>
                            <Button onClick={handleEditSubmit} color="primary">
                                שמור שינויים
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleDeleteDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"אישור מחיקה"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                האם אתה בטוח שברצונך למחוק את הפריט?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose} color="primary">
                                ביטול
                            </Button>
                            <Button onClick={handleDelete} color="primary" autoFocus>
                                אישור
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
};

