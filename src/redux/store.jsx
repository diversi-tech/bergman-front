import { combineReducers, createStore } from "redux";
import { CandidateProfileReducer } from "./reducer/candidateProfileReducer";
import { ReferralsReducer } from "./reducer/referralsReducer";
import { UserReducer } from "./reducer/userReducer";
import { UserOptionsReducer } from "./reducer/userOptionsReducer";
import { UserTypeReducer } from "./reducer/userTypeReducer";
import { EnumReducer } from "./reducer/enamReducer";
import apiSlice from "./reducer/apiSlice";


export const reduser = combineReducers({
    CandidateProfileReducer: CandidateProfileReducer,
    UserOptionsReducer: UserOptionsReducer,
    ReferralsReducer: ReferralsReducer,
    UserReducer: UserReducer,
    referralsReducer: ReferralsReducer
})

export const store = createStore(reduser)
window.store = store