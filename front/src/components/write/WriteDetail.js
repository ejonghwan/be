import { useContext, useEffect, useState, useCallback, memo } from 'react';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import { PiPlusCircleDuotone, PiUsersDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import { ProjectContext } from '../../context/ProjectContext';
import { UserContext } from '../../context/UserContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';
import UserThumItem from '../common/userThum/UserThumItem';
import ProjectRequest from '../../reducers/ProjectRequest';
import ViewDate from '../common/date/ViewDate';
import { changeViewDate } from '../../utils/utils';
import './WriteDetail.css';
import WriteImageForm from './WriteImageEdit';
import ImageUploadView from '../image/ImageUploadView';



const WriteDetail = ({ projectId }) => {

    // 섬넬에서도 바로바로 인증 버튼 눌러서 인증 가능하게 하기위해 플젝 아뒤는 프롭으로 전달받도록 함 
    const { state } = useContext(UserContext);

    const [writeSubmitData, setWriteSubmitData] = useState({ 
        user: { _id: state.user._id, name: state.user.name },
        projectId: projectId,
        title: '',
        content: '',
    });


    const handleValuesChange = e => {
        const {name, value} = e.target;
        setWriteSubmitData({...writeSubmitData, [name]: value})
    }


    const handleCreateWriteSubmit = async e => {
        try {
            e.preventDefault()
            console.log('submit')
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        console.log(writeSubmitData)
    }, [writeSubmitData])


    return (
        <div className='write_detail_wrap'>
            <form onSubmit={handleCreateWriteSubmit}>

                <ImageUploadView />

                <div className='gapt_30 gap_30'>
                    <Label htmlFor="title" content="습관 이름을 정해주세요." className={"label_type1"}/>
                    <Input 
                        id={"title"}
                        type={"text" }
                        required={true} 
                        placeholder="인증할 제목을 입력해주세요." 
                        className={"input_type1"} 
                        name="title" 
                        value={writeSubmitData.title} 
                        onChange={handleValuesChange} 
                    />
                </div>
                <div className='gap_30'>
                    <Label htmlFor="content" content="습관 내용" className={"label_type1"}/>
                    <Textarea 
                        id={"content"}
                        name={"content"}
                        className={"textarea_type1"} 
                        value={writeSubmitData.content}
                        onChange={handleValuesChange}
                        required={true} 
                        placeholder={"인증할 내용을 입력해주세요."}
                    >
                        {writeSubmitData.content}
                    </Textarea>
                </div>
                <div className='align_c'>
                    <Button className={"button_type2"} onClick={handleCreateWriteSubmit}>글쓰기</Button>
                </div>
            </form>
        </div>
    );
};

export default WriteDetail;