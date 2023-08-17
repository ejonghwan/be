import FindId from '../components/user/FindId';
import FindIdQuestion from '../components/user/FindIdQuestion';

const findid = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <h3>아이디로 찾기</h3>
            <FindId />
            <h3>질문/답으로 찾기</h3>
            <FindIdQuestion />
        </div>
    );
};

export default findid;