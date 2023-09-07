import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import './CreateProjectDetail.css';
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiUserCirclePlusDuotone, PiXCircleDuotone, PiSmileyXEyesDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import SearchRequest from '../../reducers/SearchRequest';
import ProjectRequest from '../../reducers/ProjectRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import { ProjectContext } from '../../context/ProjectContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';

import './ProjectEdit.css';

const ProjectEdit = () => {

    const { ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    const [projectImages, setProjectImages] = useState(0);
    const [submitData, setSubmitData] = useState({ 
        // constructorUser: { _id: state.user._id },
        title: '',
        content: '',
        categorys: [], //{categoryName: ''}
        joinUser: [],
        projectPublic: true,
        projectImages: projectImages,
    });


    const handleIconClick = idx => {
        setProjectImages(idx)
        setSubmitData(prev => ({ ...prev, projectImages: idx }))
    };
    return (
        <div>
            img <br />
            constructorUser, 디폴트<br />
            instanceUser, 삭제 // 이거 기존꺼 유지 잘 되면서 삭제되는지 <br />
            rank, // 아직 미구현<br />
            title, // 수정 x <br />
            content, // 수정 <br />
            write, // 수정 x <br />
            projectPublic, // 수정<br />
            categorys, // 새로 추가된것만 <br />
            deleteCategorys // 삭제한거<br />
            <br />
            인스유저 
            instanceUser Array
                0 Object
                _id: 64ec6e2565bdb45b5254d1fe
                rank: "e"
                days: Array
                <br />
            <div>
                <IconVisual icon={IconData[project.projectImages]}/>
            </div>
            <div>
                <div  className='gapt_30'>
                    <IconList icons={IconData} onClick={handleIconClick} current={project.projectImages}/>
                </div>
            </div>
            <div>{project.title}</div>
            

        </div>
    );
};

export default ProjectEdit;