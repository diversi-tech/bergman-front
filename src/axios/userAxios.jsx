import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users'; // שים כאן את ה-URL שלך לקונטרולר

const UserAxios = {
  getAllUsers: async () => {
    try {
        debugger
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  getAllManagers: async () => {
    try {
        debugger
      const response = await axios.get(`${API_URL}/managers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  addUser: async (user) => {
    try {
      debugger
      const response = await axios.post(`${API_URL}`, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  updateUser: async (updatedUser) => {
    try {
        debugger
      const response = await axios.put(`${API_URL}/updateUser`, updatedUser);
      return response.data;
      // alert(response.data.username)
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};
export default UserAxios;





// export const Get_by_idRecepi = async(id)=>{
//        try 
//        {
//         //ניגש לכתובת של הפונקציה לפי שיטת הגישה שלה
//         let data = await axios.get(`${url}getByIdRecepi/${id}`)
//         return data
//        }
//        catch(er)
//        {
//               console.log(er)
//        }

// }
// //פונקצית הוספת רכיבים
// export const addEngrediensToRecepi = async(obj)=>{
//        try 
//        {
//         //ניגש לכתובת של הפונקציה לפי שיטת הגישה שלה
//         let data = await axios.post(`${url}myAddEngrediens`,obj)
//         return data
//        }
//        catch(er)
//        {
//               console.log(er)
//        }
       
// }






// import axios from 'axios';

// let url = "http://localhost:8080/api/users/"

// export const getAll = async () => {
//     try {
//         let data = await axios.get(`${url}getAll`)
//         return data
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// export const post = async (userElemnt) => {
//     try {
//         let data = await axios.post(`${url}post`, userElemnt)
//         return data
//     }
//     catch (err) {
//         console.log(err)
//     }

// }
// export const dellByIdUser = async (IdUser) => {
//     try {
//         let data = await axios.delete(`${url}dellByIdUser/${IdUser}`)
//         return data
//     }
//     catch (err) {
//         console.log(err)
//     }

// }
