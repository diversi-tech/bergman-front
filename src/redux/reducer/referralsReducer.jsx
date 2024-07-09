import { produce } from 'immer';

export const InitalState = {
    listReferrals: []
}

export const ReferralsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_REFERRALS_DATA': 
             state.listReferrals = action.payload
             break;
        default:
             return state;
    }
}, InitalState)