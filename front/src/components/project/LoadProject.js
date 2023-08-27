import { useEffect, useContext } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import IconData from '../common/icon/IconData';
import Icon from '../common/icon/Icon';

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
                내용
                <Icon icon={IconData[project.content]}/>
            </div>
           
        </div>
    );
};

export default LoadProject;