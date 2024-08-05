import axios from 'axios';

const API_URL = 'https://bergman-back-2.onrender.com/api/enums'; 

const EnumsAxios = {

    getAllEnums: async () => {
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
    getEnumById: async (enumId) => {
        try 
        {
            const response = await axios.get(`${API_URL}/${enumId}`);
            return response.data;
        }
         catch (error)
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addEnum: async (myEnum) => {
        try
        {
            const response = await axios.post(`${API_URL}`, myEnum);
            return response.data;
        }
        catch (error)
        {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteEnumById: async (enumsId) => {
        try 
        {
            const response = await axios.delete(`${API_URL}/${enumsId}`);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateEnum: async (id, Enum) => {
        try 
        {
            const response = await axios.put(`${API_URL}/${id}`, Enum);
            return response.data;
        } 
        catch (error)
        {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default EnumsAxios;
