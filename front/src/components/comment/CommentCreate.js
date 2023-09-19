import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CommentCreate.css'

const CommentCreate = ({ comments }) => {

    const { state } = useContext(UserContext)

    return (
        <div className='create_comment_wrap'>
            <div className='gap_10'>댓글 {comments.length}개</div>
            <div className='create_comment_inner'>
                <div className='create_comment_img'>
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='create_comment_form'>
                    <Textarea 
                        id={"content"}
                        name={"content"}
                        className={"textarea_type1"} 
                        // value={writeSubmitData.content}
                        // onChange={handleValuesChange}
                        required={true} 
                        placeholder={"댓글"}
                    >
                        {/* {writeSubmitData.content} */}
                    </Textarea>
                    <Button className={"button_type2"}>취소</Button>
                    <Button className={"button_type2"}>댓글</Button>
                    
                </div>
            </div>
        </div>
    );
};

export default CommentCreate;