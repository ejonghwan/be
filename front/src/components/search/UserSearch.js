import { Fragment, useCallback, useContext, useState } from 'react';
import { PiSmileyXEyesDuotone  } from "react-icons/pi";
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import { ProjectContext } from '../../context/ProjectContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';
import './UserSearch.css';
import Spinners from '../common/spinners/Spinners';


const UserSearch = ({ setFriendData = [] }) => {

    const { userSearch } = SearchRequest();
    const { state } = useContext(UserContext);
    const { SearchState, SearchDispatch } = useContext(SearchContext);
    const { ProjectState: { project }, ProjectState } = useContext(ProjectContext);

    const [joinUserValue, setJoinUserValue] = useState(''); // 인풋값
    const [joinUserList, setJoinUserList] = useState([]); //뿌리기 위해 여기서만 사용
    const [isUserSearchResult, setIsUserSearchResult] = useState(false)
    const [submitData, setSubmitData] = useState({ 
        joinUser: [],
    });



    // 검색 관련 이벤트
    const handleSearchCange = e => {
        setJoinUserValue(e.target.value)
        handleJoinUserSearch(e.target.value) 
        //그리고 useCallback 안에서는 state를 구독하지 않기 때문에 변화 값을 인자로 넘겨줘야함 
    }

    // 유저 검색
    const handleJoinUserSearch = useCallback(_debounce(async (userName) => {
        // useCallback을 사용하면서 joinUserValue를 구독하지 않아, 서치인풋이 리렌더링이 되어도 이 함수의 주소값의 변화가 없음. 중요. debounce 사용하면서 디바운스 계속 호출되던 이슈. 
        try {
            if(userName === '') return setIsUserSearchResult(false);
            SearchDispatch({ type: "USER_SEARCH_REQUEST" })
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
    
     const handleAddFriend = ({ name, _id }) => () => {
        for(let i = 0; i < joinUserList.length; i++) {
            if(submitData.joinUser[i]._id.match(_id)) return alert('이미 추가한 친구입니다.');
        }
        setSubmitData(prev => ({ ...prev, joinUser: prev.joinUser.concat({ _id: _id, state: true }) }));
        setJoinUserList(prev => [...prev, { name: name, _id: _id }]);
        setJoinUserValue('');
        setIsUserSearchResult(false);
        
        setFriendData && setFriendData(prev => [...prev.concat( { _id: _id, state: true } )]) // 부모에거 setSTate가 넘어왔을 때 
     }

    const handleJoinUserDelete = (e, tagName) => {
        let getId = joinUserList.filter(user => user.name === tagName)[0]._id;
        setJoinUserList(prev => prev.filter(user => user.name !== tagName));
        setSubmitData(prev => ({ ...prev, joinUser: prev.joinUser.filter(user => user._id !== getId) }))
    }


    return (
        <Fragment>
            <Search 
                id={'search'}
                type={"text"}
                placeholder={"검색할 친구의 이름을 입력해주세요."}
                isLabel={true}
                labelCont={"이 습관에 초대할 친구 이름 검색"}
                isButton={false} 
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
                            {
                                <button type='button' 
                                    className='button_reset' 
                                    title={`${user.id}님 초대`} 
                                    onClick={handleAddFriend({ name: user.name, _id: user._id })}
                                >
                                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user.profileImage.key}`} alt="유저 프로필 이미지" className='user_img'/>
                                    <strong className='user_name'>{user.name}</strong>
                                    <span className='user_id'>{user.id}</span>
                                    <span className='button_reset button_plus'>
                                        <span className='blind'>{`친구추가된 목록에서 ${user.name} 없애기`}</span>
                                    </span>
                                </button>
                            }
                        </li>))}
                    </ul>
                )}
                {/* 검색 결과가 없는 경우 */}
                {!SearchState.searchUserLoading && SearchState.userSearch.length === 0 && <NoData icon={<PiSmileyXEyesDuotone />} title={"검색한 친구는 회원이 아닙니다."} subText={" 다시 검색해보세요."}/>}
            </Search>
            <div className='category_wrap gapt_10'>
                <Tags tags={joinUserList?.map(user => user.name)} isLink={false} handleDelete={handleJoinUserDelete} contentName={"친구"} isNoData={false}/>
            </div>
            {SearchState.searchUserError && (
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {SearchState.searchUserError}
                </ErrorMsg>
            )}
        </Fragment>
    );
};

export default UserSearch;