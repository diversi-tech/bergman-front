import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import './candidateDetails.css'

export const CandidateDetails = () => {
    const userName = "מוריה דויד"
    const email = "moriya1519@gmail.com"
    const phone = "0527101519"

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight, // גובה העמוד
            behavior: 'smooth' // גלילה חלקה
        });
    }
    const [showDetails, setShowDetails] = useState(false);

    function details() {
        setShowDetails(true);
    }

    return <div>
        <label style={{ fontWeight: 'bold', fontSize: '30px' }}>הפניות {userName}</label>
        <br /><br /><br />
        <div className="details">
            <label className="lbl">שם:{userName}               </label>
            <label className="lbl" style={{ flexBasis: '50%' }}>מייל:{email}               </label>
            <label className="lbl" >פלאפון:{phone}               </label>
        </div>
        <br /><br /><br />
        <div className="table">
            <Table sx={{ border: '2px solid #2976D2' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className="tHead">לאן נשלח</TableCell>
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
        </div>
        <br/>
        <Button variant="contained" onClick={details}>להצגת כל פרטי המועמד
        { showDetails &&<div className="scroll-down-arrow" onClick={handleScrollDown}>
            {/* <img src="../images/logo.jpg" alt="Scroll down" /> */}
            {/* <img src={require('../images/חץ למטה.png').default} alt="Scroll down" /> */}
            <label style={{ fontSize: '20px' }}>⬇</label>
        </div>}
        </Button>
        <br /><br />

        

        {showDetails && <div>
            <h2>פרטי מועמד</h2>
            <label>וותק:</label>
            <br />
            <label>שפות:</label>
            <br />
            <label>טכנולוגיות:</label>
            <br />
            <label>מיקום:</label>
        </div>}


    </div>
}