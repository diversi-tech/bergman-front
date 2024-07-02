import axios from 'axios';
const API_URL = 'http://localhost:8080/api/user_options'; // שים כאן את ה-URL שלך לקונטרולר
const UserOptionsAxios = {
    getAllUser_options: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getUser_optionsId: async (User_optionsId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${User_optionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUser_options: async (User_options) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, User_options);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteUser_option: async (User_optionsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${User_optionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateUser: async (updatedUser_optionId) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_user_options`, updatedUser_optionId);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserOptionsAxios;
