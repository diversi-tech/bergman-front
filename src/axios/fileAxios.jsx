import axios from "axios";

const API_URL = 'https://bergman-back-9cfv.onrender.com/api/files'; // סיומת ה-API

const FileAxios = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  downloadFile: async (fileName) => {
    try {
      const response = await axios.get(`${API_URL}/download/${fileName}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },
  
  deleteFile: async (userID, fileName) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${userID}/${fileName}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
  
  getFileUrl: async (fileName) => {
    try {
      const response = await axios.get(`${API_URL}/url/${fileName}`);
      return response.data;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },
};

export default FileAxios;
