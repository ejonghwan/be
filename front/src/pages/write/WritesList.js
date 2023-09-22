import React, { useContext, useEffect } from 'react';
import WriteListItem from '../../components/write/WriteListItem';
import { WriteContext } from '../../context/WriteContext';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';

const WritesList = ({ page }) => {

    const { state } = useContext(UserContext);
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { loadMyWrites } = WriteRequest();
    const handleLoadMyWrites = () => {
        WriteDispatch({ type: "MYWRITES_LOAD_REQUEST" });
        loadMyWrites({ userId: state.user._id, page: 0 })
    }

    useEffect(() => {
        handleLoadMyWrites();
    }, [])

    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <WriteListItem />
        </div>
    );
};

export default WritesList;