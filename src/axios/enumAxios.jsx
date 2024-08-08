import apiClient from "./apiClient";

const API_URL = 'enums'; // סיומת ה-API

const EnumsAxios = {
    getAllEnums: async () => {
        try {
            const response = await apiClient.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enums:', error);
            throw error;
        }
    },
    getEnumById: async (enumId) => {
        try {
            const response = await apiClient.get(`${API_URL}/${enumId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching enum with ID ${enumId}:`, error);
            throw error;
        }
    },
    addEnum: async (myEnum) => {
        try {
            const response = await apiClient.post(`${API_URL}`, myEnum);
            return response.data;
        } catch (error) {
            console.error('Error adding enum:', error);
            throw error;
        }
    },
    deleteEnumById: async (enumsId) => {
        try {
            const response = await apiClient.delete(`${API_URL}/${enumsId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting enum with ID ${enumsId}:`, error);
            throw error;
        }
    },
    updateEnum: async (id, Enum) => {
        try {
            const response = await apiClient.put(`${API_URL}/${id}`, Enum);
            return response.data;
        } catch (error) {
            console.error(`Error updating enum with ID ${id}:`, error);
            throw error;
        }
    }
};

export default EnumsAxios;
