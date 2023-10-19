import { useParams } from 'react-router-dom';
import WriteDetail from '../../components/write/WriteDetail';
import './Write.css';
import HeadMetaTag from '../../components/common/HeadMetaTag';

const Write = ({ page }) => {

    const { _id } = useParams();
   
    return (
        <div className='b_conts'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <WriteDetail writeId={_id} />
        </div>
    );
};

export default Write;