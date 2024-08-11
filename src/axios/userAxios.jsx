import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/users'; // שים כאן את ה-URL שלך לקונטרולר


const UserAxios = {
  login: async (email, pass) => {
    try {
      const response = await axios.get(`${API_URL}/emailAndPass/${email}/${pass}`);
      if (response.data) {
        const token = await response.data;
        Cookies.set("jwtToken", token, {
          sameSite: "None",
          secure: true ,
          expires: 7
      });
        // פענוח התוקן ושליפת המידע
        const decodedToken = jwtDecode(token);
        console.log("User Info from Token:", {
          userTypeId: decodedToken.userTypeId,
          phoneNumber: decodedToken.phoneNumber,
          lastName: decodedToken.lastName,
          firstName: decodedToken.firstName,
          email: decodedToken.sub, // כתובת האימייל
        });
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
return  null;   }
  },
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





