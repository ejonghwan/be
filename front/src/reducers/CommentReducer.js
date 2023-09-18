export const CommentIntialState = {
    Comments: [],
}


const CommentReducer = (state = CommentIntialState, action) => {
    switch(action.type) {

        case "Comment_LOAD_REQUEST": 
            return {
                ...state,
                Comments: [...state.Comments].concat(action.data),
            }

        case "Comment_UPLOAD_REQUEST": 
            return {
                ...state,
                Comments: [...state.Comments].concat(action.data),
            }

        default: 
            return {
                ...state
            }
    }
}



export default CommentReducer;