import axios from 'axios';


const API_URL = `http://bergman-back-2.onrender.com/api/options`;

const OptionsAxios = {
    getAllOptions: async () => {
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
    getOptionById: async (optionId) => {
        try 
        {
            const response = await axios.get(`${API_URL}/${optionId}`);
            return response.data;
        }
         catch (error) 
        {
            console.error('Error fetching :', error);
            throw error;
        }
    },
    addOption: async (option) => {
        try 
        {
            const response = await axios.post(`${API_URL}`, option);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error adding :', error);
            throw error;
        }
    },
    deleteOptionById: async (optionId) => {
        try 
        {
            const response = await axios.delete(`${API_URL}/${optionId}`);
            return response.data;
        }
        catch (error)
        {
            console.error('Error deleting :', error);
            throw error;
        }
    },
    updateOption: async (id, option) => {
        try 
        {
            const response = await axios.put(`${API_URL}/${id}`, option);
            return response.data;
        } 
        catch (error) 
        {
            console.error('Error updating :', error);
            throw error;
        }
    }
};
export default OptionsAxios;
