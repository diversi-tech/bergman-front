import axios from 'axios';

let url = "http://localhost:8080/api/referrals/"

export const getAll = async () => {
    try {
        let data = await axios.get(`${url}getAll`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}

export const post = async (referralsElemnt) => {
    try {
        let data = await axios.post(`${url}post`, referralsElemnt)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export const dellByIdreferrals = async (Idreferrals) => {
    try {
        let data = await axios.delete(`${url}dellByIdreferrals/${Idreferrals}`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
