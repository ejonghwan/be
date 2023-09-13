import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WriteContext } from '../../context/WriteContext';
import WriteRequest from '../../reducers/WriteRequest';
import './WriteDetail.css';
import LikeIcon from '../common/icon/LikeIcon';

const WriteDetail = ({ writeId }) => {

    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext)
    const { loadWrite } = WriteRequest();

    const handleLoadWrite = async () => {
        WriteDispatch({ type: "WRITE_REQUEST" })
        await loadWrite(writeId)
    }

    useEffect(() => {
        handleLoadWrite();
    }, [])


    return (
        <div className='write_wrap'>

            <div className='write_header'>
                <div>
                    <Link to={`/project/detail/${writes.project?._id._id}`}>{writes.project?._id.title}</Link>
                    <h3>{writes.title}</h3>
                </div>
                <div>
                    <LikeIcon count={writes.likeCount}/>
                  
                    <span>{writes.project?._id.title} 좋아요한 유저 사진, 갯수</span>
                    <span>{writes.project?._id.title} 코멘트 갯수</span>
                </div>
            </div>

             <div className='write_body'>
                {writes.writeImages?.map(image => (
                     <div className="">
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${image.key}`} alt="인증 사진" />
                    </div>
                ))}
               
                <div>{writes.content}</div>
            </div>
            
            
        </div>
    );
};

export default WriteDetail;