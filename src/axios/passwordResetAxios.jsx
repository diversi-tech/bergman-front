import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const requestPasswordReset = async (email) => {
  try {
    
    const response = await axios.get(`${API_URL}/request-password-reset`, { params: { email } });
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
