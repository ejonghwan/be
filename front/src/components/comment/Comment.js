
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
        <div>
            {comments.map(comment => (
                <Fragment key={comment._id}>
                    <div>
                        <CommentUserThum 
                            users={[comment.user]} 
                            content={comment.content}
                            isText={true} 
                            isId={false}
                            className={'horizontal_type1'} 
                        />
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default Comment;