import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import ProjectRequest from '../../reducers/ProjectRequest';
import { ProjectContext } from '../../context/ProjectContext';
import { UserContext } from '../../context/UserContext';
import Button from '../common/form/Button';
import { PiGearDuotone, PiSmileyXEyesDuotone, PiUsersDuotone, PiPencilSimpleSlashDuotone, PiUserPlusDuotone } from "react-icons/pi";
import Input from '../common/form/Input';
import './DeleteProject.css';
import Spinners from '../common/spinners/Spinners';
import ErrorMsg from '../common/errorMsg/ErrorMsg';




const DeleteProject = () => {

    const { deleteProject } = ProjectRequest();
    const { state } = useContext(UserContext);
    const { ProjectState, ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    const [ deleteValue, setDeleteValue ] = useState('');
    const [ deleteState, setDeleteState ] = useState(false);

    const handleDeleteProject = e => {
        ProjectDispatch({ type: "PROJECT_DELETE_REQUEST" });
        deleteProject({
            projectId: [project._id],
            userId: state.user._id
        });
    };

    useEffect(() => {
        state.user.id + '/' + project.title === deleteValue ? setDeleteState(true) : setDeleteState(false);
    }, [deleteValue]);

    return (
        <div className='delete_project_wrap'>
            <p className='gap_5 delete_text'>습관을 삭제하시면 이 습관에 연결된 모든 정보가 삭제되고 복구되지 않습니다.</p>
            <p className='gap_20 delete_text'>삭제를 원하시면 <span className='delete_check_text'>{state.user.id + '/' + project.title}</span>를 입력해주세요.</p>
            <Input 
                id={"title"}
                type={"text" }
                required={true} 
                placeholder={state.user.id + '/' + project.title}
                className={"input_type1"} 
                name="title" 
                value={deleteValue} 
                onChange={e => setDeleteValue(e.target.value)} 
            />

            <div className='add_friend align_c gapt_40'>
                {ProjectState.deleteProjectLoading ? (<Spinners />) : (
                    <Button type={'button'} className={"button_type5"} onClick={handleDeleteProject} disabled={!deleteState}>삭제하기</Button>
                )}
                {ProjectState.deleteProjectError && <ErrorMsg className={'error_type1 align_c gapt_30'}>{ProjectState.deleteProjectError}</ErrorMsg>}
            </div>
        </div>
    );
};

export default DeleteProject;