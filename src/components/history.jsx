import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './candidateDetails.css'
import { CandidateDetails } from "./candidateDetails";

export const History = () => {
    const userName = "מוריה דויד"
    const email = "moriya1519@gmail.com"
    const phone = "0527101519"


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
            <Table sx={{ border: '1px solid #2976D2' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className="tHead">שם החברה </TableCell>
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
        <br />
        <Button variant="contained" onClick={details}>להצגת כל פרטי המועמד
        </Button>
        <br /><br />



        {showDetails && <div
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <div style={{
                width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px', height: '650px'
            }}>
                <h2>פרטי מועמד</h2>
                <div className="moreDetails" ><label>מיקום:</label></div>
                <br />
                <div className="moreDetails"><label>וותק:</label></div>
                <br />
                <div className="moreDetails" style={{ height: '400px', }}><label>כישורים</label>
                <br/>
                    <div className="moreDetailsPnimi"><label>טכנולוגיות:</label></div>
                    <br />
                    <div className="moreDetailsPnimi"><label>שפות תכנות:</label></div>
                    <br />
                    <div className="moreDetailsPnimi"><label>שפות:</label></div>
                    <br />
                </div>
            </div>
        </div>}
        <br />
        <CandidateDetails/>
    </div>

}
