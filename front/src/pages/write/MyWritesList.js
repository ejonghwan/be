import React, { Fragment, useContext, useEffect, useState } from 'react';
import WriteListItem from '../../components/write/WriteListItem';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import Button from '../../components/common/form/Button';
import NoData from '../../components/common/notData/NoData';
import { PiFileXDuotone } from "react-icons/pi";
import Spinners from '../../components/common/spinners/Spinners';
import SkeletonItem from '../../components/skeleton/SkeletonItem';
import SkeletonWriteCard from '../../components/skeleton/SkeletonWriteCard';
import './MyWritesList.css';
import HeadMetaTag from '../../components/common/HeadMetaTag';

const WritesList = ({ page }) => {

    const { state } = useContext(UserContext);
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { loadMyWrites } = WriteRequest();
    const [ writePage, setWritePage ] = useState(0);
    const [ moreBtnHide, setMoreBtnHide ] = useState(false);

    const handleWritePageup =() => {
        setWritePage(prev => prev += 1);
    };

    const handleLoadMyWrites = async () => {
        WriteDispatch({ type: "MYWRITES_LOAD_REQUEST" });
        const res = await loadMyWrites({ userId: state.user._id, page: writePage });
        res.length < 10 && setMoreBtnHide(true);
    };

    useEffect(() => {
        handleLoadMyWrites();
    }, [writePage]);

    useEffect(() => {
        return () => WriteDispatch({ type: "MYWRITES_CLEAR_REQUEST" });
    }, []);


    return (
        <div className='b_conts writes_list'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <div className='writes_align'>최근 순</div>

            {/* 스켈레톤 */}
            {WriteState.myWritesLoading && <div>
                <Fragment>
                    <h3 className='h3_title gap_20'>
                        <SkeletonItem style={{ width: "150px", height: "10px", borderRadius: "10px" }} />
                    </h3>
                    <ul className='write_list_wrap'>
                        {new Array(10).fill(null).map((_, idx) => <li key={idx}className='write_list_item'><SkeletonWriteCard /></li>)}
                    </ul>
                </Fragment>
                </div>}

            {WriteState.myWritesDone && (
                 WriteState.writeList?.length === 0 ? (
                    <Fragment>
                        <NoData 
                            icon={<PiFileXDuotone />}
                            title={'작성한 글이 하나도 없습니다.'}
                            subText={'습관에 글을 작성해보세요.'}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <h3 className='h3_title gap_20'>내가 작성한 글</h3>
                        <WriteListItem writes={WriteState.writeList} isProjectName={true} />
                        {moreBtnHide ? (
                            <div className='align_c gapt_50 gap_50'>더 이상 정보가 없습니다.</div>
                        ) : (
                            <div className='align_c gapt_30'>
                                {WriteState.myWritesLoading ? (<Spinners />) : (
                                    <Button className={'button_type_2 hover_type1 button_more arrow_bottom'} onClick={handleWritePageup}>더보기</Button>
                                )}
                            </div>
                        )}
                    </Fragment>
                )
            )}
           
        </div>
    );
};

export default WritesList;