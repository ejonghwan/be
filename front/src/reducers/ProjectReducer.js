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
                    createProject: action.data,
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

            
            // 230904 초대 아직 상태변경 테스트 안함. 이건 프로젝트 수정클릭 -> 유저초대 할때 테스트해보기
            case "PROJECT_INVITE_SUCCESS": 
                return {
                    ...state,
                    loading: false,
                    project: { ...state.project, ...action.data }, //이거해야됨 내일.!! project에 그대로넣으면 그 안에있는 애들은 불변성 안지켜져서 안바뀜. 모두 복사해서 넣어야됨 ...
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





            




            default: return { state }
    }
}

export default ProjectReducer;