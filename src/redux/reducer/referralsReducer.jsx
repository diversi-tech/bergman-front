import { produce } from 'immer'

export const InitalState = {
    listReferrals: [

    ]
}
export const ReferralsReducer = produce((state, action) => {
    switch (action.type) {
        case 'GET_ALL_REFERERRALS': state.listReferrals = action.payload
            break;
    }
}, InitalState)