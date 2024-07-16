import { produce } from 'immer';

export const InitalState = {
    listUsers: [],
    currentUser1: {}
};

export const UserReducer = produce((state, action) => {
    switch(action.type){
        case 'FILL_USERS_DATA':
             state.listUsers = action.payload
             break;
        case 'SET_MY_USER':
             state.currentUser1 = action.payload
             break
        default:
             return state;
     }
}, InitalState)









