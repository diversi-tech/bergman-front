import axios from 'axios';

  // const baseUrl = prosess.env.REACT_APP_URL_SERVER;
    // const API_URL = `${baseUrl}userOptions`;
    const API_URL = `http://localhost:8080/api/userOptions`;

const UserOptionsAxios = {
    getAllUserOptions: async () => {
        try {
            
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getUserOptionById: async (User_optionId) => {
        try {
            
            const response = await axios.get(`${API_URL}/${User_optionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUserOption: async (User_option) => {
        try {
            
            const response = await axios.post(`${API_URL}`, User_option);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteUserOptionById: async (UserOptionsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${UserOptionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateUser: async (userOption) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}`, userOption);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserOptionsAxios;
