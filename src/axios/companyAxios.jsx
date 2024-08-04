import axios from 'axios';

const API_URL = 'http://localhost:8080/api/companies'; // עדכן את ה-URL בהתאם לכתובת השרת שלך


 const copanyAxios ={
  getAll : async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  getById : async (value) => {
    try {
        const response = await axios.get(`${API_URL}/${value}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  create : async (data) => {
    try {
        const response = await axios.post(`${API_URL}`,data);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  update : async (id) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  delete : async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  }
  }


export default copanyAxios;





