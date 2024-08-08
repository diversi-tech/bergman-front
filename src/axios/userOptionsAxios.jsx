import apiClient from './apiClient';

const API_URL = 'userOptions'; // סיומת ה-API

const UserOptionsAxios = {
    
    getAllUserOptions: async () => {
        try {
            const response = await apiClient.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching user options:', error);
            throw error;
        }
    },

    getUserOptionById: async (userOptionId) => {
        try {
            const response = await apiClient.get(`${API_URL}/${userOptionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user option:', error);
            throw error;
        }
    },

    addUserOption: async (userOption) => {
        try {
            const response = await apiClient.post(API_URL, userOption);
            return response.data;
        } catch (error) {
            console.error('Error adding user option:', error);
            throw error;
        }
    },

    deleteUserOptionById: async (userOptionsId) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${userOptionsId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user option:', error);
            throw error;
        }
    },

    updateUserOption: async (id, userOption) => {
        try {
            const response = await apiClient.put(`${API_URL}/${id}`, userOption);
            return response.data;
        } catch (error) {
            console.error('Error updating user option:', error);
            throw error;
        }
    }
};

export default UserOptionsAxios;
