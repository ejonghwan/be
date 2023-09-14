import { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import './WriteDetail.css';
import LikeIcon from '../common/icon/LikeIcon';
import CommentIcon from '../common/icon/CommentIcon';
import WriteLike from './WriteLike';
import UserThumItem from '../common/userThum/UserThumItem';
import ViewDate from '../common/date/ViewDate';
import { changeViewDate } from '../../utils/utils';
import Nodata from '../common/notData/NoData';
import { PiGhostDuotone } from "react-icons/pi";



const WriteDetail = ({ writeId }) => {

    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext)
    const { state } = useContext(UserContext)
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
            {state.user.joinProjects?.filter(joinProject => joinProject._id !== null )
                .filter(joinProject => joinProject._id._id === writes.project?._id._id).length > 0 
                || 
                state.user.projects?.filter(project => project._id === writes.project?._id._id).length > 0 ? (
                    <Fragment>
                            <div className='write_header'>
                            <div className='write_header_item'>
                                <Link to={`/project/detail/${writes.project?._id._id}`} className='project_link'>{writes.project?._id.title}</Link>
                                <h3 className='write_title gap_20'>{writes.title}</h3>
                            </div>
                            <div className='write_header_item write_info'>
                                <div className='write_header_user_wrap'>
                                    {writes.user && <UserThumItem 
                                        users={[writes.user]} 
                                        isText={true} 
                                        isId={false}
                                        className={'horizontal_type1'} 
                                    />}
                                    <ViewDate dates={[
                                        {txt: '작성일', date: changeViewDate(writes.createdAt, 'minute')},
                                        {txt: '수정일 ', date: changeViewDate(writes.updatedAt, 'minute')},
                                    ]} />
                                </div>
                                <div className='write_header_ico_wrap'>
                                    <WriteLike writeId={writeId} userId={state.user._id} writeLikeLen={writes.likeCount} />
                                    <CommentIcon count={writes.commentCount} />
                                </div>
                                
                            </div>
                        </div>
                        <div className='write_body'>
                            {writes.writeImages?.map(image => (
                                <div className="" key={image.key}>
                                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${image.key}`} alt="인증 사진" />
                                </div>
                            ))}
                            <div>{writes.content}</div>
                        </div>
                    </Fragment>
                ) : (
                    <div className='no_data'>
                        <Nodata icon={<PiGhostDuotone />} title={'이 글을 볼 수 있는 권한이 없습니다.'} subText={'이 프로젝트에 가입신청 후 승인을 받고 이용해주세요.'}/>
                        <div className='align_c gapt_30'>
                            <Link to={`/project/detail/${writes.project?._id._id}`} className='project_link'>{writes.project?._id.title} 보러가기</Link>
                        </div>
                       
                    </div>
                )
            }
        </div>
    );
};

export default WriteDetail;