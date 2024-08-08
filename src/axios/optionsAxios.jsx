import apiClient from "./apiClient";

const API_URL = `options`; // סיומת ה-API

const OptionsAxios = {
    getAllOptions: async () => {
        try {   
            const response = await apiClient.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching options:', error);
            throw error;
        }
    },
    getOptionById: async (optionId) => {
        try { 
            const response = await apiClient.get(`${API_URL}/${optionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching option:', error);
            throw error;
        }
    },
    addOption: async (option) => {
        try { 
            const response = await apiClient.post(API_URL, option);
            return response.data;
        } catch (error) {
            console.error('Error adding option:', error);
            throw error;
        }
    },
    deleteOptionById: async (optionId) => {
        try { 
            const response = await apiClient.delete(`${API_URL}/${optionId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting option:', error);
            throw error;
        }
    },
    updateOption: async (id, option) => {
        try { 
            const response = await apiClient.put(`${API_URL}/${id}`, option);
            return response.data;
        } catch (error) {
            console.error('Error updating option:', error);
            throw error;
        }
    }
};

export default OptionsAxios;
