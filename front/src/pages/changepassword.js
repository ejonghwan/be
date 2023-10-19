import HeadMetaTag from '../components/common/HeadMetaTag';
import UserPasswordEdit from '../components/user/UserPasswordEdit';

const changepassword = ({ page }) => {
    return (
        <div className='b_conts'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <UserPasswordEdit prevPasswordCheck={true} />
        </div>
    );
};

export default changepassword;