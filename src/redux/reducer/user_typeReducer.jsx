import {produce} from 'immer'

export const InitalState = {
    listUsers: [

    ]
}
export const User_TypeReducer = produce((state, action) => {
    switch(action.type){
        case 'FETH_ALL_USERS_TYPE':state.listUsers=action.payload
        break;
     }
}, InitalState)