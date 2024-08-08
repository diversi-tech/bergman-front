import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Hook לקבלת נתוני תוקן מהעוגיה
const useToken = () => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("jwtToken");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      setTokenData(decodedToken); // עדכון המידע שנשלף מהתוקן
      
    } catch (error) {
      console.error("Failed to decode token:", error);
      setTokenData(null); // במקרה של שגיאה, התוקן לא תקין
    }
  } else {
    setTokenData(null); // אם לא נמצא תוקן
  }
  setLoading(false); // מסמן שהטעינה הסתיימה

  return { tokenData, loading };
};

export default useToken;
