import axios from 'axios';
// const baseUrl = prosess.env.REACT_APP_URL_SERVER;
// const API_URL = `${baseUrl}candidateProfiles`;
const API_URL = `http://localhost:8080/api/candidateProfiles`;

const CandidateProfilesAxios = {
    getAllCandidateProfiles: async () => {
        try {
            
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getCandidateProfileById: async (candidateProfileId) => {
        try {
            
            const response = await axios.get(`${API_URL}/${candidateProfileId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addCandidateProfile: async (candidateProfile) => {
        try {
            
            const response = await axios.post(`${API_URL}`, candidateProfile);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteCandidateProfileById: async (candidateProfileId) => {
        try {
            const response = await axios.delete(`${API_URL}/${candidateProfileId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateCandidateProfile: async (candidateProfile) => {
        try {
            
            const response = await axios.put(`${API_URL}`, candidateProfile);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default CandidateProfilesAxios;
