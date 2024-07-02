import { produce } from 'immer'

export const InitalState = {
    listOptions: [

    ]
}
export const OptionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FETH_ALL_OPTIONS': state.listOptions = action.payload
            break;
    }
}, InitalState)