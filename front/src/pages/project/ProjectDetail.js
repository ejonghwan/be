import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {

    const { _id } = useParams()
    

    return (
        <div>
            projectDetail {_id}
        </div>
    );
};

export default ProjectDetail;