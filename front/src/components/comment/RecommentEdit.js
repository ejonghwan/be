import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteContext } from '../../context/WriteContext';
import Spinners from '../common/spinners/Spinners';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import './RecommentEdit.css';


const RecommentEdit = ({ comment, recomment, setEditOpen }) => {
   
    const { state } = useContext(UserContext);
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const [ submitEditContent, setSubmitEditContent ] = useState(recomment.content);
    const { editRecomment } = WriteRequest();

    const handleChangeContent = e => {
        setSubmitEditContent(e.target.value);
    };

    const handleResetEditComment = () => {
        setSubmitEditContent('');
        setEditOpen(false);
    };

    const handleEditComment = async () => {
        try {
            WriteDispatch({ type: "RECOMMENT_EDIT_REQUEST" });
            await editRecomment({
                commentId: comment._id,
                recommentId: recomment._id,
                content: submitEditContent,
            });
            setSubmitEditContent('');
            setEditOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <div className='edit_recomment_wrap'>
            {WriteState.editRecommentLoading ? (<Spinners />) : (
                <div className='edit_recomment_inner'>
                    <div className='edit_recomment_form'>
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
                        <Button className={"button_type7"} onClick={handleEditComment} disabled={submitEditContent && submitEditContent !== recomment.content ? false : true} >수정</Button>
                    </div>
                </div>
            )}
             {state.editRecommentError && 
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {state.editRecommentError}
                </ErrorMsg>
            }
        </div>
    );
};


export default RecommentEdit;