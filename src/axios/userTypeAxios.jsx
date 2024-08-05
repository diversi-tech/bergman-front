import axios from 'axios';

const API_URL = 'https://bergman-back-2.onrender.com/api/userTypes'; 

const UserTypesAxios = {

    getAllUserTypes: async () => {
        try 
        {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    getUserTypeById: async (userTypesId) => {
        try 
        {
            const response = await axios.get(`${API_URL}/${userTypesId}`);
            return response.data;
        }
         catch (error) 
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addUserType: async (userType) => {
        try
        {
            const response = await axios.post(`${API_URL}`, userType);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteUserTypeId: async (userTypeId) => {
        try
        {
            const response = await axios.delete(`${API_URL}/${userTypeId}`);
            return response.data;
        }
        catch (error)
        {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateUserTypes: async (id, userType) => {
        try 
        {
            const response = await axios.put(`${API_URL}/${id}`, userType);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default UserTypesAxios;
