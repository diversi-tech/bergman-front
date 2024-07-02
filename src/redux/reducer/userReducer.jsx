import {produce} from 'immer'

export const InitalState = {
    listUsers: [

    ]
}
export const UserReducer = produce((state, action) => {
    switch(action.type){
        case 'FETH_ALL_USERS':state.listUsers=action.payload
        break;
     }
}, InitalState)