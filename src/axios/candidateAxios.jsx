import apiClient from './apiClient'; // או הנתיב הנכון

const API_URL = 'candidate'; 

const CandidateAxios = {
  getAllCandidates: async () => {
    try {
      const response = await apiClient.get(API_URL); // בלי פרמטרים נוספים
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw error;
    }
  },
  getCandidateById: async (candidateId) => {
    try {
      const response = await apiClient.get(`${API_URL}/${candidateId}`); // עם פרמטר אחד
      return response.data;
    } catch (error) {
      console.error("Error fetching candidate:", error);
      throw error;
    }
  },
  addCandidate: async (candidate) => {
    try {
      const response = await apiClient.post(API_URL, candidate); // עם גוף נתונים (data)
      return response.data;
    } catch (error) {
      console.error("Error adding candidate:", error);
      throw error;
    }
  },
  updateCandidate: async (id, candidate) => {
    try {
      const response = await apiClient.put(`${API_URL}/${id}`, candidate); // עם פרמטרים מרובים
      return response.data;
    } catch (error) {
      console.error("Error updating candidate:", error);
      throw error;
    }
  },
  deleteCandidateById: async (candidateId) => {
    try {
      const response = await apiClient.delete(`${API_URL}/${candidateId}`); // עם פרמטר אחד
      return response.data;
    } catch (error) {
      console.error("Error deleting candidate:", error);
      throw error;
    }
  },
};

export default CandidateAxios;
