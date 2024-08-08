import { combineReducers, createStore, applyMiddleware } from "redux";
import { CandidateProfileReducer } from "./reducer/candidateProfileReducer";
import { ReferralsReducer } from "./reducer/referralsReducer";
import { UserReducer } from "./reducer/userReducer";
import { UserTypeReducer } from "./reducer/userTypeReducer";
import { EnumReducer } from "./reducer/enumReducer";
import {thunk} from 'redux-thunk';
import { OptionsReducer } from "./reducer/optionsReducer";
import { CandidateOptionsReducer } from "./reducer/candidateOptionsReducer";
import { CompanyReducer } from "./reducer/companyReducer";


export const reduser = combineReducers({
    CandidateProfileReducer: CandidateProfileReducer,
    CandidateOptionsReducer: CandidateOptionsReducer,
    ReferralsReducer: ReferralsReducer,
    userReducer: UserReducer,
    userTypeReducer: UserTypeReducer,
    enamReducer: EnumReducer,
    OptionsReducer:OptionsReducer,
    companyReducer:CompanyReducer
})

export const store = createStore(reduser, applyMiddleware(thunk))
window.store = store