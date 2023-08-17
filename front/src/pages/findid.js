import FindId from '../components/user/FindId';
import FindIdQuestion from '../components/user/FindIdQuestion';

const findid = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <FindId />
            <br />
            <br />
            <FindIdQuestion />
        </div>
    );
};

export default findid;