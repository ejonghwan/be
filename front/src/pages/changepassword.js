import UserPasswordEdit from '../components/user/UserPasswordEdit';

const changepassword = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <UserPasswordEdit />
        </div>
    );
};

export default changepassword;