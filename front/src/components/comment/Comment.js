import { Fragment, useContext, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import { WriteContext } from '../../context/WriteContext';
import CommentDetail from './CommentDetail';
import './Comment.css';

const Comment = ({ comments = [] }) => {

    const { WriteState } = useContext(WriteContext);

    return (
        <Fragment>
            <CommentCreate comments={comments} />
            {WriteState.createCommentLoading && <div>댓글 생성 중.......</div>}
            
            {comments?.map((comment, idx) => (
                <Fragment key={comment._id}>
                    <CommentDetail 
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