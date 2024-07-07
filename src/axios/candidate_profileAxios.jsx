import axios from 'axios';

let url = "http://localhost:8080/api/candidate_profile/"

export const getAll = async () => {
    try {
        let data = await axios.get(`${url}getAll`)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export const post = async (candidate_profile_elemnt) => {
    try {
        let data = await axios.post(`${url}post`, candidate_profile_elemnt)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export const dellByIdCandidate_profile = async (IdCandidate_profile) => {
    try {
        let data = await axios.delete(`${url}dellByIdCandidate_profile/${IdCandidate_profile}`)
        return data
    }
    catch (err) {
        console.log(err)
    }

}
