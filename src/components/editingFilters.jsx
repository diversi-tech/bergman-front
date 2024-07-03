import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@emotion/react';


export const EditingFilters = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

        const theme = useTheme();
        const [personName, setPersonName] = React.useState([]);
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        // function handleChange (){(event: import('@mui/material').SelectChangeEvent<typeof personName>) => {
        //     const {
        //         target: { value },
        //     } 
        //     setPersonName(
        //         // On autofill we get a stringified value.
        //         typeof value === 'string' ? value.split(',') : value,
        //     ),event;
        // }

        const handleSubmit = async (e) => {
            e.preventDefault();

            const emailData = {
                to: to.split(',').map(email => email.trim()), // נפריד את הנמענים לפי פסיק
                subject,
                body
            };
           
            try {
                const response = await fetch('/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(emailData),
                });

                if (response.ok) {
                    alert('Email sent successfully!');
                } else {
                    alert('Failed to send email');
                }
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Failed to send email');
            }
        };
        const handleChange=(string)=>{
                
        }

        return (
            <Container maxWidth="sm" >
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Send Email
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChange(personName)}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            //style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* <TextField
            fullWidth
            label="To"
            type="text"
            id="to"
            name="to"
            placeholder="Separate emails with a comma"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            margin="normal"
          /> */}
                        <TextField
                            fullWidth
                            label="Subject"
                            type="text"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Body"
                            type="text"
                            id="body"
                            name="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Send Email
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container >
        );
    };

