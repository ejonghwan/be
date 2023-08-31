import { useParams } from 'react-router-dom';
import LoadProject from '../../components/project/LoadProject';


const ProjectDetail = ({ page }) => {
    const { _id } = useParams();
    
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <LoadProject projectId={_id}/>
        </div>
    );
};

export default ProjectDetail;