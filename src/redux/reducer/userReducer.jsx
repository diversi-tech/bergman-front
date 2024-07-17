import { produce } from 'immer';

export const InitalState = {
    listUsers: [],
    currentUserType: 0
};

export const UserReducer = produce((state, action) => {
    switch(action.type){
        case 'FILL_USERS_DATA':
             state.listUsers = action.payload
             break;
        case 'SET_MY_USER':
             state.currentUserType = action.payload
             console.log("currentUserType:"+state.currentUserType)
             break
        default:
             return state;
     }
}, InitalState)









