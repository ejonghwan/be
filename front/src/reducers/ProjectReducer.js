export const ProjectIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: false,
    createProject: {},
    project: {},
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
                    project: action.data,
                }

            case "PROJECT_CREATE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }


            case "A_PROJECT_LOAD_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: action.data,
                }

            case "A_PROJECT_LOAD_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }


            case "PROJECT_LIKE_INC_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: {...state.project, likeCount: state.project.likeCount + 1}
                }

            case "PROJECT_LIKE_DEC_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: {...state.project, likeCount: state.project.likeCount - 1}
                }

            
            case "PROJECT_REQUEST_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: { ...state.project, joinUser: [ ...action.data ] },
                }

            case "PROJECT_REQUEST_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }

            
            case "PROJECT_INVITE_SUCCESS": 
                console.log('PROJECT_INVITE_SUCCESS', action.data)
                return {
                    ...state,
                    loading: false,
                    project: action.data
                }

            case "PROJECT_INVITE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }


            case "PROJECT_REJECT_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: {...state.project, joinUser: [...state.project.joinUser.filter(user => user._id._id !== action.data.userId)]},
                }

            case "PROJECT_REJECT_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }


            case "PROJECT_WITHDRAW_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: action.data,
                }

            case "PROJECT_WITHDRAW_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }

            default: return { state }
    }
}

export default ProjectReducer;