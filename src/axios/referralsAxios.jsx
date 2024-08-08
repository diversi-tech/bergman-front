import apiClient from './apiClient';

const API_URL = 'referrals'; // סיומת ה-API

const ReferralsAxios = {

    getAllReferrals: async () => {
        try {
            const response = await apiClient.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching referrals:', error);
            throw error;
        }
    },
    getReferralById: async (referralId) => {
        try {
            const response = await apiClient.get(`${API_URL}/${referralId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching referral:', error);
            throw error;
        }
    },
    addReferral: async (referral) => {
        try {
            const response = await apiClient.post(API_URL, referral);
            return response.data;
        } catch (error) {
            console.error('Error adding referral:', error.response ? error.response.data : error);
            throw error;
        }
    },
    deleteReferralById: async (ReferralId) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${ReferralId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting referral:', error);
            throw error;
        }
    },
    updateReferral: async (id, referral) => {
        try {
            const response = await apiClient.put(`${API_URL}/${id}`, referral);
            return response.data;
        } catch (error) {
            console.error('Error updating referral:', error);
            throw error;
        }
    }
};

export default ReferralsAxios;
