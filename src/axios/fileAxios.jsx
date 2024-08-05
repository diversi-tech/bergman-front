import axios from 'axios';

const API_URL = 'https://bergman-back-2.onrender.com/api/files';

const FileAxios = {
  uploadFile: async (file) => {
    debugger
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('userID', userID);
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
  downloadFile: async ( fileName) => {
    debugger
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
  // viewFile: async (fileName) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/view/${fileName}`, {
  //       responseType: 'blob',
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error viewing file:', error);
  //     throw error;
  //   }
  // },
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
