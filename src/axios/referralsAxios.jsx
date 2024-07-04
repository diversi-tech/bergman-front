import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectBaseUrl } from '../redux/reducer/apiSlice';

const baseUrl = useSelector(selectBaseUrl);
const API_URL = `${baseUrl}referrals`;

const ReferralsAxios = {
    getAllReferrals: async () => {
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getReferralById: async (referralId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${referralId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addReferral: async (referral) => {
        try {
            debugger
            const response = await axios.post(`${API_URL}`, referral);
            return response.data;
        } catch (error) {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteReferralById: async (ReferralId) => {
        try {
            const response = await axios.delete(`${API_URL}/${ReferralId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateReferral: async (referral) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}`, referral);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default ReferralsAxios;
