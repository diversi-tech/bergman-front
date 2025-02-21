import axios from 'axios';

const API_URL = 'https://bergman-back.onrender.com/api';

export const requestPasswordReset = async (email) => {
  debugger
  try {
    console.log(email)
    // שים לב שאתה משתמש ב-params ולא מוסיף את הפרמטרים ל-URL
    const response = await axios.get(`${API_URL}/request-password-reset`, { 
      params: { email } 
    });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/reset-password`, null, {
      params: {
        token,
        newPassword
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
