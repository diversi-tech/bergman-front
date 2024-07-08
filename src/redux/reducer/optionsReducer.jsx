import { produce } from 'immer'

export const InitalState = {
    listOptions: []
}

export const OptionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_OPTIONS_DATA':
             state.listOptions = action.payload
             break;
        default:
             return state;
    }
}, InitalState)