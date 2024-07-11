
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel,
    MenuItem, Paper, Select, TextField, IconButton, Typography, Grid, Tooltip,
    ListItem, List, Collapse
} from '@mui/material';
import { ExpandMore, ExpandLess, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import optionsrAxios from '../axios/optionsAxios';
import { optionsAction } from '../redux/action/optionsAction';
import enumAxios from '../axios/enumAxios';
import { enamActions } from '../redux/action/enamActions';

const theme = createTheme({
    direction: 'rtl',
    palette: {
        mode: 'light',
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

    const renderList = () => (
        <Grid container spacing={2} style={{ padding: '20px', direction: 'rtl', justifyContent: 'center' }}>
            <Grid item xs={12} style={{ maxWidth: '300px' }}>
                <Paper style={{ padding: '20px', border: '1px solid #ccc', width: '100%' }}>
                    <List>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body2" color="textSecondary" style={{ marginRight: '8px' }}>
                                            {category.name}
                                        </Typography>
                                        <IconButton onClick={() => handleExpandClick(category.id)}>
                                            {expandedCategory === category.id ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </div>
                                    <div>
                                        <Tooltip title="ערוך">
                                            <IconButton onClick={() => handleEditOpen(category)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="הוסף">
                                            <IconButton onClick={() => handleEditOpen(category)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </ListItem>
                                <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {data.filter(item => item.category === category.name).map((item, index) => (
                                            <ListItem key={index} style={{ paddingRight: '32px' }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {item.name}
                                                </Typography>
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
        <>
            {renderList()}

            <Dialog open={openEdit} onClose={handleEditClose} style={{ textAlign: 'center' }} dir="rtl"
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        minHeight: '50vh',
                        maxHeight: '90vh',
                    },
                }}>
                <DialogTitle>ערוך קטגוריה</DialogTitle>
                <DialogContent>
                    <DialogContentText>מלאי את הנתון לקטגוריה ולאיזה קטגוריה לשייך אותו</DialogContentText>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    margin="dense"
                                    name="name"
                                    label="שם פריט"
                                    type="text"
                                    fullWidth
                                    value={currentItem.name || ''}
                                    onChange={handleEditChange}
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>

                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <FormControl fullWidth margin="dense">
                                    <InputLabel>סוג הקטגוריה</InputLabel>
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
                                            <MenuItem
                                                key={category.id}
                                                value={category.name}>
                                                {category.name}
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
                    <Button variant="contained" color="primary" onClick={handleEditSubmit} >שמור שינויים</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
