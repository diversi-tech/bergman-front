import apiClient from "./apiClient";

const API_URL = `email`; // שימי לב שזה רק הסיומת

const emailAxios = {
  addEmail: async (value) => {
    try {
      const response = await apiClient.post(API_URL, value); // כאן משתמשים ב-apiClient ולא axios ישירות
      return response;
    } catch (error) {
      console.error("Error adding email:", error);
      throw error;
    }
  },
};

export default emailAxios;
