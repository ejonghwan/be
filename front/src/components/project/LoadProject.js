import { useEffect, useContext } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import IconData from '../common/icon/IconData';
import Icon from '../common/icon/Icon';
import WriteListItem from '../write/WriteListItem';
import Calender from '../../components/calender/Calender';



const LoadProject = ({ projectId }) => {

    const { loadProject } = ProjectRequest();
    const { ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    

    const handleLoadProject = async e => {
        ProjectDispatch({ type: "PROJECT_REQUEST" });
        const data = await loadProject(projectId);
        console.log(data)
    }

    useEffect(() => {
        handleLoadProject()
    }, [])

    return (
        <div>
            <div>
                <Icon icon={IconData[project.userCount]}/>
                <h3>{project.title}</h3>
            </div>

            <div>
                내용{project.content}
            </div>

            <div>
                인증글 
                <WriteListItem project={project} />
            </div>

            <div>
                참여유저
            </div>


            <div>
                달력
                <Calender project={project} />
            </div>


            {/* 아래 두개는 프로젝트에 있는 아이디랑 로그인한 유저랑 같을떄만 노출 */}
            <div>
                초대 한 유저 
            </div>

            <div>
                신청한 유저
            </div>
            
           
        </div>
    );
};

export default LoadProject;