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
import './WriteEdit.css';



const WriteEdit = ({ editWriteRef, writes }) => {

    const { state } = useContext(UserContext);
    const { imageUpload } = useImageRequest();
    const { createWrite } = WriteRequest();

    const [imageData, setImageData] = useState({})

    const [writeSubmitData, setWriteSubmitData] = useState({ 
        title: writes.title,
        content: writes.content,
    });


    const handleValuesChange = e => {
        const {name, value} = e.target;
        setWriteSubmitData({...writeSubmitData, [name]: value})
    }

    const handleEditWriteSubmit = _debounce(async(e) => {
        try {
            const res = await createWrite(writeSubmitData) // 글 보내기
             // 이미지가 있으면 올리고 없으면 올리지 않음. 동기적으로 글 생성 후 그 아이디 받아서 다시 요청
             // 수정에선 백엔드에서 기존 이미지 지우고 추가해야됨. 아직 작업안함
            if( imageData.file ) { 
                await imageUpload({ ...imageData, _id: res._id }); 
                
            };
            editWriteRef.current.popupClose();
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    useEffect(() => {
        console.log(writeSubmitData)
    }, [writeSubmitData])

    return (
        <div>
            <div className='gapt_30 gap_30'>
                <ImageUploadView path={"write"} setImageData={setImageData} initailImageSrc={writes.writeImages?.map(image => (`${process.env.REACT_APP_BACKEND_HOST}/uploads/${image.key}`)  )}/>
            </div>
            <div className='gapt_30 gap_30'>
                <Label htmlFor="title" content="글 제목" className={"label_type1"}/>
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
                <Label htmlFor="content" content="글 내용" className={"label_type1"}/>
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
                <Button type={'button'} className={"button_type2"} onClick={handleEditWriteSubmit}>인증글 수정</Button>
            </div>
        </div>
    );
};

export default WriteEdit;