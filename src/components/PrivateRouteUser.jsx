import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


// קומפוננטה שתנהל הרשאות, תציג הודעת שגיאה במקרה הצורך ותבצע ניווט לעמוד הבית
const PrivateRouteUser = ({ element: Component }) => {
  debugger
  const navigate = useNavigate();
  const [open, setOpen] = useState();

  useEffect(() => {
    
    const token = Cookies.get("jwtToken");
      if(token===undefined){
      navigate('../Login')
      return
  }
    const decodedToken = jwtDecode(token);
    if (decodedToken.userTypeId !== 2 && decodedToken.userTypeId !== 1) 
      setOpen(true);
    if (open) {
      const timer = setTimeout(() => {
        navigate("/Home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);
  
  if (open) {
    // הצג הודעת שגיאה אם אין הרשאות
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <CancelIcon sx={{ fontSize: 100, color: "red" }} />
        <Typography variant="h4" color="error" sx={{ mt: 2 }}>
          לא התחברת!
        </Typography>
      </Box>
    );
  }
  // אם המשתמש בעל הרשאות מתאימות, הצג את הקומפוננטה המתאימה
  return <Component/>
 
};

export default PrivateRouteUser;
