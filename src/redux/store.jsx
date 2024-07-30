import { combineReducers, createStore, applyMiddleware } from "redux";
import { CandidateProfileReducer } from "./reducer/candidateProfileReducer";
import { ReferralsReducer } from "./reducer/referralsReducer";
import { UserReducer } from "./reducer/userReducer";
import { UserOptionsReducer } from "./reducer/userOptionsReducer";
import { UserTypeReducer } from "./reducer/userTypeReducer";
import { EnumReducer } from "./reducer/enumReducer";
import {thunk} from 'redux-thunk';


export const reduser = combineReducers({
    CandidateProfileReducer: CandidateProfileReducer,
    UserOptionsReducer: UserOptionsReducer,
    ReferralsReducer: ReferralsReducer,
    userReducer: UserReducer,
    userTypeReducer: UserTypeReducer,
    enumReducer: EnumReducer
})

export const store = createStore(reduser, applyMiddleware(thunk))
window.store = store