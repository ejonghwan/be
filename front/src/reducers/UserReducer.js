export const UserIntialState = {
    isLogged: false,
    successMessage: '',
    authErrorMessage: '',
    loginErrorMessage: '',
    signupErrorMessage: '',
    findIdErrorMessage: '',
    findPasswordErrorMessage: '',
    infoEditErrorMessage: '',
    mailEditErrorMessage: '',
    passwordEditErrorMessage: '',
    mailAuthErrorMessage: '',
    authNumberErrorMessage: '',
    imageErrorMessage: '',
    globalErrorMessage: '',
    loading: null,

    signupUserLoading: false,
    signupUserDone: false,
    signupUserError: null,

    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,

    user: {},
}


const UserReducer = (state = UserIntialState, action) => {
    switch(action.type) {
            case "LOADING" : return {
                ...state,
                loading: true,
            }
            case "ERROR_LOADING_CLEAR" : 
                return {
                    ...state,
                    authErrorMessage: '',
                    loginErrorMessage: '',
                    signupErrorMessage: '',
                    findIdErrorMessage: '',
                    findPasswordErrorMessage: '',
                    infoEditErrorMessage: '',
                    mailEditErrorMessage: '',
                    passwordEditErrorMessage: '',
                    authNumberErrorMessage: '',
                    mailAuthErrorMessage: '',
                    imageErrorMessage: '',
                    globalErrorMessage: '',
                }

            case "LOADING_CLEAR" : 
                return {
                    ...state,
                    loading: false,
                }

            case "USER_SIGNUP_REQEUST": 
                return {
                    ...state,
                    signupUserLoading: true,
                }
            
            case "USER_SIGNUP_SUCCESS": 
                return {
                    ...state,
                    signupUserLoading: false,
                    signupUserDone: true
                }

            case "USER_SIGNUP_FAILUE" : 
                return {
                    ...state,
                    signupUserLoading: false,
                    signupUserError: action.data,
                }

            case "USER_LOAD_REQUEST": 
                return {
                    ...state,
                    loadUserLoading: true,
                }

            case "USER_LOAD_SUCCESS": 
                return {
                    ...state,
                    loadUserLoading: false,
                    loadUserDone: true,
                    user: action.data,
                    isLogged: true,
                }

            case "USER_LOAD_FAILUE" : 
                return {
                    ...state,
                    loadUserLoading: false,
                    loadUserError: action.data,
                    isLogged: false,
                }







            case "USER_LOGIN_SUCCESS": 
                return {
                    ...state,
                    loginErrorMessage: '',
                    loading: false,
                    user: action.data,
                    isLogged: true,
                }

            case "USER_LOGIN_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    isLogged: false,
                    loginErrorMessage: action.data,
                }


            case "USER_LOGOUT_SUCCESS": 
                return {
                    ...state, 
                    loading: false,
                    user: {},
                    isLogged: false,
                }


            case "USER_USER_INFO_EDIT_SUCCESS": 
                return {
                    ...state,
                    infoEditErrorMessage: '',
                    loading: false,
                    user: {
                        ...state.user,
                        name: action.data.name,
                        gender: action.data.gender,
                        birthday: action.data.birthday,
                        phoneNumber: action.data.phoneNumber,
                    }
                }
            case "USER_USER_INFO_EDIT_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    infoEditErrorMessage: action.data,
                }


            case "USER_MAIL_EDIT_SUCCESS": 
                return {
                    ...state,
                    mailEditErrorMessage: '',
                    loading: false,
                    user: {
                        ...state.user,
                        email: action.data.email,
                    }
                }

            case "USER_MAIL_EDIT_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    mailEditErrorMessage: action.data,
                }


            case "USER_MAIL_AUTH_SUCCESS": 
                return {
                    ...state,
                    authErrorMessage: '',
                    loading: false,
                }

            case "USER_MAIL_AUTH_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    mailAuthErrorMessage: action.data,
                }


            case "AUTH_NUMBER_SUCCESS": 
                return {
                    ...state,
                    authNumberErrorMessage: '',
                    loading: false,
                }

            case "AUTH_NUMBER_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    authNumberErrorMessage: action.data,
                }
            
          
          

            case "USER_PASSWORD_EDIT_SUCCESS": 
                return {
                    ...state,
                    passwordEditErrorMessage: '',
                    loading: false,
                }

            case "USER_PASSWORD_EDIT_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    passwordEditErrorMessage: action.data,
                }


            case "USER_PROFILEIMAGE_EDIT_SUCCESS": 
                return {
                    ...state,
                    loading: false, 
                    user: {
                        ...state.user,
                        profileImage: action.data
                    }
                }

            case "IMAGE_FAILUE": 
                return {
                    ...state,
                    loading: false, 
                    imageErrorMessage: action.data,
                }


            case "PROJECT_LIKE_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    user: {
                        ...state.user,
                        likeProject: [action.data, ...state.user.likeProject]
                    }
                }

            case "PROJECT_LIKE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    globalErrorMessage: action.data
                }


            case "PROJECT_UNLIKE_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    user: {
                        ...state.user,
                        likeProject: state.user.likeProject.filter(id => id !== action.data)
                    },
                    
                }

            case "PROJECT_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    globalErrorMessage: action.data
                }

            default: return { state }
    }
}

export default UserReducer;