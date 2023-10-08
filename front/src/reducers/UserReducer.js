export const UserIntialState = {
    isLogged: false,
    authErrorMessage: '',
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

    authNonUserMailLoading: false,
    authNonUserMailDone: false,
    authNonUserMailError: null,
    
    authNumberLoading: false,
    authNumberlDone: false,
    authNumberlError: null,

    secessionUserLoading: false,
    secessionUserlDone: false,
    secessionUserlError: null,

    changeUserPasswordLoading: false,
    changeUserPasswordDone: false,
    changeUserPasswordError: null,

    findIdLoading: false,
    findIdDone: false,
    findIdError: null,

    questionFindIdLoading: false,
    questionFindIdDone: false,
    questionFindIdError: null,

    editUserProfileImageLoading: false,
    editUserProfileImageDone: false,
    editUserProfileImageError: null,

    chageDarkModeLoading: false,
    chageDarkModeDone: false,
    chageDarkModeError: null,

    inviteMylistProjectLoading: false,
    inviteMylistProjectDone: false,
    inviteMylistProjectError: null,

    rejectMylistProjectLoading: false,
    rejectMylistProjectDone: false,
    rejectMylistProjectError: null,

    user: {},
    requestMyProject: []
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
                    signupUserError: '',
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
            console.log(action.data)
                return {
                    ...state,
                    loadUserLoading: false,
                    loadUserDone: true,
                    loadUserError: '',
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
                    loginUserError: '',
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
                    logoutUserError: '',
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
                    editUserInfoError: '',
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
                    editUserMailError: '',
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
                    authUserMailError:'',
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


            case "NON_USER_MAIL_AUTH_REQUEST": 
                return {
                    ...state,
                    authNonUserMailLoading: true,
                }

            case "NON_USER_MAIL_AUTH_SUCCESS": 
                return {
                    ...state,
                    authNonUserMailLoading: false,
                    authNonUserMailDone: true,
                    authNonUserMailError:'',
                   
                }

            case "NON_USER_MAIL_AUTH_FAILUE" : 
                return {
                    ...state,
                    authNonUserMailLoading: false,
                    authNonUserMailError: action.data
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
                    authNumberError: '',
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
                    secessionUserError: '',
                    user: {},
                    isLogged: false
                    
                }

            case "USER_SECESSION_FAILUE" : 
                return {
                    ...state,
                    secessionUserLoading: false,
                    secessionUserError: action.data
                }
            
          
            case "USER_PASSWORD_EDIT_REQUEST": 
                return {
                    ...state,
                    changeUserPasswordLoading: true,
                }


            case "USER_PASSWORD_EDIT_SUCCESS": 
                return {
                    ...state,
                    changeUserPasswordLoading: false,
                    changeUserPasswordError: '',
                    changeUserPasswordDone: true,
                }

            case "USER_PASSWORD_EDIT_FAILUE" : 
                return {
                    ...state,
                    changeUserPasswordLoading: false,
                    changeUserPasswordError: action.data
                }


            case "USER_FIND_ID_REQUEST": 
                return {
                    ...state,
                    findIdLoading: true,
                }
                

            case "USER_FIND_ID_SUCCESS": 
                return {
                    ...state,
                    findIdLoading: false,
                    findIdError: '',
                    findIdDone: true,
                }

            case "USER_FIND_ID_FAILUE" : 
                return {
                    ...state,
                    findIdLoading: false,
                    findIdError: action.data
                }

            case "USER_QUESTION_FIND_ID_REQUEST": 
                return {
                    ...state,
                    questionFindIdLoading: true,
                }
                

            case "USER_QUESTION_FIND_ID_SUCCESS": 
                return {
                    ...state,
                    questionFindIdLoading: false,
                    questionFindIdError: '',
                    questionFindIdDone: true,
                }

            case "USER_QUESTION_FIND_ID_FAILUE" : 
                return {
                    ...state,
                    questionFindIdLoading: false,
                    questionFindIdError: action.data
                }

            
            // no
            case "USER_PROFILEIMAGE_EDIT_REQUEST": 
                return {
                    ...state,
                    editUserProfileImageLoading: true, 
                }

            case "USER_PROFILEIMAGE_EDIT_SUCCESS": 
                return {
                    ...state,
                    editUserProfileImageLoading: false, 
                    editUserProfileImageDone: true,
                    editUserProfileImageError: '',
                    user: {
                        ...state.user,
                        profileImage: action.data
                    }
                }

            case "USER_PROFILEIMAGE_EDIT_FAILUE": 
                return {
                    ...state,
                    editUserProfileImageLoading: false, 
                    editUserProfileImageError: action.data
                }

            // case "IMAGE_FAILUE": 
            //     return {
            //         ...state,
            //         loading: false, 
            //         imageErrorMessage: action.data,
            //     }


            case "PROJECT_LIKE_SUCCESS": 
                return {
                    ...state,
                    user: {
                        ...state.user,
                        likeProject: state.user.likeProject.concat(action.data)
                    }
                }

            case "PROJECT_LIKE_FAILUE" : 
                return {
                    ...state,
                    globalErrorMessage: action.data
                }


            case "PROJECT_UNLIKE_SUCCESS": 
                return {
                    ...state,
                    user: {
                        ...state.user,
                        likeProject: state.user.likeProject.filter(project => project._id !== action.data)
                    },
                    
                }

            case "PROJECT_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    globalErrorMessage: action.data
                }

            case "CREATE_PROJECT_USER_PUSH" : 
                return {
                    ...state,
                    user: {
                        ...state.user,
                        projects: state.user.projects.concat(action.data)
                    }
                }


            case "USER_DARKMODE_CHANGE_REQUEST": 
                return {
                    ...state,
                    chageDarkModeLoading: true,
                }

            case "USER_DARKMODE_CHANGE_SUCCESS":
                console.log(action.data) 
                return {
                    ...state,
                    chageDarkModeLoading: false,
                    chageDarkModeDone: true,
                    chageDarkModeError:'',
                    user: {
                        ...state.user,
                        darkMode: action.data.mode
                    }
                }

            case "USER_DARKMODE_CHANGE_FAILUE" : 
                return {
                    ...state,
                    chageDarkModeLoading: false,
                    chageDarkModeError: action.data
                }


            case "MYLIST_PROJECT_INVITE_REQUEST": 
                return {
                    ...state,
                    inviteMylistProjectLoading: true,
                }

            case "MYLIST_PROJECT_INVITE_SUCCESS":
                console.log('action.data', action.data)
                return {
                    ...state,
                    inviteMylistProjectLoading: false,
                    inviteMylistProjectDone: true,
                    inviteMylistProjectError:'',
                    user: {
                        ...state.user,
                        projects: state.user.projects.map(project => {
                            if(project._id === action.data.projectId) {
                                project.joinUser = project.joinUser.filter(user => user._id._id !== action.data.userId)
                            }
                            return project
                        })
                    }
                }

            case "MYLIST_PROJECT_INVITE_FAILUE" : 
                return {
                    ...state,
                    inviteMylistProjectLoading: false,
                    inviteMylistProjectError: action.data
                }


            case "MYLIST_PROJECT_REJECT_REQUEST": 
                return {
                    ...state,
                    rejectMylistProjectLoading: true,
                }

            case "MYLIST_PROJECT_REJECT_SUCCESS":
                return {
                    ...state,
                    rejectMylistProjectLoading: false,
                    rejectMylistProjectDone: true,
                    rejectMylistProjectError:'',
                    user: {
                        ...state.user,
                        projects: state.user.projects.map(project => {
                            if(project._id === action.data.projectId) {
                                project.joinUser = project.joinUser.filter(user => user._id._id !== action.data.userId)
                            }
                            return project
                        })
                    }
                }

            case "MYLIST_PROJECT_REJECT_FAILUE" : 
                return {
                    ...state,
                    rejectMylistProjectLoading: false,
                    rejectMylistProjectError: action.data
                }


            case "MYLIST_PROJECT_REQUEST_REQUEST": 
                return {
                    ...state,
                    requestMylistProjectLoading: true,
                }

            case "MYLIST_PROJECT_REQUEST_SUCCESS":
                return {
                    ...state,
                    requestMylistProjectLoading: false,
                    requestMylistProjectDone: true,
                    requestMylistProjectError:'',
                    requestMyProject: action.data
                }

            case "MYLIST_PROJECT_REQUEST_FAILUE" : 
                return {
                    ...state,
                    requestMylistProjectLoading: false,
                    requestMylistProjectError: action.data
                }

            case "MY_PROJECTS_DELETE_SUCCESS":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        projects: state.user.projects.filter(project => project._id !== action.data.projectId)
                    }
                }

            case "MY_PROJECTS_UPDATE_SUCCESS":

            console.log('re?', action.data)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        // projects: state.user.projects.filter(project => project._id !== action.data.projectId)
                    }
                }

            

            default: return { ...state }
    }
}

export default UserReducer;