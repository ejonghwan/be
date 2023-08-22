import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginUserInfo from '../user/LoginUserInfo';
import { UserContext } from '../../context/UserContext.js';
import './Header.css';

const Header = () => {
    const { state, dispatch } = useContext(UserContext);

    // 이거 새로고침에도 없어짐;; 브라우저 종료하면 로컬저장소 없애는거 해야됨
    // window.onbeforeunload = function() {
    //   localStorage.removeItem('X-access-token');
    //   return '';
    // };



    return (
        <header id='header'>
          <div className='b_conts'>
            <nav>
                <ul className='header_nav'>
                    <li><Link to="/"><h1 className='logo'>HOBBYIST.</h1></Link></li>
                    <li><Link to="/projectlist" className='hover_type1'>습관 목록</Link></li>
                    <li><Link to="/createproject" className='hover_type1'>습관 만들기</Link></li>
                    {state?.isLogged ? (
                       <Fragment>
                        <li><LoginUserInfo /></li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li><Link to="/login" className='hover_type1'>로그인</Link></li>
                        <li><Link to="/signuppage" className='hover_type1'>회원가입</Link></li>
                      </Fragment>
                    )}
                    {/* <li><Link to="/signup">signup</Link></li> */}
                    {/* <li><Link to="/style">style</Link></li> */}
                </ul>
            </nav>
            
          </div>
        </header>
    );
};

export default Header;