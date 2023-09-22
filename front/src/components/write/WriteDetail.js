import { useEffect, useContext, Fragment, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import ImageRequest from '../../reducers/ImageRequest';
import LikeIcon from '../common/icon/LikeIcon';
import CommentIcon from '../common/icon/CommentIcon';
import WriteLike from './WriteLike';
import UserThumItem from '../common/userThum/UserThumItem';
import ViewDate from '../common/date/ViewDate';
import { changeViewDate } from '../../utils/utils';
import Nodata from '../common/notData/NoData';
import { PiGhostDuotone, PiGearDuotone, PiXCircleDuotone, PiFileXDuotone, PiChatDotsDuotone } from "react-icons/pi";
import Button from '../common/form/Button';
import Popup from '../common/popup/Popup';
import WriteEdit from './WriteEdit.js'
import Comment from '../comment/Comment';
import './WriteDetail.css';


const WriteDetail = ({ writeId }) => {

    const { WriteState, WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
    const { state } = useContext(UserContext);
    const { loadWrite, deleteWrite } = WriteRequest();
    const { imageDelete } = ImageRequest();
    const editWriteRef = useRef(null);
    const navigate = useNavigate();


    const handleWriteEditState = () => editWriteRef.current.popupOpen();


    const handleLoadWrite = async () => {
        try {
            WriteDispatch({ type: "WRITE_LOAD_REQUEST" });
            await loadWrite(writeId);
        } catch(err) {
            console.log(err)
        }
    }

    const handleWriteDelete = async () => {
        try {
            if(!window.confirm('정말 이 글을 삭제하시겠습니까?')) return;
            WriteDispatch({ type: "WRITE_DELETE_REQUEST" });
            writes.writeImages[0] && await imageDelete({ fileName: writes.writeImages[0].key });
            const res = await deleteWrite({
                userId: state.user._id,
                writeId: writeId,
                projectId: writes.project._id._id
            });
            navigate(`/project/detail/${res.projectId}`)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleLoadWrite();
    }, [])


    return (
        <div className='write_wrap'>
            {WriteState.loadLoading && (
                <div>로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중</div>
                )}
            
            {WriteState.loadDone && (
                <Fragment>
                    {state.user.joinProjects?.filter(joinProject => joinProject._id !== null ).filter(joinProject => joinProject._id._id === writes.project?._id._id).length > 0 
                        || 
                    state.user.projects?.filter(project => project._id === writes.project?._id._id).length > 0 ? (
                            <Fragment>
                                <div className='write_header'>
                                    <div className='write_header_item'>
                                        <Link to={`/project/detail/${writes.project?._id._id}`} className='project_link arrow_right' title={'습관 페이지로 이동'}>{writes.project?._id.title}</Link>
                                        <h3 className='write_title gap_10'>{writes.title}</h3>
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
                                                {txt: '작성일 ', date: changeViewDate(writes.createdAt, 'minute')},
                                                {txt: '수정일 ', date: changeViewDate(writes.updatedAt, 'minute')},
                                            ]} />
                                        </div>
                                        <div className='write_header_ico_wrap'>
                                            <WriteLike writeId={writeId} userId={state.user._id} writeLikeLen={writes.likeCount} />
                                            <CommentIcon count={writes.commentCount} />
                                            {writes.user._id?._id === state.user._id && (
                                                <Fragment>
                                                    <Button className={'button_type3 ico_hover_type2'} onClick={handleWriteEditState} title={'글 수정'}>
                                                        <PiGearDuotone />
                                                        <span className='blind'>인증글 수정</span>
                                                    </Button>
                                                    <Button className={'button_type3 ico_hover_type1 write_delete'} title={'글 삭제'} onClick={handleWriteDelete}>
                                                        <PiFileXDuotone />
                                                        <span className='blind'>인증글 삭제</span>
                                                    </Button>
                                                </Fragment>
                                            )}
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='write_body'>
                                    {writes.writeImages?.map(image => (
                                        <div className="write_img_wrap" key={image.key}>
                                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${image.key}`} alt="인증 사진" />
                                        </div>
                                    ))}
                                    <div>{writes.content}</div>
                                </div>
                                <div className='write_bottom'>
                                    <Comment comments={writes.comments}/>
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
                </Fragment>
            )}

             {/* 글 수정하기 */}
             <Popup 
                className={`popup_type_default write_edit`} 
                isHead={true} 
                title={`글 수정`} 
                closeClick={() => editWriteRef.current.popupClose()} 
                dimd={true} 
                ref={editWriteRef} 
                // isButton={true} 
                // buttons={[<Button className={"button_type2"} onClick={handleProjectEdit}>습관 수정</Button>]}
            >
                
                <WriteEdit editWriteRef={editWriteRef} writes={writes}/>
            </Popup>
        </div>
    );
};

export default WriteDetail;