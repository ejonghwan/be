import { useParams } from 'react-router-dom';
import WriteDetail from '../../components/write/WriteDetail';
import './Write.css';

const Write = ({ page }) => {

    const { _id } = useParams();
   
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <WriteDetail writeId={_id} />
        </div>
    );
};

export default Write;