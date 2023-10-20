import LoginForm from '../../components/user/LoginForm';
import FindList from '../../components/user/FindList';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import HeadMetaTag from '../../components/common/HeadMetaTag';

const ProtectedPage = ({ page }) => {

    const {state} = useContext(UserContext);

    return (
        <Fragment>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            {/* 로딩 중일땐 아래 jsx 안보이게 처리 */}
            {!state.loadUserLoading && (
                <div className='b_conts'>
                    <h2>{page}</h2>
                    <p className='align_c gap_50 gapt_50'>{page} 페이지를 보시려면 로그인해주세요.</p>
                    <div className='gap_50'>
                        <LoginForm />
                    </div>
                    <FindList />
                </div>
            )}
        </Fragment>
    );
};

export default ProtectedPage;