import React , { useState }from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, IconButton, Typography, Grid } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import './candidateDetails.css';

export const History = () => {

    const initialDetails = {
        userName: "מוריה דויד",
        email: "moriya1519@gmail.com",
        phone: "0527101519",
        location: "תל אביב",
        experience: "5 שנים",
        skills: {
            technologies: "React, Node.js",
            programmingLanguages: "JavaScript, Python",
            languages: "עברית, אנגלית"
        }
    };

    const [candidateDetails, setCandidateDetails] = useState(initialDetails);
    const [editableFields, setEditableFields] = useState({});
    const [tempDetails, setTempDetails] = useState(initialDetails);
    const [showDetails, setShowDetails] = useState(false);

    const handleEditToggle = (field) => {
        if (editableFields[field]) {
            setEditableFields({ ...editableFields, [field]: false });
        } else {
            setEditableFields({ ...editableFields, [field]: true });
            setTempDetails(candidateDetails); // Set temp details on edit start
        }
    };

    const handleDetailChange = (event) => {
        const { name, value } = event.target;
        setTempDetails({ ...tempDetails, [name]: value });
    };

    const handleSkillsChange = (event) => {
        const { name, value } = event.target;
        setTempDetails({
            ...tempDetails,
            skills: {
                ...tempDetails.skills,
                [name]: value
            }
        });
    };

    const handleSave = (field) => {
        setCandidateDetails(tempDetails);
        setEditableFields({ ...editableFields, [field]: false });
    };

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const handleDetailsShow = () => {
        setShowDetails(true);
    };

    const renderEditableField = (fieldName, label, value, onChangeHandler) => (
        <Grid container alignItems="center" spacing={2} mt={2}>
            <Grid item>
                {editableFields[fieldName] ? (
                    <TextField
                        label={label}
                        name={fieldName}
                        value={value}
                        onChange={onChangeHandler}
                        margin="normal"
                        size="small"
                    />
                ) : (
                    <Typography>{label}: {value}</Typography>
                )}
            </Grid>
            <Grid item>
                <IconButton onClick={() => handleEditToggle(fieldName)} size="small">
                    {editableFields[fieldName] ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                {editableFields[fieldName] && (
                    <IconButton onClick={() => handleEditToggle(fieldName)} size="small">
                        <CancelIcon />
                    </IconButton>
                )}
            </Grid>
        </Grid>
    );

    return(<Box sx={{ padding: 2 }}>
        <Typography variant="h4" component="label" fontWeight="bold">
            הפניות {candidateDetails.userName}
        </Typography>
        <br />
        <Box sx={{ marginY: 4 }}>
            <Grid container spacing={20} alignItems="center">
                <Grid item>
                    {renderEditableField("userName", "שם", tempDetails.userName, handleDetailChange)}
                </Grid>
                <Grid item>
                    {renderEditableField("email", "מייל", tempDetails.email, handleDetailChange)}
                </Grid>
                <Grid item>
                    {renderEditableField("phone", "פלאפון", tempDetails.phone, handleDetailChange)}
                </Grid>
            </Grid>
        </Box>

        <Button onClick={handleScrollDown}>לתחתית העמוד</Button>

        <Button variant="contained" onClick={handleDetailsShow}>
            להצגת כל פרטי המועמד
        </Button>

        {showDetails && (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                }}
            >
                <Box
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        padding: 2,
                    }}
                >
                    <Typography variant="h5">פרטי מועמד</Typography>
                    {renderEditableField("location", "מיקום", tempDetails.location, handleDetailChange)}
                    {renderEditableField("experience", "וותק", tempDetails.experience, handleDetailChange)}
                    <Typography mt={2}>כישורים:</Typography>
                    {renderEditableField("technologies", "טכנולוגיות", tempDetails.skills.technologies, handleSkillsChange)}
                    {renderEditableField("programmingLanguages", "שפות תכנות", tempDetails.skills.programmingLanguages, handleSkillsChange)}
                    {renderEditableField("languages", "שפות", tempDetails.skills.languages, handleSkillsChange)}
                </Box>
            </Box>
        )}
        <h2>היסטוריית מועמד</h2>

        <Box className="table">
            <Table sx={{ border: '1px solid #2976D2' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className="tHead">שם החברה</TableCell>
                        <TableCell className="tHead">תאריך</TableCell>
                        <TableCell className="tHead">תגובה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="tBody">דייברסיטק</TableCell>
                        <TableCell className="tBody">26/06/2024</TableCell>
                        <TableCell className="tBody">מועמדת אלופה! אין כמוה, החברה משגשגת</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="tBody">סמינר עלי באר</TableCell>
                        <TableCell className="tBody">01/01/2024</TableCell>
                        <TableCell className="tBody">סיימה בהצלחה את לימודיה במסלול הנדסת תוכנה</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    </Box>)
}
