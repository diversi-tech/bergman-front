import axios from 'axios';

let url = "http://localhost:8080/api/users/"

export const getAll = async () => {
    try {
        let data = await axios.get(`${url}getAll`)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export const post = async (userElemnt) => {
    try {
        let data = await axios.post(`${url}post`, userElemnt)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export const dellByIdUser = async (IdUser) => {
    try {
        let data = await axios.delete(`${url}dellByIdUser/${IdUser}`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
