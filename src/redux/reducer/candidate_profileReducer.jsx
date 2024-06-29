import { produce } from 'immer';

export const InitalState = {
    listCandidateProfile: [

    ]
}
export const Candidate_profileReducer = produce((state, action) => {
    switch (action.type) {
        case 'GET_ALL_CANDIDATE_PROFILE': state.listCandidateProfile = action.payload
            break;
    }
}, InitalState)