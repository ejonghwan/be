
import './Comment.css'
import { loadCommentRequest } from '../../context/CommentContext';
import { Fragment, useContext, useEffect } from 'react';
import CommentUserThum from './CommentUserThum';
import CommentCreate from './CommentCreate';
import { WriteContext } from '../../context/WriteContext';


const Comment = ({ comments = [] }) => {

    const { WriteState } = useContext(WriteContext);

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
            <CommentCreate comments={comments} />
            {WriteState.createCommentLoading && <div>댓글 생성 중.......</div>}
            {comments.map((comment, idx) => (
                <Fragment key={comment._id}>
                    <CommentUserThum 
                        // users={[comment.user]} 
                        // content={comment.content}
                        comment={comment}
                        isText={true} 
                        isId={false}
                        className={'horizontal_type1'} 
                        idx={idx}
                    />
                   
                </Fragment>
            ))}
        </Fragment>
    );
};

export default Comment;