import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import WriteListItem from '../../components/write/WriteListItem';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import Button from '../../components/common/form/Button';
import './MyWritesList.css';
import NoData from '../../components/common/notData/NoData';
import { PiFileXDuotone } from "react-icons/pi";

const WritesList = ({ page }) => {

    const { state } = useContext(UserContext);
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { loadMyWrites } = WriteRequest();
    const [ writePage, setWritePage ] = useState(0);
    const [ moreBtnHide, setMoreBtnHide ] = useState(false);

    const handleWritePageup =() => {
        setWritePage(prev => prev += 1)
    }

    const handleLoadMyWrites = async () => {
        WriteDispatch({ type: "MYWRITES_LOAD_REQUEST" });
        const res = await loadMyWrites({ userId: state.user._id, page: writePage });
        console.log('r?', res.length)
        res.length < 10 && setMoreBtnHide(true);
        console.log(moreBtnHide)
    }

    useEffect(() => {
        handleLoadMyWrites();
    }, [writePage])

    useEffect(() => {
        return () => WriteDispatch({ type: "MYWRITES_CLEAR_REQUEST" })
    }, [])


    return (
        <div className='b_conts writes_list'>
            <h2>{page}</h2>
            <div className='writes_align'>최근 순</div>
            {WriteState.myWritesLoading && <div>로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....로딩중....</div>}
            {WriteState.myWritesDone && (
                 WriteState.writeList.length === 0 ? (
                    <Fragment>
                        <NoData 
                            icon={<PiFileXDuotone />}
                            title={'작성한 글이 하나도 없습니다.'}
                            subText={'습관에 글을 작성해보세요.'}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <WriteListItem writes={WriteState.writeList} isProjectName={true} />
                        {!moreBtnHide && (
                            <div className='align_c gapt_50'>
                                <Button className={'button_type_2 hover_type1 arrow_bottom'} onClick={handleWritePageup}>더보기</Button>
                            </div>
                        )}
                    </Fragment>
                )
            )}
           
        </div>
    );
};

export default WritesList;