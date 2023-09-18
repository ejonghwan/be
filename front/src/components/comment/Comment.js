
import './Comment.css'
import { loadCommentRequest } from '../../context/CommentContext';
import { Fragment, useEffect } from 'react';
import CommentUserThum from './CommentUserThum';


const Comment = ({ comments = [] }) => {


    // const loadComment = async() => {
    //     try {
    //         await loadCommentRequest();
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        // loadComment();
    }, [])

    return (
        <Fragment>
            {comments.map(comment => (
                <Fragment key={comment._id}>
                    
                    <CommentUserThum 
                        users={[comment.user]} 
                        content={comment.content}
                        comment={comment}
                        isText={true} 
                        isId={false}
                        className={'horizontal_type1'} 
                    />
                   
                </Fragment>
            ))}
        </Fragment>
    );
};

export default Comment;