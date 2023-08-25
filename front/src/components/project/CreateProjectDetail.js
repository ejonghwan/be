import { useCallback, useEffect, useState } from 'react';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CreateProjectDetail.css';
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiUserCirclePlusDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';

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
    const [categoryValue, setCategoryValue] = useState('')
    const [joinUserValue, setJoinUserValue] = useState('');
    const [isUserSearchResult, setIsUserSearchResult] = useState(false)
    const [val, setVal] = useState({
        title: '',
        content: '',
        categorys: [{categoryName: 'ㅋㅋ'}, {categoryName: 'ghg'}],
        joinUser: [],
        projectPublic: false,
    });


    const handleValuesChange = e => {
        const {name, value} = e.target;
        setVal({...val, [name]: value})
    }


    const handleCategoryClick = useCallback(() => {
        let categoryResult = categoryValue.replace(/ /g,"").split('#').filter(item => {
            return item !== null && item !== undefined && item !== '';
           });
        let inCategoryName = [];
        for(let i = 0; i < categoryResult.length; i++) {
            inCategoryName.push({ categoryName: categoryResult[i] })
        }
        setVal(prev => {
            return {...prev, categorys: [...categorys, ...inCategoryName]}
        })
        setCategoryValue('')
    }, [categoryValue])

    const handleJoinUserSearchClick = e => {
        setIsUserSearchResult(true)
    }
    

    const handleIconClick = idx => setProjectImages(idx);
    const { title, content, projectPublic, categorys } = val;


    useEffect(() => {
        console.log(val)
    }, [val])
    
    const handleCreateProjectSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className='form_wrap'>
            

            <h3 className='form_title gap_30'>
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
                <div className='gapt_30 gap_30'>
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
                <div className='gap_30'>
                    <Label htmlFor="content" content="습관 내용" className={"label_type1"}/>
                    <Textarea 
                        id={"content"}
                        name="content"
                        className={"textarea_type1"} 
                        value={content}
                        onChange={handleValuesChange}
                        placeholder={"#룰1 - 영단어 2만개를 외워서 게시판에 인증샷 남기기\n#룰2 - 못하면 못잠"}
                    >
                        {content}
                    </Textarea>
                </div>

                <div className='gap_30'>
                    <Search 
                        id={''}
                        placeholder={"검색할 친구의 이름을 입력해주세요."}
                        isLabel={true}
                        labelCont={"이 습관에 초대할 친구 이름 검색"}
                        isButton={true} 
                        value={joinUserValue}
                        // buttonCont={`검색`}   
                        buttonIcon={<PiUserCirclePlusDuotone />}
                        buttonType={"button"}
                        isSearchResult={isUserSearchResult}
                        buttonClick={handleJoinUserSearchClick}
                        onChange={e => setJoinUserValue(e.target.value)}
                    />
                </div>
                <div className='gap_30'>
                    <Search 
                        id={'category'}
                        placeholder={"#공부 #영단어 #운동"}
                        isLabel={true}
                        labelCont={"카테고리를 등록할 수 있어요."}
                        isButton={true} 
                        // buttonCont={`추가`}   
                        buttonIcon={<PiPlusCircleDuotone />}
                        buttonType={"button"}
                        value={categoryValue}
                        buttonClick={handleCategoryClick}
                        onChange={e => setCategoryValue(e.target.value)}
                    />

                    {/* 이건 내일 카테고리 컴포넌트 만들자 */}
                    <ul className='category_wrap gapt_10'>
                        <Tags tags={val.categorys.map(tag => tag)} isLink={false}/>
                    </ul>
                </div>

                <div className='gap_30'>
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