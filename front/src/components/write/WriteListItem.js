import { Link } from 'react-router-dom'; 
import { PiHeartDuotone } from "react-icons/pi";
import { changeViewDate } from '../../utils/utils';
import './WriteListItem.css';

const WriteListItem = ({ writes }) => {

    // console.log('wir', writes)

    return (
        <ul className='write_list_wrap'>
            {writes?.map(write => (
                <li key={write._id}>
                    <Link to={`/write/detail/${write._id}`} className='write_list_item'>
                        <div className='write_list_user_wrap'>
                            <div className='img_wrap'>
                                <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${write.user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                            </div>
                            <span className='write_list_id'>{write.user._id.id}</span>
                        </div>
                        <div className='write_list_title_wrap'>
                            <strong className='write_list_title word_ellip_1'>{write.title}</strong>
                            <p className='write_list_conts word_ellip_1'>{write.content}</p>
                        </div>
                        <div className='write_list_like_wrap'>
                            <span className='hart_ico'>
                                <PiHeartDuotone />
                                <span className='count'>{write.likeCount}</span>
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