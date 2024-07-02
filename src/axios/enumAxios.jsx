import axios from 'axios';
const API_URL = 'http://localhost:8080/api/enums'; // שים כאן את ה-URL שלך לקונטרולר
const EnumsAxios = {
    getAllEnums: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getEnumsId: async (enumsId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${enumsId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addEnums: async (enums) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, enums);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteEnumsId: async (enumsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${enumsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateEnums: async (updateEnums) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_enums`, updateEnums);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default EnumsAxios;
