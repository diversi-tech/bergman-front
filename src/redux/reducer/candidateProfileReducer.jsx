import { produce } from 'immer';

export const InitalState = {
    listCandidateProfile: []
}

export const CandidateProfileReducer = produce((state, action) => {
    switch (action.type) {
        case 'FILL_CANDIDATE_PROFILE_DATA': 
            state.listCandidateProfile = action.payload
            break;
        default:
            return state;
    }
}, InitalState)