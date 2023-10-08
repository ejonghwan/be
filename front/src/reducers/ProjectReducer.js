export const ProjectIntialState = {
    createProjectLoading: false,
    createProjectDone: false,
    createProjectError: null,

    deleteProjectLoading: false,
    deleteProjectDone: false,
    deleteProjectError: null,

    aLoadProjectLoading: false,
    aLoadProjectDone: false,
    aLoadProjectError: null,

    requestInfriendProjectLoading: false,
    requestInfriendProjectDone: false,
    requestInfriendProjectError: null,
    
    inviteProjectLoading: false,
    inviteProjectDone: false,
    inviteProjectError: null,
    
    rejectProjectLoading: false,
    rejectProjectDone: false,
    rejectProjectError: null,
    
    drowProjectLoading: false,
    drowProjectDone: false,
    drowProjectError: null,

    addInviteProjectLoading: false,
    addInviteProjectDone: false,
    addInviteProjectError: null,

    editProjectLoading: false,
    editProjectDone: false,
    editProjectError: null,

    createWriteLoading: false,
    createWriteDone: false,
    createWriteError: null,

    loadMyProjectsLoading: false,
    loadMyProjectsDone: false,
    loadMyProjectsError: null,

    loadMyapplyProjectLoading: false,
    loadMyapplyProjectDone: false,
    loadMyapplyProjectError: null,

    createProject: {},
    myapplyProject: [],
    project: {},
}


const ProjectReducer = (state = ProjectIntialState, action) => {
    switch(action.type) {
            // case "PROJECT_REQUEST" : 
            //     return {
            //         ...state,
            //         loading: true,
            //     }

            // case "ERROR_LOADING_CLEAR" : 
            //     return {
            //         ...state,
            //         loading: false,
            //         successMessage: '',
            //         errorMessage: '',
            //     }


            case "PROJECT_CREATE_REQUEST": 
                return {
                    ...state,
                    createProjectLoading: true,
                }

            case "PROJECT_CREATE_SUCCESS": 
                // action  {type: "", data: ...} 
                return {
                    ...state,
                    createProjectLoading: false,
                    createProjectDone: true,
                    createProjectError: '',
                    project: action.data,
                }

            case "PROJECT_CREATE_FAILUE" : 
                return {
                    ...state,
                    createProjectLoading: false,
                    createProjectError: action.data,
                }
                
            case "PROJECT_DELETE_REQUEST": 
                return {
                    ...state,
                    deleteProjectLoading: true,
                }

            case "PROJECT_DELETE_SUCCESS": 
                return {
                    ...state,
                    deleteProjectLoading: false,
                    deleteProjectDone: true,
                    deleteProjectError: '',
                    project: {}
                }

            case "PROJECT_DELETE_FAILUE" : 
                return {
                    ...state,
                    deleteProjectLoading: false,
                    deleteProjectError: action.data,
                }

            case "A_PROJECT_LOAD_REQUEST": 
                return {
                    ...state,
                    aLoadProjectLoading: true,
                }

            case "A_PROJECT_LOAD_SUCCESS": 
                return {
                    ...state,
                    aLoadProjectLoading: false,
                    aLoadProjectDone: true,
                    aLoadProjectError: '',
                    project: action.data,
                }

            case "A_PROJECT_LOAD_FAILUE" : 
                return {
                    ...state,
                    aLoadProjectLoading: false,
                    aLoadProjectError: action.data,
                }

            case "PROJECT_LIKE_INC_SUCCESS": 
            console.log('inc', action.data)
                return {
                    ...state,
                    project: {
                        ...state.project, 
                        likeCount: state.project.likeCount + 1,
                        likeUser: state.project.likeUser.concat(action.data)
                    }
                }

            case "PROJECT_LIKE_DEC_SUCCESS": 
            console.log('dec', action.data)
                return {
                    ...state,
                    project: {
                        ...state.project, 
                        likeCount: state.project.likeCount - 1,
                        likeUser: state.project.likeUser.filter(user => user._id !== action.data)
                    }
                }
                
            case "PROJECT_REQUEST_REQUEST": 
                return {
                    ...state,
                    requestInfriendProjectLoading: true,
                }
            
            case "PROJECT_REQUEST_SUCCESS": 
                return {
                    ...state,
                    requestInfriendProjectLoading: false,
                    requestInfriendProjectDone: true,
                    requestInfriendProjectError: '',
                    project: { ...state.project, joinUser: [ ...action.data ] },
                }

            case "PROJECT_REQUEST_FAILUE" : 
                return {
                    ...state,
                    requestInfriendProjectLoading: false,
                    requestInfriendProjectError: action.data
                }
            
            case "PROJECT_INVITE_REQUEST": 
                return {
                    ...state,
                    inviteProjectLoading: true,
                }

            case "PROJECT_INVITE_SUCCESS": 
                return {
                    ...state,
                    inviteProjectLoading: false,
                    inviteProjectDone: true,
                    inviteProjectError: '',
                    project: action.data.project
                }

            case "PROJECT_INVITE_FAILUE" : 
                return {
                    ...state,
                    inviteProjectLoading: false,
                    inviteProjectError: action.data,
                }

            case "PROJECT_REJECT_REQUEST": 
                return {
                    ...state,
                    rejectProjectLoading: true,
                }

            case "PROJECT_REJECT_SUCCESS": 
                return {
                    ...state,
                    rejectProjectLoading: false,
                    rejectProjectDone: true,
                    rejectProjectError: '',
                    project: {...state.project, joinUser: [...state.project.joinUser.filter(user => user._id._id !== action.data.userId)]},
                }

            case "PROJECT_REJECT_FAILUE" : 
                return {
                    ...state,
                    rejectProjectLoading: false,
                    rejectProjectError: action.data,
                }

            case "PROJECT_WITHDRAW_REQUEST": 
                return {
                    ...state,
                    drowProjectLoading: true,
                }

            case "PROJECT_WITHDRAW_SUCCESS": 
                return {
                    ...state,
                    drowProjectLoading: false,
                    drowProjectDone: true,
                    drowProjectError: '',
                    project: action.data,
                }

            case "PROJECT_WITHDRAW_FAILUE" : 
                return {
                    ...state,
                    drowProjectLoading: false,
                    drowProjectError: action.data,
                }

            case "PROJECT_ADD_INVITE_REQUEST": 
                return {
                    ...state,
                    addInviteProjectLoading: true,
                }

            case "PROJECT_ADD_INVITE_SUCCESS": 
                return {
                    ...state,
                    addInviteProjectLoading: false,
                    addInviteProjectDone: true,
                    addInviteProjectError: '',
                    project: {
                        ...state.project,
                        joinUser: [...action.data]
                    },
                }

            case "PROJECT_ADD_INVITE_FAILUE" : 
                return {
                    ...state,
                    addInviteProjectLoading: false,
                    addInviteProjectError: action.data,
                }

            case "PROJECT_EDIT_REQUEST": 
                return {
                    ...state,
                    editProjectLoading: true,
                }

            case "PROJECT_EDIT_SUCCESS": 
                return {
                    ...state,
                    editProjectLoading: false,
                    editProjectDone: true,
                    editProjectError: '',
                    project: {
                        ...state.project,
                        instanceUser: action.data.instanceUser,
                        categorys: action.data.categorys,
                        content: action.data.content,
                        projectImages: action.data.projectImages,
                        projectPublic: action.data.projectPublic,
                        updatedAt: action.data.updatedAt,
                    },
                }

            case "PROJECT_EDIT_FAILUE" : 
                return {
                    ...state,
                    editProjectLoading: false,
                    editProjectError: action.data,
                }

            case "WRITE_CREATE_REQUEST": 
                return {
                    ...state,
                    createWriteLoading: true,
                }

            case "WRITE_CREATE_SUCCESS": 
                return {
                    ...state,
                    createWriteLoading: false,
                    createWriteDone: true,
                    createWriteError: '',
                    project: {
                        ...state.project,
                        writes: [...state.project.writes.concat(action.data.write)]
                    },
                }

            case "WRITE_CREATE_FAILUE" : 
                return {
                    ...state,
                    createWriteLoading: false,
                    createWriteError: action.data,
                }


            case "PROJECT_MYAPPLY_LOAD_REQUEST": 
                return {
                    ...state,
                    loadMyapplyProjectLoading: true,
                }

            case "PROJECT_MYAPPLY_LOAD_SUCCESS": 
                return {
                    ...state,
                    loadMyapplyProjectLoading: false,
                    loadMyapplyProjectDone: true,
                    loadMyapplyProjectError: '',
                    myapplyProject: action.data
                }

            case "PROJECT_MYAPPLY_LOAD_FAILUE" : 
                return {
                    ...state,
                    loadMyapplyProjectLoading: false,
                    loadMyapplyProjectError: action.data,
                }
            
            default: return { ...state }
    }
}

export default ProjectReducer;