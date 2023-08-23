import { useEffect, useState } from 'react';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CreateProjectDetail.css';
import { PiChatDotsDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import ErrorMsg from '../common/errorMsg/ErrorMsg';

const CreateProjectDetail = () => {

    // constructorUser 생성자는 stats.user로 넘기고
    // instanceUser 초대할 유저\
    // title
    // content
    // projectPublic 
    // categorys: [{ categoryName }]
    // joinUser: [{ _id }]
    // likeUser x

    const [projectImages, setProjectImages] = useState(0)
    const [categorys, setCategorys] = useState([{categoryName: 'ㅋㅋ'}, {categoryName: 'ghg'}]);
    const [joinUser, setJoinUser] = useState([]);
    const [val, setVal] = useState({
        title: '',
        content: '',
        // categorys: [],
        // joinUser: [],
        projectPublic: false,
    });

    const handleValuesChange = e => {
        const {name, value} = e.target;
        setVal({...val, [name]: value})
    }

    const handleIconClick = idx => {
        // console.log(idx)
        setProjectImages(idx)
    }


    const { title, content, projectPublic } = val;


    useEffect(() => {
        console.log(val)
    }, [val])
    
    useEffect(() => {
        console.log(IconData)
    }, [])

    const handleCreateProjectSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className='form_wrap'>
            

            <h3 className='form_title gap_20'>
                <PiChatDotsDuotone />
                <strong>새 습관 정보를 입력해주세요.</strong>
            </h3>
            <div className='gapt_30'>
                <IconVisual icon={IconData[projectImages]}/>
            </div>
            <div  className='gapt_30'>
                <IconList icons={IconData} onClick={handleIconClick} current={projectImages}/>
            </div>
            
            <form onSubmit={handleCreateProjectSubmit}>
                <div className='gapt_30 gap_20'>
                    <Label htmlFor="title" content="습관 이름을 정해주세요." className={"label_type1"}/>
                    <Input 
                        id="title" 
                        type="text" 
                        required={true} 
                        placeholder="하루에 영단어 2만개 외우기" 
                        className={"input_type1"} 
                        name="title" 
                        value={title} 
                        onChange={handleValuesChange} 
                    />
                </div>
                <div className='gap_20'>
                    <Label htmlFor="content" content="습관 내용" className={"label_type1"}/>
                    <Textarea 
                        id={"content"}
                        name="content"
                        className={"textarea_type1"} 
                        value={content}
                        onChange={handleValuesChange}
                        placeholder={"#룰 - 영단어 2만개를 외워서 게시판에 인증샷 남기기 "}
                    >
                        {content}
                    </Textarea>
                </div>

                <div className='gap_20'>
                    <Label htmlFor="content" content="초대할 습관러" className={"label_type1"}/>
                    <Input 
                        id="title" 
                        type="text" 
                        required={true} 
                        placeholder="아이디를 입력해주세요." 
                        className={"input_type1"} 
                        name="userName" 
                        // value={name} 
                        evt="onChange" 
                        // onChange={handleName} 
                        // disabled={authToggle && true}
                    />
                </div>
                <div className='gap_20'>
                    <Label htmlFor="content" content="카테고리를 등록할 수 있어요." className={"label_type1"}/>
                    {/* 이건 내일 카테고리 컴포넌트 만들자 */}
                    <ul className='category_wrap'>{categorys.map((item, idx) => <li key={idx}>{`# ${item.categoryName}`}</li>)}</ul>
                    <div className='flex'>
                        <Input 
                            id="title" 
                            type="text" 
                            required={true} 
                            placeholder="공부" 
                            className={"input_type1"} 
                            name="userName" 
                            // value={name} 
                            evt="onChange" 
                            // onChange={handleName} 
                            // disabled={authToggle && true}
                        />
                        <Button type={'button'} className={'button_type2'}>카테고리 추가</Button>
                        <ErrorMsg className={'error_type1 align_c gapt_30'}>
                            {/* {state.authNumberErrorMessage && <p> {state.authNumberErrorMessage}</p>} */}
                        </ErrorMsg>
                    </div>
                </div>

                <div className='gap_20'>
                    <Label htmlFor="content" content="습관 공개" className={"label_type1"}/>
                    <div className='Profile_info_cont gender_wrap'>
                        <div className='gender_item'>
                            <Label htmlFor="man" content="남자" className={"label_type1 gap_0"} />
                            <Input 
                                id="man" 
                                type="radio" 
                                required={true} 
                                className={"input_type1"} 
                                name="gender" 
                                value="남" 
                                onChange={handleValuesChange} 
                                checked={true}
                            />
                        </div>
                        <div className='gender_item'>
                            <Label htmlFor="woman" content="여자" className={"label_type1 gap_0"} />
                            <Input 
                                id="woman" 
                                type="radio" 
                                required={true} 
                                className={"input_type1"} 
                                name="gender" 
                                value="여"
                                onChange={handleValuesChange} 
                            />
                        </div>
                    </div>
                        
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