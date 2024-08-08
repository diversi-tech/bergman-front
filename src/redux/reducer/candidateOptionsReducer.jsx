import { produce } from 'immer'

export const InitalState = {
    listCandidateOptions: []
}

export const CandidateOptionsReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_CANDIDATE_OPTIONS_DATA':
             state.listCandidateOptions = action.payload
             break;
        default:
            return state;
    }
}, InitalState)