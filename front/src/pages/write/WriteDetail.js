import { useParams } from 'react-router-dom';
import './WriteDetail.css';

const WriteDetail = ({ page }) => {

    const { _id } = useParams();

    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            {_id}
        </div>
    );
};

export default WriteDetail;