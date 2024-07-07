// import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import React, { useState } from "react";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import './candidateDetails.css'

// export const CandidateDetails = () => {
//     const userName = "מוריה דויד"
//     const email = "moriya1519@gmail.com"
//     const phone = "0527101519"

//     const handleScrollDown = () => {
//         window.scrollTo({
//             top: window.innerHeight, // גובה העמוד
//             behavior: 'smooth' // גלילה חלקה
//         });
//     }
//     const [showDetails, setShowDetails] = useState(false);

//     function details() {
//         setShowDetails(true);
//     }

//     return <div>
//         <label style={{ fontWeight: 'bold', fontSize: '30px' }}>הפניות {userName}</label>
//         <br /><br /><br />
//         <div className="details">
//             <label className="lbl">שם:{userName}               </label>
//             <label className="lbl" style={{ flexBasis: '50%' }}>מייל:{email}               </label>
//             <label className="lbl" >פלאפון:{phone}               </label>
//         </div>
//         <br /><br /><br />
//         <div className="table">
//             <Table sx={{ border: '1px solid #2976D2' }}>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell className="tHead">שם החברה </TableCell>
//                         <TableCell className="tHead">תאריך</TableCell>
//                         <TableCell className="tHead">תגובה</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow>
//                         <TableCell className="tBody">דייברסיטק</TableCell>
//                         <TableCell className="tBody">26/06/2024</TableCell>
//                         <TableCell className="tBody">מועמדת אלופה! אין כמוה, החברה משגשגת</TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <TableCell className="tBody">סמינר עלי באר</TableCell>
//                         <TableCell className="tBody">01/01/2024</TableCell>
//                         <TableCell className="tBody">סיימה בהצלחה את לימודיה במסלול הנדסת תוכנה</TableCell>
//                     </TableRow>
//                 </TableBody>
//             </Table>
//         </div>
//         <br />
//         <Button variant="contained" onClick={details}>להצגת כל פרטי המועמד
//             {showDetails && <div className="scroll-down-arrow" onClick={handleScrollDown}>
//                 <label style={{ fontSize: '20px' }}><ArrowDownwardIcon/></label>
//             </div>}
//         </Button>
//         <br /><br />



//         {showDetails && <div
//             style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//         >
//             <div style={{
//                 width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px', height: '650px'
//             }}>
//                 <h2>פרטי מועמד</h2>
//                 <div className="moreDetails" ><label>מיקום:</label></div>
//                 <br />
//                 <div className="moreDetails"><label>וותק:</label></div>
//                 <br />
//                 <div className="moreDetails" style={{ height: '400px', }}><label>כישורים</label>
//                     <div className="moreDetailsPnimi"><label>טכנולוגיות:</label></div>
//                     <br />
//                     <div className="moreDetailsPnimi"><label>שפות תכנות:</label></div>
//                     <br />
//                     <div className="moreDetailsPnimi"><label>שפות:</label></div>
//                     <br />
//                 </div>
//             </div>
//         </div>}
//         <br />


//     </div>
// }

import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, IconButton, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './candidateDetails.css';

export const CandidateDetails = () => {
    const initialDetails = {
        userName: "מוריה דויד",
        email: "moriya1519@gmail.com",
        phone: "0527101519",
        location: "גבעת זאב",
        experience: "5 שנים",
        skills: {
            technologies: "React, Node.js",
            programmingLanguages: "JavaScript, Python",
            languages: "עברית, אנגלית"
        }
    };

    const [isEditing, setIsEditing] = useState(true);
    const [candidateDetails, setCandidateDetails] = useState(initialDetails);
    const [showDetails, setShowDetails] = useState(false);
    const [editableDetails, setEditableDetails] = useState(initialDetails);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setEditableDetails(candidateDetails); // Reset editable details if cancelling edit
        }
    };

    const handleDetailChange = (event) => {
        const { name, value } = event.target;
        setEditableDetails({ ...editableDetails, [name]: value });
    };

    const handleSkillsChange = (event) => {
        const { name, value } = event.target;
        setEditableDetails({
            ...editableDetails,
            skills: {
                ...editableDetails.skills,
                [name]: value
            }
        });
    };

    const handleSave = () => {
        setCandidateDetails(editableDetails);
        // setIsEditing(false);
    };

    

    const handleDetailsShow = () => {
        setShowDetails(true);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="label" fontWeight="bold">
                עריכת פרטי מועמד- {candidateDetails.userName}
            </Typography>
            <Box sx={{ marginY: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {isEditing ? (
                        <>
                            <TextField
                                label="שם"
                                name="userName"
                                value={editableDetails.userName}
                                onChange={handleDetailChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="מייל"
                                name="email"
                                value={editableDetails.email}
                                onChange={handleDetailChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="פלאפון"
                                name="phone"
                                value={editableDetails.phone}
                                onChange={handleDetailChange}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    ) : (
                        <>
                            <Typography className="lbl">שם: {candidateDetails.userName}</Typography>
                            <Typography className="lbl" style={{ flexBasis: '50%' }}>מייל: {candidateDetails.email}</Typography>
                            <Typography className="lbl">פלאפון: {candidateDetails.phone}</Typography>
                        </>
                    )}
                </Box>
                <IconButton onClick={handleEditToggle}>
                    {/* {isEditing ? <CancelIcon /> : <EditIcon />} */}
                </IconButton>
            </Box>

            

            <Button variant="contained" onClick={handleDetailsShow}>
                לעריכת כל פרטי המועמד
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
                        <Box className="moreDetails" mt={2}>
                            {isEditing ? (
                                <TextField
                                    label="מיקום"
                                    name="location"
                                    value={editableDetails.location}
                                    onChange={handleDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                            ) : (
                                <Typography>מיקום: {candidateDetails.location}</Typography>
                            )}
                        </Box>
                        <Box className="moreDetails" mt={2}>
                            {isEditing ? (
                                <TextField
                                    label="וותק"
                                    name="experience"
                                    value={editableDetails.experience}
                                    onChange={handleDetailChange}
                                    fullWidth
                                    margin="normal"
                                />
                            ) : (
                                <Typography>וותק: {candidateDetails.experience}</Typography>
                            )}
                        </Box>
                        <Box className="moreDetails" mt={2}>
                            <Typography>כישורים:</Typography>
                            <Box className="moreDetailsPnimi" mt={2}>
                                {isEditing ? (
                                    <TextField
                                        label="טכנולוגיות"
                                        name="technologies"
                                        value={editableDetails.skills.technologies}
                                        onChange={handleSkillsChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                ) : (
                                    <Typography>טכנולוגיות: {candidateDetails.skills.technologies}</Typography>
                                )}
                            </Box>
                            <Box className="moreDetailsPnimi" mt={2}>
                                {isEditing ? (
                                    <TextField
                                        label="שפות תכנות"
                                        name="programmingLanguages"
                                        value={editableDetails.skills.programmingLanguages}
                                        onChange={handleSkillsChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                ) : (
                                    <Typography>שפות תכנות: {candidateDetails.skills.programmingLanguages}</Typography>
                                )}
                            </Box>
                            <Box className="moreDetailsPnimi" mt={2}>
                                {isEditing ? (
                                    <TextField
                                        label="שפות"
                                        name="languages"
                                        value={editableDetails.skills.languages}
                                        onChange={handleSkillsChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                ) : (
                                    <Typography>שפות: {candidateDetails.skills.languages}</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    
                    
                </Box>
                
            )}
            {isEditing && (
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSave} startIcon={<SaveIcon />}>
                            שמור שינויים
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleEditToggle} startIcon={<CancelIcon />} sx={{ ml: 2 }}>
                            בטל
                        </Button>
                    </Box>
                )}
                {/* <Box className="table">
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
            </Box> */}
        </Box>
    );
};



