import { produce } from 'immer'

export const InitalState = {
    listUser_options: [

    ]
}
export const User_optionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'GET_ALL_CANDIDATE_PROFILE': state.listUser_options = action.payload
            break;
    }
}, InitalState)