import { combineReducers } from 'redux'

export const auth = (loggedUsers = {} ,form) => {

    switch (form.type) {   
        case "LOGIN":
            return {
                ...loggedUsers,
                loggedUsers:form.payload.u_name,
            }
    
        default:
            return loggedUsers
    }
}

const initState = {
    loading : false,
    vacations : [],
    followedVacations: [],
    errMessage : ''
}

export const vacations = (vState = initState, form) => {
    switch (form.type) {
            case "GET_All_VACATIONS_SUCCESS":
            return {
                ...vState,
                loading : false,
                vacations : [...form.payload.vacations]
            }
            case "GET_All_VACATIONS_FAILURE":
            return {
                ...vState,
                loading : true,
                errMessage : form.payload.errMessage
            }
            case "GET_All_VACATIONS_REQUEST":
            return {
                ...vState,
                loading : true 
            }
            case "GET_FOLLOWED_VACATIONS_SUCCESS":
            return {
                ...vState,
                loading : false,
                followedVacations : [...form.payload.followedVacations]
            }
            case "GET_FOLLOWED_VACATIONS_FAILURE":
            return {
                ...vState,
                loading : true,
                errMessage : form.payload.errMessage
            }
            case "GET_FOLLOWED_VACATIONS_REQUEST":
            return {
                ...vState,
                loading : true 
            }
        default:
            return vState
    }
}

export const reducers = combineReducers({auth, vacations})