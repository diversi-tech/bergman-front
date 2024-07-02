import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}userTypes`;

const UserTypesAxios = {
    getAllUserTypes: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getUserTypeById: async (userTypesId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${userTypesId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUserType: async (userType) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, userType);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteUserTypeId: async (userTypeId) => {
        try {
            const response = await axios.delete(`${API_URL}/${userTypeId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateUserTypes: async (updateUserType) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_userTypes`, updateUserType);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserTypesAxios;
