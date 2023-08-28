import { useEffect, useContext, Fragment } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import IconData from '../common/icon/IconData';
import Icon from '../common/icon/Icon';
import WriteListItem from '../write/WriteListItem';
import Calender from '../../components/calender/Calender';
import { UserContext } from '../../context/UserContext';
import UserThumItem from '../common/userThum/UserThumItem';



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
        <div>

            {/* 모두 보임 */}
            <div>
                <Icon icon={IconData[project.userCount]}/>
                <h3>{project.title}</h3>
            </div>

            <div>
                내용{project.content}
            </div>

            {/* 습관에 가입한 유저만 보임 */}
            {state.user?._id === project.constructorUser?._id._id || 
            project.instanceUser?.filter(user => user._id._id === state.user._id ).length > 0 ? 
            (
                <Fragment>
                    
                    <div>
                        참여유저
                        <UserThumItem users={project.instanceUser} />
                    </div>
                     <div>
                        달력
                        <Calender project={project} />
                    </div>
                    <div>
                        모든 인증글 보기 
                        <WriteListItem project={project} />
                    </div>



                   
                </Fragment>
            ) : (
                <div>이 습관 가입 신청하기</div>
            )}


            {/* 아래 두개는 프로젝트에 있는 아이디랑 로그인한 유저랑 같을떄만 노출 */}
            {state.user?._id === project.constructorUser?._id._id && 
            (
                <Fragment>
                    <div>
                        초대 한 유저 
                    </div>

                    <div>
                        신청한 유저
                    </div>
                </Fragment>
            )}   
            
           
        </div>
    );
};

export default LoadProject;