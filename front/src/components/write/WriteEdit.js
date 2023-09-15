import WriteImageEdit from './WriteImageEdit';
import './WriteEdit.css';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';

import { useContext, useEffect, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Label from '../common/form/Label';
import { UserContext } from '../../context/UserContext';
import _debounce from 'lodash.debounce';
import ImageUploadView from '../image/ImageUploadView';
import useImageRequest from '../../reducers/ImageRequest.js';
import WriteRequest from '../../reducers/WriteRequest';


const WriteEdit = ({ editWriteRef }) => {

    const { state } = useContext(UserContext);
    const { imageUpload } = useImageRequest();
    const { createWrite } = WriteRequest();
    const navigate = useNavigate();

    const [imageData, setImageData] = useState({})

    const [writeSubmitData, setWriteSubmitData] = useState({ 
        title: '',
        content: '',
    });


    const handleValuesChange = e => {
        const {name, value} = e.target;
        setWriteSubmitData({...writeSubmitData, [name]: value})
    }

    const handleCreateWriteSubmit = _debounce(async(e) => {
        try {
            const res = await createWrite(writeSubmitData) // 글 보내기
             // 이미지가 있으면 올리고 없으면 올리지 않음. 동기적으로 글 생성 후 그 아이디 받아서 다시 요청
            if( imageData.file ) { await imageUpload({ ...imageData, _id: res._id }); }
            editWriteRef.current.popupClose()
            navigate(`/write/detail/${res._id}`)
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    return (
        <div>
            <div className='gapt_30 gap_30'>
                <WriteImageEdit />
            </div>
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
        </div>
    );
};

export default WriteEdit;