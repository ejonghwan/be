import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteContext } from '../../context/WriteContext';
import Spinners from '../common/spinners/Spinners';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import './RecommentCreate.css'


const RecommentCreate = ({ comment, setRecommentOpen, targetUser = null }) => {

    const { state } = useContext(UserContext);
    const [ submitContent, setSubmitContent ] = useState('');
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { createRecomment } = WriteRequest();

    const handleChangeContent = e => {
        setSubmitContent(e.target.value);
    };

    const handleResetComment = () => {
        setSubmitContent('');
        setRecommentOpen(false);
    };

    const handleCreateRecomment = async () => {
        try {
            WriteDispatch({ type: "RECOMMENT_CREATE_REQUEST" });
            await createRecomment({
                user: { _id: state.user._id, name: state.user.name },
                commentId: comment._id,
                content: submitContent,
                targetUser: targetUser ? targetUser._id : null
            });
            setSubmitContent('');
            setRecommentOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <div className='recomment_wrap'>
             {WriteState.createRecommentLoading ? (<Spinners />) : (
                <div className='recomment_inner'>
                    <div className='recomment_form'>
                        <span className='to_user'>{targetUser && `@${targetUser.name} 한테 메시지..`}</span>
                        <Textarea 
                            id={"content"}
                            name={"content"}
                            className={"textarea_type1 gap_5"} 
                            value={submitContent}
                            onChange={handleChangeContent}
                            required={true} 
                            placeholder={"댓글"}
                            style={{height: '70px'}}
                            
                        >
                        </Textarea>
                        <Button className={"button_type7 line"} onClick={handleResetComment}>취소</Button>
                        <Button className={"button_type7"} onClick={handleCreateRecomment} disabled={submitContent ? false : true} >답글</Button>
                    </div>
                </div>
             )}

            {state.createRecommentError && 
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {state.createRecommentError}
                </ErrorMsg>
            }       
        </div>
    );
};

export default RecommentCreate;