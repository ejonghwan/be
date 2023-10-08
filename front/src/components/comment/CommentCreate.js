import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteReducer } from '../../reducers';
import './CommentCreate.css'
import { WriteContext } from '../../context/WriteContext';
import Spinners from '../common/spinners/Spinners';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import NotProfileImg from '../user/NotProfileImg';

const CommentCreate = ({ comments }) => {

    const { state } = useContext(UserContext);
    const [ submitContent, setSubmitContent ] = useState('');
    const { WriteState, WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
    const { createComment } = WriteRequest();

    const handleChangeContent = e => {
        setSubmitContent(e.target.value);
    }

    const handleResetComment = () => {
        setSubmitContent('')
    }

    const handleCreateComment = async () => {
        try {
            WriteDispatch({ type: "COMMENT_CREATE_REQUEST" });
            await createComment({
                user: { _id: state.user._id, name: state.user.name },
                writeId: writes._id,
                content: submitContent,
            })
            setSubmitContent('')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='create_comment_wrap'>
            <div className='sub_info gap_10'>
                <span>댓글 {comments.length}개</span>
                <span>최근 순</span>
            </div>
            <div className='create_comment_inner'>
                <div className='create_comment_img'>
                    {state.user.profileImage?.key ? (
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage?.key}`} alt="유저 프로필 이미지" />
                    ) : (
                        <NotProfileImg userBgColor={state.user.profileImage?.bg} firstString={state.user.profileImage?.firstString} />
                    )}
                </div>
                {WriteState.createCommentLoading ? (
                    <div className='create_comment_form'><Spinners /></div>
                ) : (
                    <div className='create_comment_form'>
                        <Textarea 
                            id={"content"}
                            name={"content"}
                            className={"textarea_type1 gap_5"} 
                            value={submitContent}
                            onChange={handleChangeContent}
                            required={true} 
                            placeholder={"댓글"}
                            style={{height: '100px'}}
                        >
                            {/* {writeSubmitData.content} */}
                        </Textarea>
                        <Button className={"button_type7 line"} onClick={handleResetComment}>취소</Button>
                        <Button className={"button_type7"} onClick={handleCreateComment} disabled={submitContent ? false : true} >댓글</Button>
                    </div>
                )}
                {state.createCommentError && 
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        {state.createCommentError}
                    </ErrorMsg>
                }
                
            </div>

        </div>
    );
};

export default CommentCreate;