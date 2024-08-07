import axios from 'axios';

const API_URL = 'http://localhost:8080/api/CandidateOptions'; 

const CandidateOptionsAxios = {
    
    getAllCandidateOptions: async () => {
        try 
        {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        }
        catch (error)
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getCandidateOptionsById: async (CandidateOptionsId) => {
        try
        {
            const response = await axios.get(`${API_URL}/${CandidateOptionsId}`);
            return response.data;
        }
         catch (error) 
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addCandidateOptions: async (CandidateOptions) => {
        try
        {
            const response = await axios.post(`${API_URL}`, CandidateOptions);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteCandidateOptionsById: async (CandidateOptionsId) => {
        try
        {
            const response = await axios.delete(`${API_URL}/${CandidateOptionsId}`);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateCandidateOptions: async (id, CandidateOptions) => {
        try
        {
            const response = await axios.put(`${API_URL}/${id}`, CandidateOptions);
            return response.data;
        }
         catch (error)
        {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default CandidateOptionsAxios;
