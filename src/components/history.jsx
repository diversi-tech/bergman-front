import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper, TextField, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // אייקון הוספה
import './history.css';

export const History = () => {
    const userName = "מוריה דויד";
    const email = "moriya1519@gmail.com";
    const phone = "0527101519";
    const [showDetails, setShowDetails] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); // מצב לניהול הצגת הטופס

    const handleDetails = () => {
        setShowDetails(true);
    };

    const [orders, setOrders] = useState([
        { date: '16 Mar, 2019', name: 'Elvis Presley', location: 'Tupelo, MS' },
        { date: '16 Mar, 2019', name: 'Paul McCartney', location: 'London, UK' },
        { date: '16 Mar, 2019', name: 'Tom Scholz', location: 'Boston, MA' },
        { date: '16 Mar, 2019', name: 'Michael Jackson', location: 'Gary, IN' },
        { date: '15 Mar, 2019', name: 'Bruce Springsteen', location: 'Long Branch, NJ' }
    ]);

    const [newOrder, setNewOrder] = useState({ date: '', name: '', location: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const addOrder = () => {
        setOrders([...orders, newOrder]);
        setNewOrder({ date: '', name: '', location: '' });
        setShowAddForm(false); // הסתרת הטופס לאחר ההוספה
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm); // שינוי המצב להצגת או הסתרת הטופס
    };

    return (
        <Box p={3} sx={{ direction: 'rtl' }}>
            <Typography variant="h4" gutterBottom fontWeight='bold'>היסטוריית מועמד</Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <div className="details">
                    <label className="lbl">שם: {userName}</label>
                    <label className="lbl" style={{ flexBasis: '50%' }}>מייל: {email}</label>
                    <label className="lbl">פלאפון: {phone}</label>
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
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell align='center'>{order.date}</TableCell>
                                <TableCell align='center'>{order.name}</TableCell>
                                <TableCell align='center'>{order.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* כפתור הוספה עם Tooltip */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                <Tooltip title="הוספת היסטוריה" arrow>
                    <IconButton
                        onClick={toggleAddForm}
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

            {/* טופס להוספת הזמנות חדשות */}
            {showAddForm && (
                <Box p={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        label="תאריך"
                        name="date"
                        value={newOrder.date}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1 }}
                    />
                    <TextField
                        label="שם החברה"
                        name="name"
                        value={newOrder.name}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1 }}
                    />
                    <TextField
                        label="תגובה"
                        name="location"
                        value={newOrder.location}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" onClick={addOrder}>הוסף</Button>
                </Box>
            )}

            <Button variant="contained" onClick={handleDetails}>
                להצגת כל פרטי המועמד
            </Button>
            {showDetails && (
                <Box p={3} sx={{ direction: 'rtl' }}>
                    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px', height: '650px'
                            }}>
                                <h2>פרטי מועמד</h2>
                                <div className="moreDetails"><label>מיקום:</label></div>
                                <br />
                                <div className="moreDetails"><label>וותק:</label></div>
                                <br />
                                <div className="moreDetails" style={{ height: '400px' }}><label>כישורים</label>
                                    <br />
                                    <div className="moreDetailsPnimi"><label>טכנולוגיות:</label></div>
                                    <br />
                                    <div className="moreDetailsPnimi"><label>שפות תכנות:</label></div>
                                    <br />
                                    <div className="moreDetailsPnimi"><label>שפות:</label></div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

