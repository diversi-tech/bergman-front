import { combineReducers, createStore } from "redux";
import { Candidate_profileReducer } from "./reducer/candidate_profileReducer";
import { ReferralsReducer } from "./reducer/referralsReducer";
import { UserReducer } from "./reducer/userReducer";
import { User_optionsReducer } from "./reducer/user_optionsReducer";
import { User_TypeReducer } from "./reducer/user_typeReducer";
import { EnumReducer } from "./reducer/enamReducer";

export const reduser = combineReducers({
    Candidate_profileReducer: Candidate_profileReducer,
    User_optionsReducer: User_optionsReducer,
    ReferralsReducer: ReferralsReducer,
    userReducer: UserReducer,
    referralsReducer: ReferralsReducer,
    user_typeReducer:User_TypeReducer,
    enamReducer:EnumReducer
    
})

export const store = createStore(reduser)
window.store = store