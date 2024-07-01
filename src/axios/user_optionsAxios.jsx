import axios from 'axios';

let url = "http://localhost:8080/api/user_options/"

export const getAll = async () => {
    try {
        let data = await axios.get(`${url}getAll`)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export const post = async (user_options_elemnt) => {
    try {
        let data = await axios.post(`${url}post`, user_options_elemnt)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export const dellByIdUser_options = async (Iduser_optionse) => {
    try {
        let data = await axios.delete(`${url}dellByIdUser_options/${Iduser_optionse}`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
