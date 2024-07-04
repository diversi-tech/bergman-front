import axios from 'axios';

  // const baseUrl = prosess.env.REACT_APP_URL_SERVER;
    // const API_URL = `${baseUrl}referrals`;
    const API_URL = `http://localhost:8080/api/referrals`;

const ReferralsAxios = {
    getAllReferrals: async () => {
        try {
            
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getReferralById: async (referralId) => {
        try {
            
            const response = await axios.get(`${API_URL}/${referralId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addReferral: async (referral) => {
        try {
            
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
