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

    searchProjectsRelationLoading: false,
    searchProjectsRelationDone: false,
    searchProjectsRelationError: false,

    recentSearchLoading: false,
    recentSearchDone: false,
    recentSearchError: false,

    recentSearchAddLoading: false,
    recentSearchAddDone: false,
    recentSearchAddError: false,

    recentSearchDeleteLoading: false,
    recentSearchDeleteDone: false,
    recentSearchDeleteError: false,

    recentSearchAllDeleteLoading: false,
    recentSearchAllDeleteDone: false,
    recentSearchAllDeleteError: false,


    userSearch: [],
    categorySearch: [],
    projectSearchData: [],
    recentText: [],
    relationSearch: []

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
                    projectSearchData: action.data,
                }

            case "PROJECT_SEARCH_FAILUE" : 
                return {
                    ...state,
                    searchProjectsLoading: false,
                    searchProjectsError: action.data,
                }

                
            case "PROJECT_SEARCH_RELATION_REQUEST": 
                return {
                    ...state,
                    searchProjectsRelationLoading: true,
                }

            case "PROJECT_SEARCH_RELATION_SUCCESS": 
                return {
                    ...state,
                    searchProjectsRelationLoading: false,
                    searchProjectsRelationDone: true,
                    searchProjectsRelationError: '',
                    relationSearch: action.data,
                }

            case "PROJECT_SEARCH_RELATION_FAILUE" : 
                return {
                    ...state,
                    searchProjectsRelationRelationLoading: false,
                    searchProjectsRelationError: action.data,
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



            case "RECENT_SEARCH_LOAD_REQUEST": 
                return {
                    ...state,
                    recentSearchLoading: true,
                }

            case "RECENT_SEARCH_LOAD_SUCCESS": 
                return {
                    ...state,
                    recentSearchLoading: false,
                    recentSearchDone: true,
                    recentSearchError: '',
                    recentText: action.data,
                }

            case "RECENT_SEARCH_LOAD_FAILUE" : 
                return {
                    ...state,
                    recentSearchLoading: false,
                    recentSearchError: action.data,
                }
            

            case "RECENT_SEARCH_ADD_REQUEST": 
                return {
                    ...state,
                    recentSearchAddLoading: true,
                }

            case "RECENT_SEARCH_ADD_SUCCESS": 
                return {
                    ...state,
                    recentSearchAddLoading: false,
                    recentSearchAddDone: true,
                    recentSearchAddError: '',
                    recentText: [action.data, ...state.recentText],
                }

            case "RECENT_SEARCH_ADD_FAILUE" : 
                return {
                    ...state,
                    recentSearchAddLoading: false,
                    recentSearchAddError: action.data,
                }


                
            case "RECENT_SEARCH_DELETE_REQUEST": 
                return {
                    ...state,
                    recentSearchDeleteLoading: true,
                }

            case "RECENT_SEARCH_DELETE_SUCCESS": 
                return {
                    ...state,
                    recentSearchDeleteLoading: false,
                    recentSearchDeleteDone: true,
                    recentSearchDeleteError: '',
                    recentText: state.recentText.filter(text => text !== action.data),
                }

            case "RECENT_SEARCH_DELETE_FAILUE" : 
                return {
                    ...state,
                    recentSearchDeleteLoading: false,
                    recentSearchDeleteError: action.data,
                }


            case "RECENT_SEARCH_ALLDELETE_REQUEST": 
                return {
                    ...state,
                    recentSearchAllDeleteLoading: true,
                }

            case "RECENT_SEARCH_ALLDELETE_SUCCESS": 
                return {
                    ...state,
                    recentSearchAllDeleteLoading: false,
                    recentSearchAllDeleteDone: true,
                    recentSearchAllDeleteError: '',
                    recentText: []
                }

            case "RECENT_SEARCH_ALLDELETE_FAILUE" : 
                return {
                    ...state,
                    recentSearchAllDeleteLoading: false,
                    recentSearchAllDeleteError: action.data,
                }





            default: return { ...state }
    }
}

export default SearchReducer;