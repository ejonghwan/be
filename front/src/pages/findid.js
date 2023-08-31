import FindId from '../components/user/FindId';
import FindIdQuestion from '../components/user/FindIdQuestion';

const findid = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <FindId />
            <FindIdQuestion />
        </div>
    );
};

export default findid;