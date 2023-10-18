import { Link } from 'react-router-dom'; 
import { PiChatTeardropDotsDuotone, PiHandHeartDuotone } from "react-icons/pi";
import { changeViewDate } from '../../utils/utils';
import NotProfileImg from '../user/NotProfileImg';
import './WriteListItem.css';

const WriteListItem = ({ writes, isProjectName = false }) => {
    return (
        <ul className='write_list_wrap'>
            {writes?.map(write => (
                <li key={write._id}>
                    <Link to={`/write/detail/${write._id}`} className='write_list_item'>
                        <div className='write_list_user_wrap'>
                            <div className='img_wrap'>
                                {write.user?._id.profileImage?.key ? (
                                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${write.user?._id.profileImage?.key}`} alt="유저 프로필 이미지" />
                                ) : (
                                    <NotProfileImg style={{ fontSize: "1.4rem" }} firstString={write.user?._id.profileImage?.firstString} userBgColor={write.user?._id.profileImage?.bg}/>
                                )}
                            </div>
                            <span className='write_list_id'>{write.user._id.id}</span>
                        </div>
                        <div className='write_list_title_wrap'>
                            {isProjectName && <p className='gap_5'>{write?.project?._id?.title}</p>}
                            <strong className='write_list_title word_ellip_1'>{write.title}</strong>
                            <p className='write_list_conts word_ellip_1'>{write.content}</p>
                        </div>
                        <div className='write_list_like_wrap'>
                            <span className='hart_ico'>
                                <PiHandHeartDuotone />
                                <span className='count'>{write.likeCount}</span>
                            </span>
                            <span className='comment_ico'>
                                <PiChatTeardropDotsDuotone />
                                <span className='count'>{write.commentCount + write.comments?.map(comment => comment.recommentCount).reduce((acc, cur) => acc + cur, 0)}</span>
                            </span>
                            <span className='write_list_createdat'>{changeViewDate(write.createdAt, 'day')}</span>
                        </div>
                        
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default WriteListItem;