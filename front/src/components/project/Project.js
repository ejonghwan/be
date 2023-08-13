import React, { useReducer } from 'react';
import './Project.css'
import ProjectItem from './ProjectItem';



const Project = () => {

    // const {  } = useReducer(project);
    const project = [1,2,3]
    return (
        <div className='project_Wrap'>
           {project.map((item, idx) => {
            return <ProjectItem />
           })}
        </div>
    );
};

export default Project;