import { useEffect, useContext, Fragment } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import IconData from '../common/icon/IconData';
import Icon from '../common/icon/Icon';
import WriteListItem from '../write/WriteListItem';
import Calender from '../../components/calender/Calender';
import { UserContext } from '../../context/UserContext';
import UserThumItem from '../common/userThum/UserThumItem';
import Button from '../common/form/Button';
import IconVisual from '../common/icon/IconVisual';
import './LoadProject.css';



const LoadProject = ({ projectId }) => {

    const { loadProject } = ProjectRequest();
    const { state } = useContext(UserContext);
    const { ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    

    const handleLoadProject = async e => {
        ProjectDispatch({ type: "PROJECT_REQUEST" });
        const data = await loadProject(projectId);
        console.log(data)
    }

    useEffect(() => {
        handleLoadProject();
    }, [])

    return (
        <Fragment>
            {/* 모두 보임 */}
            <div>
                <IconVisual icon={IconData[project.userCount]} />
                {/* <Icon icon={IconData[project.userCount]} /> */}
            </div>
            <div className='align_c gapt_30'>
                <p className='project_sub_title'>우리의 목표!</p>
                <h3 className='project_title'>{project.title}</h3>
            </div>
            <div className='align_c gapt_30'>
                <p className='project_sub_title'>관련 내용</p>
                <div className='project_content'>{project.content}</div>
            </div>

            {/* 습관에 가입한 유저만 보임 */}
            {state.user?._id === project.constructorUser?._id._id || 
            project.instanceUser?.filter(user => user._id._id === state.user._id ).length > 0 ? 
            (
                <Fragment>
                    <div className='gapt_50'>
                        <Calender project={project} />
                    </div>
                    <div className='part_user'>
                        <h3 className='gapt_50 gap_10'>습관에 참여한 친구들</h3>
                        <UserThumItem users={project.instanceUser} isText={true} className={'vertical'} matched={'part_user'}/>
                    </div>
                    <div>
                        <h3 className='gapt_50 gap_10'>습관 인증글</h3>
                        <WriteListItem writes={project.writes.reverse()} />
                    </div>
                </Fragment>
            ) : (
                <div className='align_c'>
                    <Button className={'button_type2'}>습관 가입신청</Button>
                </div>
            )}


            {/* 습관 생성자가 로그인했을때만 보임 */}
            {state.user?._id === project.constructorUser?._id._id && 
            (
                <Fragment>
                    <div>
                        초대 한 유저 & 신청한 유저
                        <UserThumItem users={project.joinUser} isText={true} isButton={true} buttonName={'초대'} className={'vertical'}/>
                    </div>
                </Fragment>
            )}   
        </Fragment>
    );
};

export default LoadProject;