import axios from 'axios';


    // const baseUrl = prosess.env.REACT_APP_URL_SERVER;
    // const API_URL = `${baseUrl}users`;
    const API_URL = `http://localhost:8080/api/users`;

 const UserAxios = {

     getAllUsers: async () => {
        
        try {
            debugger
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching :', error);
            throw error;
        }
    },
     getAllManagers: async () => {
            try {
                debugger
                const response = await axios.get(`${API_URL}/managers`);
                return response.data;
            } catch (error) {
                console.error('Error fetching :', error);
                throw error;
            }
        },
          addUser: async (user) => {
                try {
                    debugger
                    const response = await axios.post(`${API_URL}`, user);
                    return response.data;
                } catch (error) {
                    console.error('Error adding :', error);
                    throw error;
                }
            },
              deleteUserById:async (userId) => {
                    try {
                        const response = await axios.delete(`${API_URL}/${userId}`);
                        return response.data;
                    } catch (error) {
                        console.error('Error deleting :', error);
                        throw error;
                    }
                },
             updateUser: async (user) => {
                        try {
                            debugger
                            const response = await axios.put(`${API_URL}`, user);
                            return response.data;
                            // alert(response.data.username)
                        } catch (error) {
                            console.error('Error updating :', error);
                            throw error;
                        }
                    }
}
export default UserAxios;