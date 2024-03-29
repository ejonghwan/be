import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CreateProjectDetail.css';
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiSmileyXEyesDuotone } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import SearchRequest from '../../reducers/SearchRequest';
import ProjectRequest from '../../reducers/ProjectRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import { ProjectContext } from '../../context/ProjectContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';
import Spinners from '../common/spinners/Spinners';
import NotProfileImg from '../user/NotProfileImg';


const CreateProjectDetail = () => {

    const { userSearch } = SearchRequest();
    const { createProject } = ProjectRequest();
    const { state, dispatch } = useContext(UserContext);
    const { SearchState, SearchDispatch } = useContext(SearchContext);
    const { ProjectState, ProjectDispatch } = useContext(ProjectContext);
    const navigate = useNavigate()

    const [projectImages, setProjectImages] = useState(0);
    const [categoryValue, setCategoryValue] = useState(''); 
    const [joinUserValue, setJoinUserValue] = useState(''); // 인풋값
    const [joinUserList, setJoinUserList] = useState([]); //뿌리기 위해 여기서만 사용
    const [isUserSearchResult, setIsUserSearchResult] = useState(false);
    const [titleVerifi, setTitleverifi ] = useState(false);
    const [submitData, setSubmitData] = useState({ 
        constructorUser: { _id: state.user._id },
        title: '',
        content: '',
        categorys: [], //{categoryName: ''}
        joinUser: [],
        projectPublic: true,
        projectImages: projectImages,
    });


    const handleValuesChange = e => {
        const {name, value} = e.target;
        setSubmitData({...submitData, [name]: value});
    };

    // 카테고리 관련 이벤트
    const handleCategoryReset = () => setCategoryValue('');
    const handleCategoryClick = useCallback(() => {
        let categoryResult = categoryValue.replace(/ /g,"").split('#').filter(item => {
            return item !== null && item !== undefined && item !== '';
           });
        let equalsFillter = categoryResult.filter((el, idx) => categoryResult.indexOf(el) === idx); //같은거 삭제
        let inCategoryName = [];
        for(let i = 0; i < equalsFillter.length; i++) {
            inCategoryName.push({ categoryName: equalsFillter[i] });
        };
        
        // 기존에 있는 카테고리네임 중복제거
        let defaultNameFilter = [...submitData.categorys, ...inCategoryName].reduce((acc, cur) => {
            if( acc.findIndex(({ categoryName }) => categoryName === cur.categoryName) === -1 ) {
                acc.push(cur);
                return acc;
            }
            return acc;
        }, []);

        setSubmitData(prev => ({...prev, categorys: [...defaultNameFilter]}));
        setCategoryValue('');
    }, [categoryValue]);

    const handleTagDelete = (e, tagName) => {
        setSubmitData(prev => ({ ...prev, categorys: prev.categorys.filter(tag => tag.categoryName !== tagName )}));
    };

   

    // 검색 관련 이벤트
    const handleSearchCange = e => {
        setJoinUserValue(e.target.value);
        handleJoinUserSearch(e.target.value) ;
        //그리고 useCallback 안에서는 state를 구독하지 않기 때문에 변화 값을 인자로 넘겨줘야함 
    };

    // 유저 검색
    const handleJoinUserSearch = useCallback(_debounce(async (userName) => {
        // useCallback을 사용하면서 joinUserValue를 구독하지 않아, 서치인풋이 리렌더링이 되어도 이 함수의 주소값의 변화가 없음. 중요. debounce 사용하면서 디바운스 계속 호출되던 이슈. 
        try {
            if(userName === '') return setIsUserSearchResult(false);
            SearchDispatch({ type: "SEARCH_REQUEST" });
            await userSearch(userName);
          } catch(err) {
            console.err(err);
          };
        setIsUserSearchResult(true);
    }, 500), []);

     // 유저검색창 엑스버튼
     const handleUserValueReset = () => {
        setJoinUserValue('');
        setIsUserSearchResult(false);
     };
    
     const handleAddFriend = ({ name, _id }) => () => {
        for(let i = 0; i < joinUserList.length; i++) {
            if(submitData.joinUser[i]._id.match(_id)) return alert('이미 추가한 친구입니다.');
        };
        setSubmitData(prev => ({ ...prev, joinUser: prev.joinUser.concat({ _id: _id, state: true }) }));
        setJoinUserList(prev => [...prev, { name: name, _id: _id }]);
        setJoinUserValue('');
        setIsUserSearchResult(false);
     };

    const handleJoinUserDelete = (e, tagName) => {
        let getId = joinUserList.filter(user => user.name === tagName)[0]._id;
        setJoinUserList(prev => prev.filter(user => user.name !== tagName));
        setSubmitData(prev => ({ ...prev, joinUser: prev.joinUser.filter(user => user._id !== getId) }));
    };


    // 습관 생성
    const handleCreateProjectSubmit = async e => { 
        try {
            e.preventDefault();
            ProjectDispatch({ type: "PROJECT_CREATE_REQUEST" });
            const data = await createProject(submitData);
            if(data) {
                dispatch({ type: "CREATE_PROJECT_USER_PUSH", data: data });
                alert(`${title} 습관이 생성 되었습니다!`);
                navigate(`/project/detail/${data._id}`);
            };
        } catch(err) {
            console.log(err);
        };
    };

    const handleIconClick = idx => {
        setProjectImages(idx);
        setSubmitData(prev => ({ ...prev, projectImages: idx }));
    };
    const { title, content } = submitData;

    useEffect(() => {
        title.length < 3 || title.length > 20 ? setTitleverifi(false) : setTitleverifi(true);
    }, [title]);

    
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
                    <p className='g_sub_txt'>※ 습관 이름은 생성 후 수정이 불가능합니다.</p>
                    {!titleVerifi && <p className='g_sub_txt'>※ 5~20자까지만 가능합니다.</p>}
                </div>
                <div className='gap_30'>
                    <Label htmlFor="content" content="습관 내용" className={"label_type1"}/>
                    <Textarea 
                        id={"content"}
                        name="content"
                        className={"textarea_type1"} 
                        value={content}
                        onChange={handleValuesChange}
                        required={true} 
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
                        isButton={false} 
                        type={"text"}
                        value={joinUserValue}
                        buttonType={"button"}
                        isSearchResult={isUserSearchResult}
                        onChange={handleSearchCange}
                        handleInputReset={handleUserValueReset}
                    >
                        
                        {SearchState.searchUserLoading ? (
                            <div className='search_result_user'>
                                <Spinners full={true} />
                            </div>
                        ) : (
                            <ul className='search_result_user'>
                                {SearchState.userSearch?.filter(user => user.id !== state.user.id).map(((user, idx) => 
                                    <li key={idx} className='search_result_user_item'>
                                        {<button type='button' 
                                            className='button_reset hover_type1' 
                                            title={`${user.id}님 초대`} 
                                            onClick={handleAddFriend({ name: user.name, _id: user._id })}
                                        >

                                            {user.profileImage.key ? (
                                                <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user.profileImage.key}`} alt="유저 프로필 이미지" className='user_img' />
                                            ) : (
                                                <NotProfileImg firstString={user.profileImage?.firstString} userBgColor={user.profileImage?.bg} />
                                            )}
                                            <strong className='user_name'>{user.name}</strong>
                                            <span className='user_id'>{user.id}</span>
                                            {/* <span className='button_reset button_plus'>
                                                <span className='blind'>{`친구추가된 목록에서 ${user.name} 없애기`}</span>
                                            </span> */}
                                        </button>}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* 검색 결과가 없는 경우 */}
                        {(!SearchState.loading && SearchState.userSearch.length === 0 || 
                        SearchState.userSearch?.filter(user => user.id === state.user.id).length > 0) && (
                            <NoData 
                                icon={<PiSmileyXEyesDuotone />} 
                                title={"검색한 친구는 회원이 아닙니다."} 
                                subText={" 다시 검색해보세요."}
                            />
                        )}

                        {SearchState.searchUserError && (
                            <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                {SearchState.searchUserError}
                            </ErrorMsg>
                        )}
                    </Search>
                  


                    <div className='category_wrap gapt_10'>
                        <Tags tags={joinUserList?.map(user => user.name)} isLink={false} handleDelete={handleJoinUserDelete} contentName={"친구"} isNoData={false}/>
                    </div>
                </div>


                <div className='gap_30'>
                    <Search 
                        id={'category'}
                        placeholder={"#공부 #영단어 #운동"}
                        isLabel={true}
                        labelCont={"카테고리를 등록할 수 있어요."}
                        isButton={true} 
                        type={"text"}
                        // buttonCont={`추가`}   
                        buttonIcon={<PiPlusCircleDuotone />}
                        buttonType={"button"}
                        value={categoryValue}
                        buttonClick={handleCategoryClick}
                        onChange={e => setCategoryValue(e.target.value)}
                        handleInputReset={handleCategoryReset}
                    />
                    <p className='g_sub_txt'>※ '#' 으로 구분지어 입력해주세요.</p>
                    <div className='category_wrap gapt_10'>
                        <Tags tags={submitData.categorys.map(tag => tag.categoryName)} isLink={false} handleDelete={handleTagDelete}/>
                    </div>
                </div>

                <div className='gap_30'>
                    <Label htmlFor="content" content="습관 공개" className={"label_type1"}/>
                    <div className='Profile_info_cont gender_wrap'>
                        <Input 
                            id="public" 
                            type="radio" 
                            required={true} 
                            className={"input_type1"} 
                            name="projectPublic" 
                            value={true}
                            onChange={handleValuesChange} 
                            defaultChecked={true}
                        />
                         <Label htmlFor="public" content="공개" className={"label_type1 gap_0"} />
                        <Input 
                            id="private" 
                            type="radio" 
                            required={true} 
                            className={"input_type1"} 
                            name="projectPublic" 
                            value={false}
                            onChange={handleValuesChange} 
                        />
                         <Label htmlFor="private" content="비공개" className={"label_type1 gap_0"} />
                    </div>
                </div>
                {ProjectState.createProjectLoading ? (<Spinners />) : (
                    <Fragment>
                        <div className='align_c gapt_30'>
                            <Button className={'button_type2'}>습관 생성</Button>
                            {ProjectState.createProjectError && (
                                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                    {ProjectState.createProjectError }
                                </ErrorMsg>
                            )}
                        </div>
                    </Fragment>
                )}
            </form>
        </div>
    );
};

export default CreateProjectDetail;