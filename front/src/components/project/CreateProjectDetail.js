import './CreateProjectDetail.css';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

const CreateProjectDetail = () => {
    return (
        <div className='form_wrap'>
            <h3 className='form_title gap_20'>
                <HiOutlineChatBubbleLeftEllipsis />
                <strong>정보입력</strong>
            </h3>
            <Label htmlFor="title" content="습관 이름을 정해주세요." className={"label_type1"}/>
            <Input 
                id="title" 
                type="text" 
                required={true} 
                placeholder="하루에 영단어 2만개 외우기" 
                className={"input_type1"} 
                name="userName" 
                // value={name} 
                evt="onChange" 
                // onChange={handleName} 
                // disabled={authToggle && true}
            />
        </div>
    );
};

export default CreateProjectDetail;