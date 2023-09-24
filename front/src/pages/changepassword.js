import UserPasswordEdit from '../components/user/UserPasswordEdit';

const changepassword = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <UserPasswordEdit prevPasswordCheck={true} />
        </div>
    );
};

export default changepassword;