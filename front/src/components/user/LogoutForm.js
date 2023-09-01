import { useContext } from 'react';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import { useGlobalState } from '../../context/UiContext.js';
import './LogoutForm.css';
import Button from '../common/form/Button.js';



const LogoutForm = () => {
    const { logoutUser } = UserRequest();
    const { dispatch } = useContext(UserContext);
    const { setPopopen } = useGlobalState();
    
    const handleLogout = async () => {
      try {
        dispatch({ type: "LOADING", loadingMessage: "로그아웃 중.." })
        await logoutUser();
        setPopopen(false);
      } catch(err) {
        console.log(err)
      }
    };

    return <Button onClick={handleLogout} className={'button_type3'}>로그아웃</Button>
  
};

export default LogoutForm;