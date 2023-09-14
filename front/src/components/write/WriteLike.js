import { useState, useContext, useEffect, useCallback, Fragment } from 'react';
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
    const { state, dispatch } = useContext(UserContext);
    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext);
    const [like, setLike] = useState(() => writes.likes?.map(likeUser => likeUser === state.user._id ? true : false))
    // const [like, setLike] = useState(() => writes.likes)

    const handleWriteLike = e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.')
        e.preventDefault();
        likeApi(like)
        setLike(!like)
    } 

    const handleWriteUnlike = async e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.')
        e.preventDefault();
        likeApi(like)
        setLike(!like)
    } 


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async (like) => {
        try {
            WriteDispatch({ type: "WRITE_REQUEST" })
            if(like) {
                const resUnlike = await unLikeWrite({ writeId, userId });
                if(resUnlike.data) setLike(!like)
            } else {
                const resLikeawait = await likeWrite({ writeId, userId });
                if(resLikeawait.data) setLike(!like)
            }
        } catch(err) {
            console.log(err)
        }
    }, 1000), []);



    useEffect(() => {

        // 이거 왜 여기서 setLike하면 안되는지 알아내야함
        // console.log(writes.likes)
        // writes.likes.map(likeUser => {
        //     if(likeUser === state.user._id) setLike(false)
        //     if(likeUser !== state.user._id) setLike(false)
        // })
        // console.log(state.user._id, writes.likes, like)

    }, [writes.likes]);

    return (
        <Fragment>
            <span className={`write_like_wrap ${className}`}>
                {like && (
                    <Button type={'button'} className={`button_type4 write_like ico_hover_type1 like ${like && 'active'}`} onClick={handleWriteUnlike}>
                        {like && <InfoState text={'좋아요!'} /> }
                        <PiHeartDuotone />
                        <span className='blind'>이 글 좋아요</span>
                    </Button>
                )}

                {!like && (
                    <Button type={'button'} className={`button_type4 write_like unlike ico_hover_type1 ${like && 'active'}`} onClick={handleWriteLike}>
                        {!like && like !== null && <InfoState text={'좋아요 취소!'} /> }
                        <PiHeartDuotone />
                        <span className='blind'>이 글 좋아요 취소</span>
                    </Button>
                )}
                 <span className='like_count'>{writeLikeLen}</span>
            </span>
        </Fragment>
    );
};

export default WriteLike;