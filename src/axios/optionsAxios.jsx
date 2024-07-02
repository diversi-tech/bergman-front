import axios from 'axios';
const API_URL = 'http://localhost:8080/api/options'; // שים כאן את ה-URL שלך לקונטרולר
const OptionsAxios = {
    getAllOptions: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getOptionsId: async (optionsId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${optionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addOptions: async (options) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, options);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteOptionsId: async (optionsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${optionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateOptions: async (updateoptions) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_options`, updateoptions);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default OptionsAxios;
