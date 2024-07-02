import axios from 'axios';
const API_URL = 'http://localhost:8080/api/referrals'; // שים כאן את ה-URL שלך לקונטרולר
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
    getReferralsId: async (referralsId) => {
        try {
            debugger
            const response = await axios.get(`${API_URL}/${referralsId}`);
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
    deleteReferralId: async (ReferralsId) => {
        try {
            const response = await axios.delete(`${API_URL}/${ReferralsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateReferral: async (updateReferral) => {
        try {
            debugger
            const response = await axios.put(`${API_URL}/update_referrals`, updateReferral);
            return response.data;
            // alert(response.data.username)
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default ReferralsAxios;
