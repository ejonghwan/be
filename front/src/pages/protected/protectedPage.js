import LoginForm from '../../components/user/LoginForm';
import FindList from '../../components/user/FindList';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ProtectedPage = ({ page }) => {

    const {state, dispatch} = useContext(UserContext);

    return (
        <Fragment>
            {/* 로딩 중일땐 아래 jsx 안보이게 처리 */}
            {!state.loadUserLoading && (
                <div className='b_conts'>
                    <h2>{page}</h2>
                    <p className='align_c gap_50'>{page} 페이지를 보시려면 로그인해주세요.</p>
                    <LoginForm />
                    <FindList />
                </div>
            )}
        </Fragment>
    );
};

export default ProtectedPage;