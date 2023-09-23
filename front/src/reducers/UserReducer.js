export const UserIntialState = {
    isLogged: false,
    successMessage: '',
    authErrorMessage: '',
    loginErrorMessage: '',
    signupErrorMessage: '',
    findIdErrorMessage: '',
    findPasswordErrorMessage: '',
    infoEditErrorMessage: '',
    passwordEditErrorMessage: '',
    mailAuthErrorMessage: '',
    imageErrorMessage: '',
    globalErrorMessage: '',
    loading: null,

    signupUserLoading: false,
    signupUserDone: false,
    signupUserError: null,

    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,

    loginUserLoading: false,
    loginUserDone: false,
    loginUserError: null,

    logoutUserLoading: false,
    logoutUserDone: false,
    logoutUserError: null,
    
    editUserInfoLoading: false,
    editUserInfoDone: false,
    editUserInfoError: null,

    editUserMailLoading: false,
    editUserMailDone: false,
    editUserMailError: null,

    authUserMailLoading: false,
    authUserMailDone: false,
    authUserMailError: null,
    
    authNumberLoading: false,
    authNumberlDone: false,
    authNumberlError: null,

    secessionUserLoading: false,
    secessionUserlDone: false,
    secessionUserlError: null,

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
                    findIdErrorMessage: '',
                    findPasswordErrorMessage: '',
                    passwordEditErrorMessage: '',
                    mailAuthErrorMessage: '',
                    imageErrorMessage: '',
                    globalErrorMessage: '',
                }

            // case "LOADING_CLEAR" : 
            //     return {
            //         ...state,
            //         loading: false,
            //     }

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
                    loadUserError: null,
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

            case "USER_LOGIN_REQUEST": 
                return {
                    ...state,
                    loginUserLoading: true,
                }

            case "USER_LOGIN_SUCCESS": 
                return {
                    ...state,
                    loginUserLoading: false,
                    loginUserDone: true,
                    loginUserError: null,
                    user: action.data,
                    isLogged: true,
                }

            case "USER_LOGIN_FAILUE" : 
                return {
                    ...state,
                    loginUserLoading: false,
                    isLogged: false,
                    loginUserError: action.data,
                }
                
            case "USER_LOGOUT_REQUEST": 
                return {
                    ...state, 
                    logoutUserLoading: true
                }

            
            case "USER_LOGOUT_SUCCESS": 
                return {
                    ...state, 
                    logoutUserLoading: false,
                    logoutUserError: null,
                    user: {},
                    isLogged: false,
                }


            case "USER_LOGOUT_FAILUE": 
                return {
                    ...state, 
                    logoutUserLoading: false,
                    logoutUserError: action.data,
                }


            case "USER_INFO_EDIT_REQUEST" : 
                return {
                    ...state,
                    editUserInfoLoading: true,
                }


            case "USER_INFO_EDIT_SUCCESS": 
                return {
                    ...state,
                    editUserInfoLoading: false,
                    editUserInfoError: null,
                    user: {
                        ...state.user,
                        name: action.data.name,
                        gender: action.data.gender,
                        birthday: action.data.birthday,
                        phoneNumber: action.data.phoneNumber,
                    }
                }
            case "USER_INFO_EDIT_FAILUE" : 
                return {
                    ...state,
                    editUserInfoLoading: false,
                    editUserInfoError: action.data,
                }

            case "USER_MAIL_EDIT_REQUEST": 
                return {
                    ...state,
                    editUserMailLoading: true,
                }

            case "USER_MAIL_EDIT_SUCCESS": 
                return {
                    ...state,
                    editUserMailLoading: false,
                    editUserMailDone: true,
                    editUserMailError: null,
                    user: {
                        ...state.user,
                        email: action.data.email,
                    }
                }

            case "USER_MAIL_EDIT_FAILUE" : 
                return {
                    ...state,
                    editUserMailLoading: false,
                    editUserMailError: action.data,
                }

            case "USER_MAIL_AUTH_REQUEST": 
                return {
                    ...state,
                    authUserMailLoading: true,
                }

            case "USER_MAIL_AUTH_SUCCESS": 
                return {
                    ...state,
                    authUserMailLoading: false,
                    authUserMailDone: true,
                    user: {
                        ...state.user,
                        email: action.data.email
                    }
                }

            case "USER_MAIL_AUTH_FAILUE" : 
                return {
                    ...state,
                    authUserMailLoading: false,
                    authUserMailError: action.data
                }


            case "AUTH_NUMBER_REQUEST": 
                return {
                    ...state,
                    authNumberLoading: true,
                }

            case "AUTH_NUMBER_SUCCESS": 
                return {
                    ...state,
                    authNumberLoading: false,
                    authNumberDone: true,
                    authNumberError: null,
                }

            case "AUTH_NUMBER_FAILUE" : 
                return {
                    ...state,
                    authNumberLoading: false,
                    authNumberError: action.data
                }
            
            case "USER_SECESSION_REQUEST": 
                return {
                    ...state,
                    secessionUserLoading: true,
                }

            case "USER_SECESSION_SUCCESS": 
                return {
                    ...state,
                    secessionUserLoading: false,
                    secessionUserDone: true,
                    secessionUserError: null,
                    user: {},
                    isLogged: false
                    
                }

            case "USER_SECESSION_FAILUE" : 
                return {
                    ...state,
                    secessionUserLoading: false,
                    secessionUserError: action.data
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