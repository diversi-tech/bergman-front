import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}options`;

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
    getOptionById: async (optionsId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${optionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addOption: async (option) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, option);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteOptionById: async (optionId) => {
        try {
            const response = await axios.delete(`${API_URL}/${optionId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateOptions: async (updateOption) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}`, updateOption);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default OptionsAxios;
