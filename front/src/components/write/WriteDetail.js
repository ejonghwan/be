import { useEffect, useContext } from 'react';
import { WriteContext } from '../../context/WriteContext';
import { ProjectContext } from '../../context/ProjectContext';
import WriteRequest from '../../reducers/WriteRequest';
import './WriteDetail.css';

const WriteDetail = ({ writeId }) => {

    const { WriteState: { writes }, WriteDispatch } = useContext(WriteContext)
    const { ProjectState: { project } } = useContext(ProjectContext);
    const { loadWrite } = WriteRequest();

    const handleLoadWrite = async () => {
        WriteDispatch({ type: "WRITE_REQUEST" })
        await loadWrite(writeId)
    }

    useEffect(() => {
        handleLoadWrite();
    }, [])


    return (
        <div>
            {writeId}
            {project.title}
            {writes.title}
        </div>
    );
};

export default WriteDetail;