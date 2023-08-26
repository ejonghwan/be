import { useEffect, useContext } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';

const LoadProject = ({ projectId }) => {

    const { loadProject } = ProjectRequest();
    const { ProjectState, ProjectDispatch } = useContext(ProjectContext);


    const handleLoadProject = async e => {
        ProjectDispatch({ type: "PROJECT_REQUEST" });
        const data = await loadProject(projectId)
        console.log(data)
    }

    useEffect(() => {
        handleLoadProject()
    }, [])

    return (
        <div>
            asdasd
        </div>
    );
};

export default LoadProject;