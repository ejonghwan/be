import { useContext } from 'react';
import { WriteContext } from '../../context/WriteContext';
import './WriteDetail.css';

const WriteDetail = ({ writeId }) => {

    const { WriteState: { writes } } = useContext(WriteContext)
    
    return (
        <div>
            {writeId}
            
        </div>
    );
};

export default WriteDetail;