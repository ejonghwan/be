import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LoadProject from '../../components/project/LoadProject';
import { ProjectContext } from '../../context/ProjectContext';
// import SkeletonProject from '../../components/skeleton/SkeletonProject';
import Spinners from '../../components/common/spinners/Spinners';


const ProjectDetail = ({ page }) => {
    const { _id } = useParams();
    const { ProjectState } = useContext(ProjectContext);
    
    return (
        <div className='b_conts project_detail'>
            <h2>{page}</h2>
            {ProjectState.aLoadProjectLoading && (<Spinners />)}
            <LoadProject projectId={_id}/>
        </div>
    );
};

export default ProjectDetail;