import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import WriteDetail from '../../components/write/WriteDetail';
import { WriteContext } from '../../context/WriteContext';
import WriteRequest from '../../reducers/WriteRequest';

import './Write.css';

const Write = ({ page }) => {

    const { _id } = useParams();
    const { WriteState, WriteDispatch } = useContext(WriteContext);
    const { loadWrite } = WriteRequest();

    const handleLoadWrite = async () => {
        WriteDispatch({ type: "WRITE_REQUEST" })
        await loadWrite(_id)
    }

    useEffect(() => {
        handleLoadWrite();
    }, [])

    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <WriteDetail writeId={_id}/>
        </div>
    );
};

export default Write;