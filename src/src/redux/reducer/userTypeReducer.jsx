import {produce} from 'immer'

export const InitalState = {
    listUsersTypes: [ ]
}

export const UserTypeReducer = produce((state, action) => {
    switch(action.type){
        case 'FILL_USERS_TYPE_DATA'
             :state.listUsersTypes = action.payload
             break;
        default:
             return state;
     }
}, InitalState)