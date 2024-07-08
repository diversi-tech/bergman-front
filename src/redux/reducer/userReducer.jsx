import {produce} from 'immer'

export const InitalState = {
    listUsers: []
};

export const UserReducer = produce((state, action) => {
    debugger
    switch(action.type){
        case 'FILL_USERS_DATA':
             state.listUsers = action.payload
             break;
        default:
             return state;
     }
}, InitalState)









