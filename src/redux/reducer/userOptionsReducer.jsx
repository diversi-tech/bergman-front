import { produce } from 'immer'

export const InitalState = {
    listUserUserOptions: []
}

export const UserOptionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_USER_OPTIONS_DATA':
             state.listUserUserOptions = action.payload
             break;
        default:
            return state;
    }
}, InitalState)