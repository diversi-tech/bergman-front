import axios from "axios";
const API_URL = `https://bergman-back-2.onrender.com/api/email`;
const emailAxios = {
  addEmail: async (value) => {
    try {
      const response = await axios.post(`${API_URL}`, value);
      return response;
    }
    catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  },
};
export default emailAxios;