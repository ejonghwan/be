export const WriteIntialState = {
  
    loadLoading: false,
    loadDone: false,
    loadError: null,

    createLoading: false,
    createDone: false,
    createError: null,

    likeLoading: false,
    likeDone: false,
    likeError: null,

    unlikeLoading: false,
    unlikeDone: false,
    unlikeError: null,

    editWriteLoading: false,
    editWriteDone: false,
    editWriteError: null,

    deleteWriteLoading: false,
    deleteWriteDone: false,
    deleteWriteError: null,

    createCommentLoading: false,
    createCommentDone: false,
    createCommentError: null,


    createWrites: {},
    writes: {},
}


const WriteReducer = (state = WriteIntialState, action) => {
    switch(action.type) {

            case "WRITE_LOAD_REQUEST" : 
                return {
                    ...state,
                    loadLoading: true,
                }

            case "WRITE_LOAD_SUCCESS": 
                return {
                    ...state,
                    loadLoading: false,
                    loadDone: true,
                    writes: action.data
                }

            case "WRITE_LOAD_FAILUE" : 
                return {
                    ...state,
                    loadLoading: false,
                    loadError: action.data,
                }

            case "WRITE_LIKE_REQUEST": 
                return {
                    ...state,
                    likeLoading: true,
                }

            case "WRITE_LIKE_SUCCESS": 
                return {
                    ...state,
                    likeLoading: false,
                    likeDone: true,
                    writes: {
                        ...state.writes,
                        likeCount: state.writes.likeCount + 1,
                        likes: state.writes.likes.concat(action.data)
                    }
                }

            case "WRITE_LIKE_FAILUE" : 
                return {
                    ...state,
                    likeLoading: false,
                    likeError: action.data,
                }


            case "WRITE_UNLIKE_REQUEST": 
                return {
                    ...state,
                    unlikeLoading: true,
                }

            case "WRITE_UNLIKE_SUCCESS": 
                return {
                    ...state,
                    unlikeLoading: false,
                    unlikeDone: true,
                    writes: {
                        ...state.writes,
                        likeCount: state.writes.likeCount - 1,
                        likes: state.writes.likes.filter(user => user !== action.data)
                    }
                }

            case "WRITE_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    unlikeLoading: false,
                    unlikeError: action.data,
                }


            case "WRITE_EDIT_REQUEST": 
                return {
                    ...state,
                    editWriteLoading: true,
                }

            case "WRITE_EDIT_SUCCESS": 
                return {
                    ...state,
                    editWriteLoading: false,
                    editWriteDone: true,
                    writes: {
                        ...state.writes,
                        title: action.data.title,
                        content: action.data.content,
                    }
                }

            case "WRITE_EDIT_FAILUE" : 
                return {
                    ...state,
                    editWriteLoading: false,
                    editWriteError: action.data,
                }

            case "WRITE_IMAGE_EDIT_SUCCESS" : 
                return {
                    ...state,
                    writes: {
                        ...state.writes,
                        writeImages: [action.data]
                    }
                }


            case "WRITE_DELETE_REQUEST": 
                return {
                    ...state,
                    deleteWriteLoading: true,
                }

            case "WRITE_DELETE_SUCCESS": 
                return {
                    ...state,
                    deleteWriteLoading: false,
                    deleteWriteDone: true,
                    // writes: {
                    //     ...state.writes,
                    //     title: action.data.title,
                    //     content: action.data.content,
                    // }
                }

            case "WRITE_DELETE_FAILUE" : 
                return {
                    ...state,
                    deleteWriteLoading: false,
                    deleteWriteError: action.data,
                }



            case "COMMENT_CREATE_REQUEST": 
                return {
                    ...state,
                    createCommentLoading: true,
                }

            case "COMMENT_CREATE_SUCCESS": 
                return {
                    ...state,
                    createCommentLoading: false,
                    createCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.concat(action.data)
                    }
                }

            case "COMMENT_CREATE_FAILUE" : 
                return {
                    ...state,
                    createCommentLoading: false,
                    createCommentError: action.data,
                }
            



            default: return { state }
    }
}

export default WriteReducer;