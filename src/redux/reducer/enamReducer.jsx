import {produce} from 'immer'

export const InitalState = {
    listUsers: [

    ]
}
export const EnumReducer = produce((state, action) => {
    switch(action.type){
        case 'FETH_ALL_ENUM':state.listUsers=action.payload
        break;
     }
}, InitalState)