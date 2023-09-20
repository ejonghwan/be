import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteContext } from '../../context/WriteContext';
import './CommentEdit.css';

const CommentEdit = ({ comment, setEditOpen }) => {
   
    const { state } = useContext(UserContext);
    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
    const [ submitEditContent, setSubmitEditContent ] = useState(comment.content);
    const { editComment } = WriteRequest();

    const handleChangeContent = e => {
        setSubmitEditContent(e.target.value);
    };

    const handleResetEditComment = () => {
        setSubmitEditContent('');
        setEditOpen(false);
    };

    const handleEditComment = async () => {
        try {
            WriteDispatch({ type: "COMMENT_EDIT_REQUEST" });
            await editComment({
                commentId: comment._id,
                content: submitEditContent,
            })
            setSubmitEditContent('');
            setEditOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <div className='edit_comment_wrap'>
            <div className='edit_comment_inner'>
                <div className='edit_comment_form'>
                    <Textarea 
                        id={"content"}
                        name={"content"}
                        className={"textarea_type1 gap_5"} 
                        value={submitEditContent}
                        onChange={handleChangeContent}
                        required={true} 
                        placeholder={"수정 내용을 입력해주세요."}
                        style={{height: '100px'}}
                        
                    >
                        {/* {writeSubmitData.content} */}
                    </Textarea>
                    <Button className={"button_type7 line"} onClick={handleResetEditComment}>취소</Button>
                    <Button className={"button_type7"} onClick={handleEditComment} disabled={submitEditContent && submitEditContent !== comment.content ? false : true} >수정</Button>
                </div>
            </div>
        </div>
    );
};


export default CommentEdit;