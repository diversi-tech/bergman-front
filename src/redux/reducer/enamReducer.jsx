import {produce} from 'immer'

export const InitalState = {
    listEnum: []
}

export const EnumReducer = produce((state, action) => {
    switch(action.type){
        case 'FILL_ENAM_DATA':
             state.listEnum = action.payload
             break;
        default:
             return state;
     }
}, InitalState)