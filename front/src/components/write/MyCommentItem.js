import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { changeViewDate } from '../../utils/utils';
import IconData from '../common/icon/IconData';
import Button from '../common/form/Button';
import { WriteContext } from '../../context/WriteContext';
import WriteRequest from '../../reducers/WriteRequest';
import Spinners from '../common/spinners/Spinners';
import './MyCommentItem.css';


const MyCommentItem = ({ comments = [] }) => {

    const { deleteMyComment } = WriteRequest();
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const [ selectComment, setSelectComment ] = useState();

    const handleDeleteComment = async (comment) => {
        try {
            setSelectComment(comment._id);
            WriteDispatch({ type: "MYCOMMENTS_DELETE_REQUEST" });
            await deleteMyComment({
                userId: comment.user._id,
                writeId: comment.writeId._id,
                commentId: comment._id
            });
        } catch(err) {
            console.log(err);
        };
    };

   

    return (
        <ul className='comments_list_wrap'>
            {comments?.map(comment => (
                <li key={comment._id} className='comments_list_item'>
                    {WriteState.myCommentDeleteLoading && comment._id === selectComment ? (
                        <div className='margin_c'>
                            <Spinners />
                        </div>
                    ) : (
                        <Fragment>
                            { comment.writeId?.project._id.projectImages && <div className='project_image'>{IconData[comment.writeId?.project._id.projectImages]}</div> }
                            <div>
                                <div className='comments_list_content word_ellip_3'>{comment?.content}</div>
                                <Link to={`/write/detail/${comment.writeId?._id}`} className='comments_list_write'>
                                    <span className='tit'>{comment.writeId?.title}</span> 글에 남긴 댓글
                                </Link>
                                <Link to={`/project/detail/${comment.writeId?.project._id._id}`} className='comments_list_title'>
                                    <span className='tit'>{comment.writeId?.project._id.title}</span> 중에서...
                                </Link>
                                <div className='comments_date_wrap'>
                                    <p>{changeViewDate(comment.createdAt, 'day')}</p>
                                </div>
                            </div>
                            <Button className={'button_reset button_delete2'} onClick={() => handleDeleteComment(comment)}>
                                <span className='blind'>이 댓글 삭제</span>
                            </Button>
                        </Fragment>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default MyCommentItem;

