import { produce } from 'immer'

export const InitalState = {
    listUser_options: [

    ]
}
export const UserOptionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FETCH_ALL_CANDIDATE_PROFILE': state.listUser_options = action.payload
            break;
    }
}, InitalState)