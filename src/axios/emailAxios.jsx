import axios from "axios";
const API_URL = `http://localhost:8080/api/email`;
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