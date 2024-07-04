import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}enums`;

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
    getEnumById: async (enumId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${enumId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addEnum: async (myEnum) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, myEnum);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteEnumById: async (enumsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${enumsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateEnum: async (Enum) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}`, Enum);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default EnumsAxios;
