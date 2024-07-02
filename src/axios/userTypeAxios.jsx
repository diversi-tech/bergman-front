import axios from 'axios';
const API_URL = 'http://localhost:8080/api/userTypes'; // שים כאן את ה-URL שלך לקונטרולר
const UserTypesAxios = {
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
    getUserTypesId: async (userTypesId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${userTypesId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUserTypes: async (userTypes) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, userTypes);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteUserTypesId: async (userTypesId) => {
        try {
            const response = await axios.delete(`${API_URL}/${userTypesId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateUserTypes: async (UserTypes) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_userTypes`, updateUserTypes);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserTypesAxios;
