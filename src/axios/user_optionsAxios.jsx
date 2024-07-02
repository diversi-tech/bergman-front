import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}userOptions`;

const UserOptionsAxios = {
    getAllUserOptions: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getUserOptionById: async (User_optionId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${User_optionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUserOption: async (User_option) => {
        try {
            debugger
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
    updateUsers: async (updatedUserOption) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/updateUserOptions`, updatedUserOption);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserOptionsAxios;
