import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteContext } from '../../context/WriteContext';
import './RecommentCreate.css'

const RecommentCreate = ({ comment, setRecommentOpen }) => {

    const { state } = useContext(UserContext);
    const [ submitContent, setSubmitContent ] = useState('');
    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
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
            });
            setSubmitContent('');
            setRecommentOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <div className='recomment_wrap'>
            <div className='recomment_inner'>
                <div className='recomment_form'>
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
                        {/* {writeSubmitData.content} */}
                    </Textarea>
                    <Button className={"button_type7 line"} onClick={handleResetComment}>취소</Button>
                    <Button className={"button_type7"} onClick={handleCreateRecomment} disabled={submitContent ? false : true} >답글</Button>
                </div>
            </div>
        </div>
    );
};

export default RecommentCreate;