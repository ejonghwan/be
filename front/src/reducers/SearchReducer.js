export const SearchIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: false,


    searchUserLoading: false,
    searchUserDone: false,
    searchUserError: false,

    searchProjectsLoading: false,
    searchProjectsDone: false,
    searchProjectsError: false,


    userSearch: [],
    categorySearch: [],
    projectSearch: [],
}


const SearchReducer = (state = SearchIntialState, action) => {
    switch(action.type) {

            case "USER_SEARCH_REQUEST": 
                return {
                    ...state,
                    searchUserLoading: true,
                }
            
            case "USER_SEARCH_SUCCESS": 
                // action  {type: "", data: ...} 
                return {
                    ...state,
                    searchUserLoading: false,
                    searchUserDone: true,
                    searchUserError: '',
                    userSearch: action.data
                }

            case "USER_SEARCH_FAILUE" : 
                return {
                    ...state,
                    searchUserLoading: false,
                    searchUserError: action.data,
                }




            case "PROJECT_SEARCH_REQUEST": 
                return {
                    ...state,
                    searchProjectsLoading: true,
                }

            case "PROJECT_SEARCH_SUCCESS": 
                return {
                    ...state,
                    searchProjectsLoading: false,
                    searchProjectsDone: true,
                    searchProjectsError: '',
                    projectSearch: action.data,
                }

            case "PROJECT_SEARCH_FAILUE" : 
                return {
                    ...state,
                    searchProjectsLoading: false,
                    searchProjectsError: action.data,
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






            default: return { ...state }
    }
}

export default SearchReducer;