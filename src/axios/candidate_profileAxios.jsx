import axios from 'axios';
const API_URL = 'http://localhost:8080/api/candidateProfiles'; // שים כאן את ה-URL שלך לקונטרולר
const CandidateProfilesAxios = {
    getAllCandidateProfiles: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getCandidateProfilesId: async (candidateProfilesId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${candidateProfilesId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addCandidateProfiles: async (candidateProfiles) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, candidateProfiles);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteCandidateProfilesId: async (candidateProfilesId) => {
        try {
            const response = await axios.delete(`${API_URL}/${candidateProfilesId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateCandidateProfiles: async (updatecandidateProfiles) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_candidateProfiles`, updatecandidateProfiles);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default CandidateProfilesAxios;
