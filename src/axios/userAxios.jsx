import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';


const UserAxios = {

  getAllUsers: async () => {
    try 
    {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } 
    catch (error) 
    {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  getAllManagers: async () => {
    try
    {
      const response = await axios.get(`${API_URL}/managers`);
      return response.data;
    } 
    catch (error) 
    {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  addUser: async (user) => {
    try 
    {
      const response = await axios.post(`${API_URL}`, user);
      return response.data;
    } 
    catch (error)
    {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try
    {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } 
    catch (error) 
    {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  updateUser: async (id, updatedUser) => {
    try 
    {
      const response = await axios.put(`${API_URL}/${id}`, updatedUser);
      return response.data;
    } 
    catch (error)
    {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};
export default UserAxios;