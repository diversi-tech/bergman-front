import {produce} from 'immer'

export const InitalState = {
    listUsers: [

    ]
}
export const UserTypeReducer = produce((state, action) => {
    switch(action.type){
        case 'FETCH_ALL_USERS_TYPE':state.listUsers=action.payload
        break;
     }
}, InitalState)