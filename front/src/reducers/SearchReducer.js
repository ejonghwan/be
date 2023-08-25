export const SearchIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: false,
    userSearch: [],
    categorySearch: [],
    projectSearch: [],
}


const SearchReducer = (state = SearchIntialState, action) => {
    switch(action.type) {
            case "SEARCH_REQUEST" : 
                return {
                    ...state,
                    loading: true,
                }

            case "ERROR_LOADING_CLEAR" : 
                return {
                    ...state,
                    loading: false,
                    successMessage: '',
                    errorMessage: '',
                }

            
            case "USER_SEARCH_SUCCESS": 
                // action  {type: "", data: ...} 
                return {
                    ...state,
                    loading: false,
                    userSearch: action.data,
                }

            case "USER_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    // signupErrorMessage: action.data,
                }


            case "CATEGORY_SEARCH_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    // user: action.data,
                    // isLogged: true,
                }

            case "CATEGORY_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    // isLogged: false,
                }


            case "PROJECT_SEARCH_SUCCESS": 
                return {
                    ...state,
                    loginErrorMessage: '',
                    loading: false,
                    user: action.data,
                    isLogged: true,
                }

            case "PROJECT_SEARCH_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    loginErrorMessage: action.data,
                }

                

            default: return { state }
    }
}

export default SearchReducer;