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

    likeCommentLoading: false,
    likeCommentDone: false,
    likeCommentError: null,

    unlikeCommentLoading: false,
    unlikeCommentDone: false,
    unlikeCommentError: null,

    createRecommentLoading: false,
    createRecommentDone: false,
    createRecommentError: null,

    likeRecommentLoading: false,
    likeRecommentDone: false,
    likeRecommentError: null,

    unlikeRecommentLoading: false,
    unlikeRecommentDone: false,
    unlikeRecommentError: null,

    editRecommentLoading: false,
    editRecommentDone: false,
    editRecommentError: null,

    createWrites: {},
    writes: {},
}


const WriteReducer = (state = WriteIntialState, action) => {
    switch(action.type) {

            case "WRITE_LOAD_REQUEST" : 
                return {
                    ...state,
                    loadLoading: true,
                };

            case "WRITE_LOAD_SUCCESS": 
                return {
                    ...state,
                    loadLoading: false,
                    loadDone: true,
                    writes: {
                        ...action.data, 
                        comments: action.data.comments.map(comment => {
                            comment.recomments.reverse();
                            return comment;
                        }).reverse()
                    }
                };

            case "WRITE_LOAD_FAILUE" : 
                return {
                    ...state,
                    loadLoading: false,
                    loadError: action.data,
                };

            case "WRITE_LIKE_REQUEST": 
                return {
                    ...state,
                    likeLoading: true,
                };

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
                };

            case "WRITE_LIKE_FAILUE" : 
                return {
                    ...state,
                    likeLoading: false,
                    likeError: action.data,
                };


            case "WRITE_UNLIKE_REQUEST": 
                return {
                    ...state,
                    unlikeLoading: true,
                };

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
                };

            case "WRITE_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    unlikeLoading: false,
                    unlikeError: action.data,
                };

            case "WRITE_EDIT_REQUEST": 
                return {
                    ...state,
                    editWriteLoading: true,
                };

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
                };

            case "WRITE_EDIT_FAILUE" : 
                return {
                    ...state,
                    editWriteLoading: false,
                    editWriteError: action.data,
                };

            case "WRITE_IMAGE_EDIT_SUCCESS" : 
                return {
                    ...state,
                    writes: {
                        ...state.writes,
                        writeImages: [action.data]
                    }
                };


            case "WRITE_DELETE_REQUEST": 
                return {
                    ...state,
                    deleteWriteLoading: true,
                };

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
                };

            case "WRITE_DELETE_FAILUE" : 
                return {
                    ...state,
                    deleteWriteLoading: false,
                    deleteWriteError: action.data,
                };



            case "COMMENT_CREATE_REQUEST": 
                return {
                    ...state,
                    createCommentLoading: true,
                };

            case "COMMENT_CREATE_SUCCESS": 
                return {
                    ...state,
                    createCommentLoading: false,
                    createCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: [action.data, ...state.writes.comments]
                    }
                };

            case "COMMENT_CREATE_FAILUE" : 
                return {
                    ...state,
                    createCommentLoading: false,
                    createCommentError: action.data,
                };
            

            case "COMMENT_LIKE_REQUEST": 
                return {
                    ...state,
                    likeCommentLoading: true,
                };

            case "COMMENT_LIKE_SUCCESS": 
                return {
                    ...state,
                    likeCommentLoading: false,
                    likeCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => comment._id === action.data.commentId ? 
                            { ...comment, likes: comment.likes.concat(action.data.userId), likeCount: comment.likeCount + 1 } : comment)
                    }
                };

            case "COMMENT_LIKE_FAILUE" : 
                return {
                    ...state,
                    likeCommentLoading: false,
                    likeCommentError: action.data,
                };

            case "COMMENT_UNLIKE_REQUEST": 
                return {
                    ...state,
                    unlikeCommentLoading: true,
                };

            case "COMMENT_UNLIKE_SUCCESS": 
                
                return {
                    ...state,
                    unlikeCommentLoading: false,
                    unlikeCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => comment._id === action.data.commentId ? 
                            { ...comment, likes: comment.likes.filter(_id => _id !== action.data.userId), likeCount: comment.likeCount - 1 } : comment)
                    }
                };

            case "COMMENT_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    unlikeCommentLoading: false,
                    unlikeCommentError: action.data,
                };


            case "COMMENT_EDIT_REQUEST": 
                return {
                    ...state,
                    editCommentLoading: true,
                };

            case "COMMENT_EDIT_SUCCESS": 
                console.log('re', action.data)
                return {
                    ...state,
                    editCommentLoading: false,
                    editCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => comment._id === action.data._id ? 
                            { ...comment, content: action.data.content } : comment)
                    }
                };

            case "COMMENT_EDIT_FAILUE" : 
                return {
                    ...state,
                    editCommentLoading: false,
                    editCommentError: action.data,
                };


            case "COMMENT_DELETE_REQUEST": 
                return {
                    ...state,
                    deleteCommentLoading: true,
                };

            case "COMMENT_DELETE_SUCCESS": 
                return {
                    ...state,
                    deleteCommentLoading: false,
                    deleteCommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.filter(comment => comment._id !== action.data.commentId) 
                    }
                };

            case "COMMENT_DELETE_FAILUE" : 
                return {
                    ...state,
                    deleteCommentLoading: false,
                    deleteCommentError: action.data,
                };


            case "RECOMMENT_CREATE_REQUEST": 
                return {
                    ...state,
                    createRecommentLoading: true,
                };

            case "RECOMMENT_CREATE_SUCCESS": 
                const idx = state.writes.comments.findIndex(comment => comment._id === action.data.commentId);
                const selectComment = state.writes.comments[idx];
                const recomments = [action.data.recomment, ...selectComment.recomments]
                const newComment = [...state.writes.comments]
                newComment[idx] = { ...selectComment, recomments }

                return {
                    ...state,
                    createRecommentLoading: false,
                    createRecommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: newComment
                    }
                };

            case "RECOMMENT_CREATE_FAILUE" : 
                return {
                    ...state,
                    createRecommentLoading: false,
                    createRecommentError: action.data,
                };


            
            case "RECOMMENT_LIKE_REQUEST": 
                return {
                    ...state,
                    likeRecommentLoading: true,
                };

            case "RECOMMENT_LIKE_SUCCESS": 
                return {
                    ...state,
                    likeRecommentLoading: false,
                    likeRecommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => {
                            if(comment._id === action.data.commentId) {
                                comment.recomments.map(recomment => {
                                    if(recomment._id === action.data.recommentId) {
                                        recomment.likeCount += 1
                                        recomment.likes = [...recomment.likes, action.data.userId]
                                    }
                                    return recomment;
                                })
                            }
                            return comment;
                        })
                    }
                };

            case "RECOMMENT_LIKE_FAILUE" : 
                return {
                    ...state,
                    unlikeRecommentLoading: false,
                    unlikeRecommentError: action.data,
                };


            case "RECOMMENT_UNLIKE_REQUEST": 
                return {
                    ...state,
                    unlikeRecommentLoading: true,
                };

            case "RECOMMENT_UNLIKE_SUCCESS": 
                return {
                    ...state,
                    unlikeRecommentLoading: false,
                    unlikeRecommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => {
                            if(comment._id === action.data.commentId) {
                                comment.recomments.map(recomment => {
                                    if(recomment._id === action.data.recommentId) {
                                        recomment.likeCount -= 1;
                                        recomment.likes = recomment.likes.filter(rec => rec !== action.data.userId);
                                    }
                                    return recomment;
                                });
                            };
                            return comment;
                        })
                    }
                };

            case "RECOMMENT_UNLIKE_FAILUE" : 
                return {
                    ...state,
                    unlikeRecommentLoading: false,
                    unlikeRecommentError: action.data,
                };


            case "RECOMMENT_EDIT_REQUEST": 
                return {
                    ...state,
                    editRecommentLoading: true,
                };

            case "RECOMMENT_EDIT_SUCCESS": 
                console.log(action.data)
                return {
                    ...state,
                    editRecommentLoading: false,
                    editRecommentDone: true,
                    writes: {
                        ...state.writes,
                        comments: state.writes.comments.map(comment => {
                            if(comment._id === action.data.commentId) {
                                comment.recomments.map(recomment => {
                                    if(recomment._id === action.data.recomment._id) {
                                        recomment.content = action.data.recomment.content;
                                        recomment.modified = action.data.recomment.modified;
                                    }
                                    return recomment;
                                });
                            };
                            return comment;
                        })
                    }
                };

            case "RECOMMENT_EDIT_FAILUE" : 
                return {
                    ...state,
                    editRecommentLoading: false,
                    editRecommentError: action.data,
                };







            default: return { state }
    }
}

export default WriteReducer;