import HeadMetaTag from '../components/common/HeadMetaTag';
import FindPassword from '../components/user/FindPassword';

const findpassword = ({ page }) => {
    return (
        <div className='b_conts'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <FindPassword />
        </div>
    );
};

export default findpassword;