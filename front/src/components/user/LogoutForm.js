import { Fragment, useContext } from 'react';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import { useGlobalState } from '../../context/UiContext.js';
import './LogoutForm.css';
import Button from '../common/form/Button.js';
import Spinners from '../common/spinners/Spinners.js';



const LogoutForm = () => {
    const { logoutUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext);
    const { setMenuOpen } = useGlobalState();
    
    const handleLogout = async () => {
      try {
        dispatch({ type: "USER_LOGOUT_REQUEST"})
        await logoutUser();
        setMenuOpen(false);
      } catch(err) {
        console.log(err)
      }
    };

    return (
        <Fragment>
            {state.logoutUserLoading ? (<Spinners />) : (
              <Button onClick={handleLogout} className={'button_type3'}>로그아웃</Button>
            )}
        </Fragment>
      )
  
};

export default LogoutForm;