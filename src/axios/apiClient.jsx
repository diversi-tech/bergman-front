import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const api = axios.create({
  //הניתוב הבסיסי פה  ,userAxios
    baseURL: 'https://localhost:8080/api/',
});

// Interceptor לטיפול ב-Token ובקשת ה-API
api.interceptors.request.use(async (config) => {
    let accessToken = Cookies.get('jwtToken');
    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
            const refreshToken = Cookies.get('refreshToken');
            const response = await api.post('/refresh-token', { refreshToken });
            accessToken = response.data.accessToken;
            Cookies.set('accessToken', accessToken, { expires: 1 });
        }
        
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// פונקציות API גנריות עם אפשרות למספר שונה של פרמטרים
const apiClient = {
    get: async (url, params = {}) => {
        try {
            const response = await api.get(url, { params });
            return response;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    post: async (url, data = {}, params = {}) => {
        try {
            const response = await api.post(url, data, { params });
            return response;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    },
    put: async (url, data = {}, params = {}) => {
        try {
            const response = await api.put(url, data, { params });
            return response;
        } catch (error) {
            console.error("Error updating data:", error);
            throw error;
        }
    },
    delete: async (url, params = {}) => {
        try {
            const response = await api.delete(url, { params });
            return response;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
};

export default apiClient;
