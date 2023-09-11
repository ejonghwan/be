import { useContext, Fragment } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import { PiStarDuotone, PiGearDuotone, PiSmileyXEyesDuotone, PiUsersDuotone, PiPencilSimpleSlashDuotone, PiUserPlusDuotone, PiHandEyeDuotone, PiEyeClosedDuotone } from "react-icons/pi";
import './ProjectPublic.css';


const ProjectPublic = ({ txt = false, className = '' }) => {

    const { ProjectState: { project } } = useContext(ProjectContext);

    return (
        <Fragment>
            {project.projectPublic ? (
                <div className={`project_public ${className}`}>
                    <PiHandEyeDuotone />
                    <span className={`${!txt && 'blind'}`}>습관 공개</span>
                </div>
            ) : (
                <div className={`project_public ${className}`}>
                    <PiEyeClosedDuotone />
                    <span className={`${!txt && 'blind'}`}>습관 비공개</span>
                </div>
            )}
        </Fragment>
    );
};

export default ProjectPublic;