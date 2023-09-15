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

            



            default: return { state }
    }
}

export default WriteReducer;