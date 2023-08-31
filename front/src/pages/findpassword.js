import FindPassword from '../components/user/FindPassword';

const findpassword = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <FindPassword />
        </div>
    );
};

export default findpassword;