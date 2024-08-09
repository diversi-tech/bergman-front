import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Nav } from "./nav";
import useToken from "./useToken";

// קומפוננטה שתנהל הרשאות, תציג הודעת שגיאה במקרה הצורך ותבצע ניווט לעמוד הבית
const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { tokenData, loading } = useToken();
  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const [userType, setUserType] = useState(0);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      navigate("../Login");
      return;
    }
    const decodedToken = jwtDecode(token);
    setUserType(decodedToken?.userTypeId || 0);

    if (decodedToken.userTypeId !== 1) setOpen(true);

    if (open) {
      const timer = setTimeout(() => {
        navigate("/Home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigate]);


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
          נא התחבר כמנהל
        </Typography>
      </Box>
    );
  }
    // אם המשתמש בעל הרשאות מתאימות, הצג את הקומפוננטה המתאימה
    return (
      <React.Fragment>
        <Nav />
        {/* <Box sx={{ marginTop: "64px" }}>
        {" "} */}
        {/* מתן מרווח מעל התוכן */}
        <Component />
        {/* </Box> */}
      </React.Fragment>
    );
  
};

export default ProtectedRoute;
