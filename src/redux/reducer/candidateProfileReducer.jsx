import { produce } from 'immer';

export const InitalState = {
    listCandidateProfile: [

    ]
}
export const CandidateProfileReducer = produce((state, action) => {
    switch(action.type) {
        case 'FETCH_ALL_CANDIDATE_PROFILE': state.listCandidateProfile = action.payload
            break;
    }
}, InitalState)