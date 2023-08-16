import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginUserInfo from '../user/LoginUserInfo';
import LogoutForm from '../../components/user/LogoutForm.js';

// import { logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import './Header.css';

const Header = () => {
    const { logoutUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext)
    
    const handleLogout = async () => {
      try {
        dispatch({ type: "LOADING", loadingMessage: "로그아웃 중.." })
        const user = await logoutUser();
      } catch(err) {
        console.err(err)
      }
    }


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
                    <li><Link to="/"><h1 className='logo'>HOBBYIST</h1></Link></li>
                    <li><Link to="/about">내 프로젝트</Link></li>
                    <li><Link to="/profile">프로필</Link></li>
                    {state?.isLogged ? (
                       <Fragment>
                        <li><LoginUserInfo /></li>
                        {/* <li><LogoutForm /></li> */}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
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