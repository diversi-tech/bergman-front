import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const subtitles = [
    { text: "העלאת קורות חיים בקלות ובמהירות<br />תוך מספר דקות" },
    { text: "העלאת קורות חיים בשפות שונות<br />ובפורמט שונה" },
    { text: "חדש! מהיום העלאת קורות חיים<br />גם דרך המייל" },
];

export const HomeCandidate = () => {
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
        }, 4000); // כל 4 שניות

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    color: "black",
                    padding: "10px",
                    textAlign: "center",
                    fontFamily:"'Roboto', sans-serif" 
                }}
                dangerouslySetInnerHTML={{ __html: subtitles[currentSubtitleIndex].text }}
            />
        </Box>
    );
};

