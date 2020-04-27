export const register = (f_name,l_name,u_name,password) => {
    return { // form || action 
        type:"REGISTER",
        payload:{
            f_name,
            l_name,
            u_name,
            password
        }
    }
}
export const login = (u_name) => {
    return { // form || action 
        type:"LOGIN",
        payload:{
            u_name,
        }
    }
}
export const getAllVacationRequest = (loading) => {
    return { // form || action 
        type:"GET_All_VACATIONS_REQUEST",
        payload:{
            loading
        }
    }
}
export const getAllVacationSuccess = (loading, vacations, errMessage) => {
    return { // form || action 
        type:"GET_All_VACATIONS_SUCCESS",
        payload:{
            loading,
            vacations,
            errMessage
        }
    }
}
export const getAllVacationFailure = (loading, vacations, errMessage) => {
    return { // form || action 
        type:"GET_All_VACATIONS_FAILURE",
        payload:{
            loading,
            vacations,
            errMessage
        }
    }
}
export const getFollowedVacationsRequest = (loading) => {
    return { // form || action 
        type:"GET_FOLLOWED_VACATIONS_REQUEST",
        payload:{
            loading
        }
    }
}
export const getFollowedVacationsSuccess = (loading, followedVacations, errMessage) => {
    return { // form || action 
        type:"GET_FOLLOWED_VACATIONS_SUCCESS",
        payload:{
            loading,
            followedVacations,
            errMessage
        }
    }
}
export const getFollowedVacationsFailure = (loading, followedVacations, errMessage) => {
    return { // form || action 
        type:"GET_FOLLOWED_VACATIONS_FAILURE",
        payload:{
            loading,
            followedVacations,
            errMessage
        }
    }
}

export const deleteVacation = (id) => {
    return { // form || action 
        type:"DELETE_VACATION",
        payload:{
            id
        }
    }
}

export const editVacation = (destination, description, img_url, from_date, until_date, price) => {
    return { // form || action 
        type:"EDIT_VACATION",
        payload:{
            destination,
            description,
            img_url,
            from_date,
            until_date,
            price
        }
    }
}

export const follow = (u_id,v_id) => {
    return { // form || action 
        type:"FOLLOW",
        payload:{
            u_id,
            v_id
        }
    }
}
export const unfollow = (id) => {
    return { // form || action 
        type:"UNFOLLOW",
        payload:{
            id
        }
    }
}
