import { useState, useContext, useEffect, useCallback, Fragment, useRef, } from 'react';
import { PiStarDuotone, PiHeartDuotone } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import Button from '../common/form/Button';
import _debounce from 'lodash.debounce';
import InfoState from '../common/infoState/InfoState';
import './WriteLike.css';
import { WriteContext } from '../../context/WriteContext';




const WriteLike = ({ writeLikeLen, writeId, userId, className = '' }) => {
    
    const { likeWrite, unLikeWrite } = WriteRequest();
    const { state } = useContext(UserContext);
    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
    const [like, setLike] = useState(null);
    const likeRef = useRef(false)
    const unlikeRef = useRef(false)


    const handleWriteLike = e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.');
        likeApi(like);
        setLike(!like);
        unlikeRef.current = false;
        likeRef.current = true;
    };

    const handleWriteUnlike = async e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.');
        likeApi(like);
        setLike(!like);
        likeRef.current = false;
        unlikeRef.current = true;
    } ;


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async (like) => {
        try {
            if(like) {
                // 라이크 유저에 내가 없으면 내리기 안되게 해야됨
                WriteDispatch({ type: "WRITE_UNLIKE_REQUEST" })
                if(writes.likes?.filter(likeUser => likeUser === state.user._id).length === 0) return;
                const resUnlike = await unLikeWrite({ writeId, userId });
                if(resUnlike.data) setLike(!like)
            } else {
                // 라이크 유저에 내가 있으면 올리기 요청 안되게 함
                WriteDispatch({ type: "WRITE_LIKE_REQUEST" })
                if(writes.likes?.filter(likeUser => likeUser === state.user._id).length > 0) return;
                const resLikeawait = await likeWrite({ writeId, userId });
                if(resLikeawait.data) setLike(!like)
            }
        } catch(err) {
            console.log(err)
        } 
    }, 1000), [writes.likes]);

    useEffect(() => {
        // writes.likes?.filter(likeUser => likeUser === state.user._id).length > 0 ? true : false
        writes.likes?.filter(likeUser => likeUser === state.user._id).length > 0 ? setLike(true) : setLike(false)
    }, [writes.likes])



    return (
        <Fragment>
            <span className={`write_like_wrap ${className}`}>
                {like && (
                    <Fragment>
                        {likeRef.current && <InfoState text={'좋아요!'} className='comment' />}
                        <Button type={'button'} className={`button_type3 write_like ico_hover_type1 like ${like && 'active'}`} onClick={handleWriteUnlike} title={'좋아요 취소'}>
                            <PiHeartDuotone />
                            <span className='blind'>이 글 좋아요 취소</span>
                        </Button>
                    </Fragment>
                    
                )}

                {!like && (
                    <Fragment>
                        {unlikeRef.current && <InfoState text={'좋아요 취소!'} className='comment' />}
                        <Button type={'button'} className={`button_type3 write_like unlike ico_hover_type1 ${like && 'active'}`} onClick={handleWriteLike} title={'좋아요'}>
                            <PiHeartDuotone />
                            <span className='blind'>이 글 좋아요</span>
                        </Button>
                    </Fragment>
                )}
                 <span className='like_count'>{writeLikeLen}</span>
            </span>
        </Fragment>
    );
};

export default WriteLike;