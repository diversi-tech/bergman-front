import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}candidateProfiles`;

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
    getCandidateProfileById: async (candidateProfileId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${candidateProfileId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addCandidateProfile: async (candidateProfile) => {
        try {
            debugger
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
            debugger
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
