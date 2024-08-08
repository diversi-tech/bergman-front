import axios from 'axios';

const API_URL = 'https://bergman-back-2.onrender.com/api/candidate'; 

const CandidateAxios = {

    getAllCandidate: async () => {
        try {
                const response = await axios.get(`${API_URL}`);
                return response.data;
            }
        catch (error)
            {
                console.error('Error fetching :', error);
                throw error;
            }
    },
    getCandidateById: async (candidateId) => {
        try {
                const response = await axios.get(`${API_URL}/${candidateId}`);
                return response.data;
            } 
        catch (error)
           {
                console.error('Error fetching :', error);
                throw error;
           }
    },
    addCandidate: async (candidate) => {
        try {
                const response = await axios.post(`${API_URL}`, candidate);
                return response.data;
            } 
        catch (error) 
           {
                console.error('Error adding :', error);
                throw error;
           }
    },
    deleteCandidateById: async (candidateId) => {
        try
        {
            const response = await axios.delete(`${API_URL}/${candidateId}`);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateCandidate: async (id, candidate) => {
        try
       {
            const response = await axios.put(`${API_URL}/${id}`, candidate);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default CandidateAxios;
