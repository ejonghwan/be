import { Fragment, useContext } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { UserContext } from '../../context/UserContext';
import { ProjectContext } from '../../context/ProjectContext';
import Button from "../common/form/Button";
import Spinners from '../common/spinners/Spinners';

const RequestProject = ({ btnTxt, className = '', projectId, userId}) => {

    const { requestProject } = ProjectRequest();
    const { ProjectState, ProjectDispatch } = useContext(ProjectContext);

    // 가입신청하면 joinUser에 false로 등록됨. false면 가입신청 하고 수락을 기다리는 중 

    const handleRequestProject = async e => {
        try {
            e.preventDefault();
            ProjectDispatch({ type: "PROJECT_REQUEST_REQUEST" });
            await requestProject({ projectId, userId });
            alert('이 습관에 신청하셨습니다. 신청이 수락되면 가입이 완료됩니다.')
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <Fragment>
            {ProjectState.requestInfriendProjectLoading ? (<Spinners />) : (
                <Button type={'button'} className={className} onClick={handleRequestProject}>{btnTxt}</Button>
            )}
        </Fragment>
    );
};

export default RequestProject;