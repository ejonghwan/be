import './CreateProjectDetail.css';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import Button from '../common/form/Button';

const CreateProjectDetail = () => {


    const handleCreateProjectSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className='form_wrap'>
            <h3 className='form_title gap_20'>
                <HiOutlineChatBubbleLeftEllipsis />
                <strong>새 습관 정보를 입력해주세요.</strong>
            </h3>
            <form onSubmit={handleCreateProjectSubmit}>
                <div className='gap_20'>
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
                <div className='gap_20'>
                    <Label htmlFor="content" content="습관 내용" className={"label_type1"}/>
                    <Textarea 
                        id={"content"}
                        className={"textarea_type1"} 
                        value={""}
                        placeholder={"#룰 - 영단어 2만개를 외워서 인증샷 혹은 게시물"}
                    >
                        asdasd
                    </Textarea>
                </div>

                <div className='gap_20'>
                    <Label htmlFor="content" content="초대할 습관러" className={"label_type1"}/>
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
                <div className='gap_20'>
                    <Label htmlFor="content" content="# 태그" className={"label_type1"}/>
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

                <div className='gap_20'>
                    <Label htmlFor="content" content="습관 공개" className={"label_type1"}/>
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

                <div className='align_c gapt_30'>
                    <Button className={'button_type2'} disabled={true}>습관 생성</Button>
                    {/* <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        {state.authNumberErrorMessage && <p> {state.authNumberErrorMessage}</p>}
                    </ErrorMsg>
                    <SuccessMsg className={"success_type"}>
                        아이디는 <i className='check_txt'>{resMsg.id}</i> 입니다.
                    </SuccessMsg> */}
                </div>
            </form>
        </div>
    );
};

export default CreateProjectDetail;