import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import IconData from '../common/icon/IconData';
import Calender from '../../components/calender/Calender';
import { UserContext } from '../../context/UserContext';
import UserThumItem from '../common/userThum/UserThumItem';
import Button from '../common/form/Button';
import IconVisual from '../common/icon/IconVisual';
import { PiGearDuotone, PiSmileyXEyesDuotone, PiUsersDuotone, PiUserPlusDuotone } from "react-icons/pi";
import LikeProject from '../project/LikeProject';
import Tags from '../common/tag/Tags';
import NoData from '../common/notData/NoData';
import RequestProject from './RequestProject';
import Popup from '../common/popup/Popup';
import ProjectEdit from './ProjectEdit';
import UserSearch from '../search/UserSearch';
import { changeViewDate } from '../../utils/utils';
import ProjectPublic from './ProjectPublic';
import ViewDate from '../common/date/ViewDate';
import WriteUpload from '../write/WriteUpload';
import DeleteProject from './DeleteProject';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Spinners from '../common/spinners/Spinners';
import DaysPanel from '../dayspanel/DaysPanel';
import './LoadProject.css';


const LoadProject = ({ projectId }) => {
    const { loadProject, inviteProject, rejectProject, withdrawProject, addFriendProject, editProject } = ProjectRequest();
    const { state } = useContext(UserContext);
    const { ProjectState, ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    const [ userClasses, setUserClasses ] = useState('')

    const [friendData, setFriendData] = useState([])
    const editRef = useRef(null);
    const inviteRef = useRef(null);
    const projectAuthRef = useRef(null);
    const projectDeleteRef = useRef(null);
    
    const handleLoadProject = async () => {
        try {
            ProjectDispatch({ type: "A_PROJECT_LOAD_REQUEST" });
            await loadProject(projectId);
        } catch(err) {
            console.log(err);
        };
    };

    const handleInviteProject = async e => {
        e.preventDefault();
        try {
            let userId = e.target.parentNode.dataset.userid;
            ProjectDispatch({ type: "PROJECT_INVITE_REQUEST" });
            await inviteProject({ projectId, userId});
        } catch(err) {
            console.log(err);
        };
    };

    const handleRejectProject = async e => {
        e.preventDefault();
        try {
            let userId = e.target.parentNode.dataset.userid;
            ProjectDispatch({ type: "PROJECT_REJECT_REQUEST" });
            await rejectProject({ projectId, userId });
        } catch(err) {
            console.log(err);
        };
    };

    const handleWithdrawProject = async e => {
        e.preventDefault();
        try {
            if(window.confirm('정말 탈퇴하시겠습니까?')) {
                ProjectDispatch({ type: "PROJECT_WITHDRAW_REQUEST" });
                await withdrawProject({ projectId, userId: state.user._id });
            };
        } catch(err) {
            console.log(err);
        };
    };

    const handleEditState = () => editRef.current.popupOpen();
    const handleFriendInvite = () => inviteRef.current.popupOpen();
    const handleAuthWrite = () => projectAuthRef.current.popupOpen();
    const handleDeleteProject = () => projectDeleteRef.current.popupOpen();
 

    const handleAddFriend = async e => {
        try {
            e.preventDefault();
            let addState = null;
            if(friendData.length <= 0) return;
            ProjectDispatch({ type: "PROJECT_ADD_INVITE_REQUEST" });
            for(let i = 0; i < friendData.length; i++) {
                addState = await addFriendProject({ projectId, userId: friendData[i]._id });
            };
            if(addState.status === 200) {
                inviteRef.current.popupClose();
                alert('친구를 초대했습니다.');
                setFriendData([]);
            };
        } catch(err) {
            console.log(err);
        };
    };


    useEffect(() => {
        setUserClasses(() => {
            if(state.user?._id === project.constructorUser?._id._id) return 'const';
            if(project.instanceUser?.filter(user => user._id._id === state.user._id ).length > 0) return 'inst';
            return 'visitor';
        });
    }, [state, project]);

    useEffect(() => {
        handleLoadProject();
    }, []);


    return (
        // 로드프로젝은 로그인 한 사람만 볼 수 있음
        <Fragment>
            {ProjectState.aLoadProjectDone && (
                <Fragment>
                    <div className='align_c'>
                        <div className='gap_20 flex'>
                            <ProjectPublic txt={true} className={'gapr_10'}/>
                            <ViewDate dates={[
                                {txt: ' ', date: changeViewDate(project?.createdAt, 'second')},
                                // {txt: 'UpdateAt ', date: changeViewDate(project.updatedAt, 'second')},
                            ]} />
                        </div>
                        {userClasses === 'const' ? (
                            <div className='constructor_options'>
                                <span>
                                    <Button className={'button_type4 ico_hover_type2'} onClick={handleEditState}>
                                        <PiGearDuotone />
                                        <span className='blind'>이 습관 수정</span>
                                    </Button>
                                </span>
                                <span>
                                    <Button className={'button_type4 ico_hover_type1'} onClick={handleFriendInvite}>
                                        <PiUserPlusDuotone />
                                        <span className='blind'>친구초대</span>
                                    </Button>
                                </span>
                            </div>
                        ) : (null)}
                    </div>
                    {/* 모두 보임 */}
                    <div className='gapt_10 pos_rel'>
                        <LikeProject projectId={projectId} userId={state.user._id} projectLikeLen={project.likeCount} className={'detail'} />
                        <IconVisual icon={IconData[project?.projectImages]} />
                        {/* <Icon icon={IconData[project.userCount]} /> */}
                    </div>
                    <div className='align_c gapt_40'>
                        <p className='project_sub_title'>우리의 목표!</p>
                        <h3 className='project_title'>{project?.title}</h3>
                    </div>
                    <div className='align_c gapt_40'>
                        <p className='project_sub_title'>습관 상세 내용</p>
                        <div className='project_content'>{project?.content}</div>
                    </div>

                    {/* 습관에 가입한 유저 + 생성자만 보임 */}
                    {userClasses === 'const' || userClasses === 'inst' ?
                    (
                        <Fragment>
                            {/* 인증버튼 */}
                            <div className='align_c gapt_30'>
                                <Button className={'button_type2'} onClick={handleAuthWrite}>오늘 습관 인증</Button>
                            </div>

                            {/* 달력 */}
                            <div className='gapt_50'>
                                <Calender project={project} />
                            </div>

                            {/* 한눈에 보기 패널 판 */}
                            <div>
                                <h3 className='gapt_50'>{new Date().getFullYear()}년 내 진행상태</h3>
                                <DaysPanel userDays={
                                    userClasses === 'const' ? project.constructorUser?.days : 
                                    project.instanceUser?.filter(user => user._id._id === state.user._id)[0]?.days
                                } />
                            </div>

                            {/* 습관 참여유저 */}
                            <div className='part_user'>
                                <h3 className='gapt_50 gap_10'>습관에 참여한 친구들</h3>
                                {project.instanceUser && project.instanceUser.length > 0 ? (
                                    <UserThumItem users={project.instanceUser} isText={true} className={'vertical'} matched={'part_user'}/>
                                ) : (
                                    <NoData icon={<PiUsersDuotone />} title={"이 습관을 같이 하는 친구가 없습니다."} />
                                )}
                            </div>

                            {/* 습관 인증글 나중에 추가*/}
                            {/* <div>
                                <h3 className='gapt_50 gap_10'>모든 습관 인증글</h3>
                                {project.writes.length > 0 ? (
                                    <WriteListItem writes={project.writes.reverse()} />
                                ) : (
                                    <NoData icon={<PiPencilSimpleSlashDuotone />} title={"인증글이 하나도 없습니다."} />
                                )}
                            </div> */}
                        </Fragment>
                    ) : (
                        <div className='align_c gapt_30'>
                            {/* 가입 신청을 한 유저 */}
                            {project.joinUser?.filter(userId => userId._id._id === state.user._id).length > 0 ? (
                                <Fragment>
                                    <Button className={'button_type2'} disabled={true}>습관 가입신청</Button>
                                    <p className='align_c gapt_15 color_red'>이미 가입이 진행 중 입니다.</p>
                                </Fragment>
                            ) : (
                                <RequestProject className={'button_type2'} btnTxt={'습관 가입신청'} projectId={projectId} userId={state.user._id} />
                            )}

                            {/* 방장에게 초대가 온 유저인 경우 */}
                            <div className='gapt_30'>
                                {
                                    project.joinUser?.filter(joinUser => state.user._id === joinUser._id._id && joinUser.state).length > 0 && (
                                        <div>
                                            이 프로젝트 장에게서 초대요청이 왔습니다.
                                            <div className='user_button_wrap' data-userid={state.user._id}>
                                                <Button type={'button'} className={'button_type2 in'} onClick={handleInviteProject}>수락</Button>
                                                <Button type={'button'} className={'button_type_cancel out'} onClick={handleRejectProject}>거절</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            
                        </div>
                    )}


                    {/* 습관 생성자가 로그인했을때만 보임 */}
                    {state.user?._id === project.constructorUser?._id._id && 
                    (
                    <Fragment>
                        {/* 초대한 친구는 true 이고 버튼없애야함 */}
                        {/* 그리고 이건 유저쪽에도 초대가 온 프로젝트 표시해야함 */}
                        <div>
                            <h3 className='gapt_50 gap_10'>초대한 친구</h3>
                            {project.joinUser && 
                            project.joinUser?.length > 0 &&
                            project.joinUser?.filter(user => user.state === true).length > 0 ? (
                                <UserThumItem 
                                    users={project.joinUser?.filter(user => user.state === true)} 
                                    isText={true} 
                                    className={'vertical'} 
                                />
                            ) : (
                                <NoData icon={<PiSmileyXEyesDuotone />} title={"이 습관에 초대한 유저가 없습니다."} />
                            )}
                        </div>
                    </Fragment>
                    )}   

                    {/* 습관 생성자가 로그인했을때만 보임 */}
                    {state.user?._id === project.constructorUser?._id._id && (
                    <Fragment>
                        {/* 신청한 친구는 false 이고 있어야함 */}
                        <div>
                            <h3 className='gapt_50 gap_10'>신청한 친구</h3>
                            {project.joinUser && 
                            project.joinUser?.length > 0 && 
                            project.joinUser?.filter(user => user.state === false).length > 0 ? (
                                <UserThumItem 
                                    users={project.joinUser?.filter(user => user.state === false)} 
                                    isText={true} 
                                    className={'vertical'} 
                                    buttons={[ 
                                        <Button type={'button'} className={'button_type6 in'} onClick={handleInviteProject}>수락</Button>, 
                                        <Button type={'button'} className={'button_type6 out'} onClick={handleRejectProject}>거절</Button>
                                        ]}
                                    />
                            ) : (
                                <NoData icon={<PiSmileyXEyesDuotone />} title={"이 습관에 신청한 유저가 없습니다."} />
                            )}
                            {ProjectState.rejectProjectError && (
                                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                    {ProjectState.rejectProjectError}
                                </ErrorMsg>
                            )}

                            {ProjectState.inviteProjectError && (
                                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                    {ProjectState.inviteProjectError}
                                </ErrorMsg>
                            )}
                        </div>
                    </Fragment>
                    )}   

                    {/* 카테고리. 모두 보임 */}
                    <div className='gapt_30'>
                        <Tags tags={project.categorys} isLink={true} />
                    </div>
                    

                    {/* 습관에 가입한 유저만 */}
                    {project.instanceUser?.filter(user => user._id._id === state.user._id ).length > 0 && (
                        <div className='align_c gapt_30'>
                            {ProjectState.drowProjectLoading ? (<Spinners />) : (
                                <Button className={'button_type5'} onClick={handleWithdrawProject}>이 습관 탈퇴하기</Button>
                            )}
                            {ProjectState.drowProjectError && (
                                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                    {ProjectState.drowProjectError}
                                </ErrorMsg>
                            )}
                        </div>
                    )}

                    {state.user?._id === project.constructorUser?._id._id && 
                        <div className='align_c gapt_50'>
                            <Button className={'button_type5'} onClick={handleDeleteProject}>
                                이 습관 삭제하기
                            </Button>
                        </div>
                    }   

                    {/* 인증글 쓰기 */}
                    <Popup
                        className={`popup_type_default write_detail`} 
                        isHead={true} 
                        title={`인증 글쓰기`} 
                        closeClick={() => projectAuthRef.current.popupClose()} 
                        dimd={true} 
                        ref={projectAuthRef} 
                    >
                        <WriteUpload projectId={projectId} projectAuthRef={projectAuthRef}/>
                    </Popup>
                    
                    {/* 습관 수정하기 */}
                    <Popup 
                        className={`popup_type_default profile_edit`} 
                        isHead={true} 
                        title={`습관 수정`} 
                        closeClick={() => editRef.current.popupClose()} 
                        dimd={true} 
                        ref={editRef} 
                        // isButton={true} 
                        // buttons={[<Button className={"button_type2"} onClick={handleProjectEdit}>습관 수정</Button>]}
                    >
                        <ProjectEdit editRef={editRef}/>
                    </Popup>

                    {/* 친구 초대하기 */}
                    <Popup 
                        className={`popup_type_default user_search_pop`} 
                        isHead={true} 
                        title={`친구 초대하기`} 
                        closeClick={() => inviteRef.current.popupClose()} 
                        dimd={true}  
                        ref={inviteRef}
                    >
                        <UserSearch setFriendData={setFriendData} />
                        <div className='add_friend align_c gapt_10'>
                            {ProjectState.addInviteProjectLoading ? (<Spinners />) : (
                                <Button type={'button'} className={"button_type2"} onClick={handleAddFriend} disabled={friendData.length === 0 && true} >초대 보내기</Button>
                            )}
                        </div>
                        {ProjectState.addInviteProjectError && (
                            <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                {ProjectState.addInviteProjectError}
                            </ErrorMsg>
                        )}
                    </Popup>

                    {/* 삭제 팝업 */}
                    <Popup 
                        className={`popup_type_default delete_project_pop`} 
                        isHead={true} 
                        title={`습관 삭제하기`} 
                        closeClick={() => projectDeleteRef.current.popupClose()} 
                        dimd={true}  
                        ref={projectDeleteRef}
                    >
                        <DeleteProject projectDeleteRef={projectDeleteRef} />
                    </Popup>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoadProject;