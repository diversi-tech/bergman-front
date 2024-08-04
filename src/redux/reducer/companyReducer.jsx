import { produce } from 'immer';

export const InitalState = {
    listCompany: []
}

export const CompanyReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_COPANY_DATA': 
            state.listCompany = action.payload
            break;
        default:
            return state;
    }
}, InitalState)