
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/candidateReferrals';
const CandidateReferralsAxios = {
    getAllCandidateReferrals: async ()=>{
        try{
            const response = await axios.get(`${API_URL}`);
            return response.data;
        }catch (error){
            console.error('Error fetching candidate referrals:', error);
            throw error;
        }
    },
    getReferralsByCandidateId: async (candidateId) => {
        try {
            const response = await axios.get(`${API_URL}/candidate/${candidateId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching candidate referrals:', error);
            throw error;
        }
    }
};
export default CandidateReferralsAxios;