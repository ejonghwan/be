export const ProjectIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: false,
    createProject: {},
    loadProject: {},
}


const ProjectReducer = (state = ProjectIntialState, action) => {
    switch(action.type) {
            case "PROJECT_REQUEST" : 
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

            
            case "PROJECT_CREATE_SUCCESS": 
                // action  {type: "", data: ...} 
                return {
                    ...state,
                    loading: false,
                    createProject: action.data,
                }

            case "PROJECT_CREATE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    signupErrorMessage: action.data,
                }


            case "A_PROJECT_LOAD_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    loadProject: action.data,
                }

            case "A_PROJECT_LOAD_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    signupErrorMessage: action.data,
                }
            default: return { state }
    }
}

export default ProjectReducer;