import axios from 'axios';
import apiClient from './apiClient'; // או הנתיב הנכון

const API_URL = 'companies'; // עדכן את ה-URL בהתאם לכתובת השרת שלך


 const copanyAxios ={
  getAll : async () => {
    try {
        const response = await apiClient.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  getById : async (value) => {
    try {
        const response = await apiClient.get(`${API_URL}/${value}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  create : async (data) => {
    try {
        const response = await apiClient.post(`${API_URL}`,data);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  update : async (id) => {
    try {
        const response = await apiClient.put(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  },
  delete : async (id) => {
    try {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching :', error);
        throw error;
    }
  }
  }


export default copanyAxios;





