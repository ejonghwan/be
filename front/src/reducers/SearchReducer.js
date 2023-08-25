export const SearchIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: '',
    userSearch: [],
    categorySearch: [],
    projectSearch: [],
}


const SearchReducer = (state = SearchIntialState, action) => {
    switch(action.type) {
            case "LOADING" : return {
                ...state,
                loading: action.loadingMessage,
            }
            case "ERROR_LOADING_CLEAR" : 
                return {
                    ...state,
                    loading: '',
                    successMessage: '',
                    errorMessage: '',
                }

            
            case "USER_SEARCH_SUCCESS": 
                return {
                    ...state,
                    // signupErrorMessage: '',
                    loading: '',
                }

            case "USER_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    // signupErrorMessage: action.data,
                }


            case "CATEGORY_SEARCH_SUCCESS": 
                return {
                    ...state,
                    loading: '',
                    // user: action.data,
                    // isLogged: true,
                }

            case "CATEGORY_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    // isLogged: false,
                }


            case "PROJECT_SEARCH_SUCCESS": 
                return {
                    ...state,
                    loginErrorMessage: '',
                    loading: '',
                    user: action.data,
                    isLogged: true,
                }

            case "PROJECT_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    loginErrorMessage: action.data,
                }


            case "USER_LOGOUT_SUCCESS": 
                return {
                    ...state, 
                    loading: '',
                    user: {},
                    isLogged: false,
                }


            case "USER_USER_INFO_EDIT_SUCCESS": 
                return {
                    ...state,
                    infoEditErrorMessage: '',
                    loading: '',
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
                    loading: '',
                    infoEditErrorMessage: action.data,
                }


            case "USER_MAIL_EDIT_SUCCESS": 
                return {
                    ...state,
                    mailEditErrorMessage: '',
                    loading: '',
                    user: {
                        ...state.user,
                        email: action.data.email,
                    }
                }

            case "USER_MAIL_EDIT_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    mailEditErrorMessage: action.data,
                }


            case "USER_MAIL_AUTH_SUCCESS": 
                return {
                    ...state,
                    authErrorMessage: '',
                    loading: '',
                }

            case "USER_MAIL_AUTH_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    mailAuthErrorMessage: action.data,
                }


            case "AUTH_NUMBER_SUCCESS": 
                return {
                    ...state,
                    authNumberErrorMessage: '',
                    loading: '',
                }

            case "AUTH_NUMBER_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    authNumberErrorMessage: action.data,
                }
            
          
          

            case "USER_PASSWORD_EDIT_SUCCESS": 
                return {
                    ...state,
                    passwordEditErrorMessage: '',
                    loading: '',
                }

            case "USER_PASSWORD_EDIT_FAILUE" : 
                return {
                    ...state,
                    loading: '',
                    passwordEditErrorMessage: action.data,
                }


            case "USER_PROFILEIMAGE_EDIT_SUCCESS": 
                return {
                    ...state,
                    loading: '', 
                    user: {
                        ...state.user,
                        profileImage: action.data
                    }
                }

            case "IMAGE_FAILUE": 
                return {
                    ...state,
                    loading: '', 
                    imageErrorMessage: action.data,
                }

            

            default: return { state }
    }
}

export default SearchReducer;