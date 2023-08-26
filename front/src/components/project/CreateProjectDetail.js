import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CreateProjectDetail.css';
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiUserCirclePlusDuotone, PiXCircleDuotone, PiSmileyXEyesDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import SearchRequest from '../../reducers/SearchRequest';
import { SearchContext } from '../../context/SearchContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';

const CreateProjectDetail = () => {

    const { userSearch } = SearchRequest();
    const { SearchState, SearchDispatch } = useContext(SearchContext)

    // constructorUser 생성자는 stats.user로 넘기고
    // instanceUser 초대할 유저\
    // title
    // content
    // projectPublic 
    // categorys: [{ categoryName }]
    // joinUser: [{ _id }]
    // likeUser x

    const [projectImages, setProjectImages] = useState(0);
    const [categoryValue, setCategoryValue] = useState('');
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

    const handleCategoryReset = () => setCategoryValue('');
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

   

    const handleSearchCange = e => {
        setJoinUserValue(e.target.value)
        handleJoinUserSearch(e.target.value) 
        //그리고 useCallback 안에서는 state를 구독하지 않기 때문에 변화 값을 인자로 넘겨줘야함 
    }


    // 유저 검색
    const handleJoinUserSearch = useCallback(_debounce(async (userName) => {
        // useCallback을 사용하면서 joinUserValue를 구독하지 않아, 서치인풋이 리렌더링이 되어도 이 함수의 주소값의 변화가 없음. 중요. debounce 사용하면서 디바운스 계속 호출되던 이슈. 
        console.log('de')
        try {
            if(userName === '') return setIsUserSearchResult(false);
            console.log(userName)
            SearchDispatch({ type: "SEARCH_REQUEST" })
            await userSearch(userName);
          } catch(err) {
            console.err(err)
          }
        setIsUserSearchResult(true)
    }, 500), [])


     // 유저검색창 엑스버튼
     const handleUserValueReset = () => {
        setJoinUserValue('');
        setIsUserSearchResult(false);
     };
    

    // 습관 생성
    const handleCreateProjectSubmit = e => {
        e.preventDefault();
    }

    const handleIconClick = idx => setProjectImages(idx);
    const { title, content, projectPublic, categorys } = val;


    useEffect(() => {
        // console.log(val)
    }, [val])

    
    

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
                        id={'search'}
                        placeholder={"검색할 친구의 이름을 입력해주세요."}
                        isLabel={true}
                        labelCont={"이 습관에 초대할 친구 이름 검색"}
                        isButton={true} 
                        value={joinUserValue}
                        buttonType={"button"}
                        isSearchResult={isUserSearchResult}
                        onChange={handleSearchCange}
                        handleInputReset={handleUserValueReset}
                    >
                        
                        {SearchState.loading ? (
                            <div>친구 검색중...</div>
                        ) : (
                            <ul className='search_result_user'>
                                {SearchState.userSearch?.map(((user, idx) => <li key={idx} className='search_result_user_item'>{
                                    <button type='button' className='button_reset' title={`${user.id}님 친구추가`}>
                                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user.profileImage.key}`} alt="" className='user_img'/>
                                        <strong className='user_name'>{user.name}</strong>
                                        <span className='user_id'>{user.id}</span>
                                        <PiPlusCircleDuotone />
                                    </button>
                                }</li>))}
                            </ul>
                        )}
                        {!SearchState.loading && SearchState.userSearch.length === 0 && <NoData icon={<PiSmileyXEyesDuotone />} title={"검색한 친구는 회원이 아닙니다."} subText={" 다시 검색해보세요."}/>}
                       
                    </Search>
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
                        handleInputReset={handleCategoryReset}
                    />
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