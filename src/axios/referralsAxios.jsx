import axios from 'axios';

const API_URL = 'http://bergman-back-2.onrender.com/api/referrals';

const ReferralsAxios = {

    getAllReferrals: async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getReferralById: async (referralId) => {
        try {
            const response = await axios.get(`${API_URL}/${referralId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addReferral: async (referral) => {
        try {
            const response = await axios.post(`${API_URL}`, referral);
            return response.data;
        }
        catch (error) {
            console.error('Error adding history:', error.response ? error.response.data : error);
            throw error;
        }
    },

    deleteReferralById: async (ReferralId) => {
        try {
            const response = await axios.delete(`${API_URL}/${ReferralId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateReferral: async (id, referral) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, referral);
            return response.data;
        }
        catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default ReferralsAxios;
