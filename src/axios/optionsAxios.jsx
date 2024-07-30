import axios from 'axios';

const API_URL = `http://localhost:8080/api/options`;

const OptionsAxios = {
    getAllOptions: async (enumId) => {
        try {
            const response = await axios.get(`${API_URL}?enumId=${enumId}`);
            return response.data;
        } 
        catch (error) {
            console.error('Error fetching options:', error);
            throw error;
        }
    },
    getOptionById: async (optionId) => {
        try {
            const response = await axios.get(`${API_URL}/${optionId}`);
            return response.data;
        } 
        catch (error) {
            console.error('Error fetching option:', error);
            throw error;
        }
    },
    addOption: async (option) => {
        try {
            const response = await axios.post(`${API_URL}`, option);
            return response.data;
        } 
        catch (error) {
            console.error('Error adding option:', error);
            throw error;
        }
    },
    deleteOptionById: async (optionId) => {
        try {
            const response = await axios.delete(`${API_URL}/${optionId}`);
            return response.data;
        } 
        catch (error) {
            console.error('Error deleting option:', error);
            throw error;
        }
    },
    updateOption: async (id, option) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, option);
            return response.data;
        } 
        catch (error) {
            console.error('Error updating option:', error);
            throw error;
        }
    }
};

export default OptionsAxios;
