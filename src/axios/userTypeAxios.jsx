import apiClient from './apiClient';

const API_URL = 'userTypes'; // סיומת ה-API

const UserTypesAxios = {

    getAllUserTypes: async () => {
        try {
            const response = await apiClient.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching user types:', error);
            throw error;
        }
    },

    getUserTypeById: async (userTypeId) => {
        try {
            const response = await apiClient.get(`${API_URL}/${userTypeId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user type:', error);
            throw error;
        }
    },

    addUserType: async (userType) => {
        try {
            const response = await apiClient.post(API_URL, userType);
            return response.data;
        } catch (error) {
            console.error('Error adding user type:', error);
            throw error;
        }
    },

    deleteUserTypeById: async (userTypeId) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${userTypeId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user type:', error);
            throw error;
        }
    },

    updateUserType: async (id, userType) => {
        try {
            const response = await apiClient.put(`${API_URL}/${id}`, userType);
            return response.data;
        } catch (error) {
            console.error('Error updating user type:', error);
            throw error;
        }
    }
};

export default UserTypesAxios;
