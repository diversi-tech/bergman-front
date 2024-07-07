import { combineReducers, createStore } from "redux";
import { Candidate_profileReducer } from "./reducer/candidate_profileReducer";
import { ReferralsReducer } from "./reducer/referralsReducer";
import { UserReducer } from "./reducer/userReducer";
import { User_optionsReducer } from "./reducer/user_optionsReducer";

export const reduser = combineReducers({
    Candidate_profileReducer: Candidate_profileReducer,
    User_optionsReducer: User_optionsReducer,
    ReferralsReducer: ReferralsReducer,
    userReducer: UserReducer,
    referralsReducer: ReferralsReducer
})

export const store = createStore(reduser)
window.store = store