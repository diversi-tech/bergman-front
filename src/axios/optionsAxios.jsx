import axios from 'axios';

let url = "http://localhost:8080/api/options/"

export const getAll = async () => {
    try {
        let data = await axios.get(`${url}getAll`)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export const post = async (options_elemnt) => {
    try {
        let data = await axios.post(`${url}post`, options_elemnt)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export const dellByIdoptions = async (Idoptions) => {
    try {
        let data = await axios.delete(`${url}dellByIdoptions/${Idoptions}`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
