import { Fragment } from 'react';
import Search from '../common/form/Search';
import './SearchProject.css'

const SearchProject = () => {
    return (
        <Fragment>
            
            <Search 
                id={'search'}
                type={"text"}
                placeholder={"다른 습관을 검색해보세요."}
                isLabel={true}
                isButton={false} 
                // value={joinUserValue}
                buttonType={"button"}
                // isSearchResult={isUserSearchResult}
                // onChange={handleSearchCange}
                // handleInputReset={handleUserValueReset}
            >
                {/* {SearchState.loading ? (
                    <div>친구 검색중...</div>
                ) : (
                    <ul className='search_result_user'>
                        {SearchState.userSearch?.filter(user => user.id !== state.user.id).map(((user, idx) => <li key={idx} className='search_result_user_item'>{
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
                        }</li>))}
                    </ul>
                )} */}
                {/* 검색 결과가 없는 경우 */}
                {/* {!SearchState.loading && SearchState.userSearch.length === 0 && <NoData icon={<PiSmileyXEyesDuotone />} title={"검색한 친구는 회원이 아닙니다."} subText={" 다시 검색해보세요."}/>} */}
            </Search>
            {/* <div className='category_wrap gapt_10'>
                <Tags tags={joinUserList?.map(user => user.name)} isLink={false} handleDelete={handleJoinUserDelete} contentName={"친구"} isNoData={false}/>
            </div> */}
            {/* {ProjectState.errorMessage && (
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {ProjectState.errorMessage}
                </ErrorMsg>
            )} */}
        </Fragment>
    );
};

export default SearchProject;