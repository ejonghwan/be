import { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginUserInfo from '../user/LoginUserInfo';
import { UserContext } from '../../context/UserContext.js';
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import Button from './form/Button';
import Popup from './popup/Popup';
import SearchProject from '../project/SearchProject';
import './Header.css';


const Header = () => {
    const { state } = useContext(UserContext);
    const searchProjectRef = useRef(null);

    const handleSearchProject = () => searchProjectRef.current.popupOpen();

    return (
        <header id='header'>
          <div className='b_conts'>
            <nav>
                <ul className='header_nav'>
                    <li><Link to="/"><h1 className='logo'>HOBBYIST.</h1></Link></li>
                    <li>
                      <Button className={'button_type4 ico_hover_type1'} onClick={handleSearchProject}>
                        <PiMagnifyingGlassDuotone />
                        <span className='blind'>검색</span>
                      </Button>
                    </li>
                    <li><Link to="/project/list" className='hover_type1'>습관 목록</Link></li>
                    <li><Link to="/project/create" className='hover_type1'>습관 만들기</Link></li>
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
                </ul>
            </nav>
            
          </div>

          <Popup 
              className={`popup_type_default search_project`} 
              isHead={true} 
              title={`습관 검색`} 
              closeClick={() => searchProjectRef.current.popupClose()} 
              dimd={true}  
              ref={searchProjectRef}
          >
              <SearchProject searchProjectRef={searchProjectRef}/>
          </Popup>

          
        </header>
    );
};

export default Header;