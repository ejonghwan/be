import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import MyCommentItem from '../../components/write/MyCommentItem';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import Button from '../../components/common/form/Button';
import NoData from '../../components/common/notData/NoData';
import { PiFileXDuotone } from "react-icons/pi";
import Spinners from '../../components/common/spinners/Spinners';
import './MyComments.css';



const MyComments = ({ page }) => {

    const { state } = useContext(UserContext);
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { loadMyComments } = WriteRequest();
    const [ commentPage, setCommentPage ] = useState(0);
    const [ moreBtnHide, setMoreBtnHide ] = useState(false);

    const handleWritePageup =() => {
        setCommentPage(prev => prev += 1)
    }

    const handleLoadMyComments = async () => {
        WriteDispatch({ type: "MYCOMMENTS_LOAD_REQUEST" });
        const res = await loadMyComments({ userId: state.user._id, page: commentPage });
        res.length < 10 && setMoreBtnHide(true);
    }

    useEffect(() => {
        handleLoadMyComments();
    }, [commentPage])

    useEffect(() => {
        return () => WriteDispatch({ type: "MYCOMMENTS_CLEAR_REQUEST" })
    }, [])


    return (
        <div className='b_conts writes_list'>
            <h2>{page}</h2>
            <div className='writes_align'>최근 순</div>
            {WriteState.myCommentsLoading && <div>로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....</div>}
            {WriteState.myCommentsDone && (
                 WriteState.commentsList.length === 0 ? (
                    <Fragment>
                        <NoData 
                            icon={<PiFileXDuotone />}
                            title={'작성한 댓글이 하나도 없습니다.'}
                            subText={'다른 글에 댓글을 작성해보세요.'}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <MyCommentItem comments={WriteState.commentsList} isProjectName={true} />
                        {moreBtnHide ? (
                            <div className='align_c gapt_50 gap_50'>더 이상 정보가 없습니다.</div>
                        ) : (
                            <div className='align_c gapt_50'>
                                {WriteState.myCommentsLoading ? (<Spinners />) : (
                                    <Button className={'button_type_2 hover_type1 arrow_bottom button_more'} onClick={handleWritePageup}>더보기</Button>
                                )}
                            </div>
                        )}
                    </Fragment>
                )
            )}
           
        </div>
    );
};

export default MyComments;