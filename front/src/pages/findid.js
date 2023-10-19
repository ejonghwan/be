import HeadMetaTag from '../components/common/HeadMetaTag';
import FindId from '../components/user/FindId';
import FindIdQuestion from '../components/user/FindIdQuestion';

const findid = ({ page }) => {
    return (
        <div className='b_conts'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <FindId />
            <FindIdQuestion />
        </div>
    );
};

export default findid;