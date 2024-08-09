
import apiClient from './apiClient'; // או הנתיב הנכון

const API_URL = 'candidateReferrals';
const CandidateReferralsAxios = {
    getAllCandidateReferrals: async ()=>{
        try{
            const response = await apiClient.get(`${API_URL}`);
            return response.data;
        }catch (error){
            console.error('Error fetching candidate referrals:', error);
            throw error;
        }
    },
    getReferralsByCandidateId: async (candidateId) => {
        try {
            const response = await apiClient.get(`${API_URL}/candidate/${candidateId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching candidate referrals:', error);
            throw error;
        }
    }
};
export default CandidateReferralsAxios;