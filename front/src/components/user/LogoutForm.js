import { useContext } from 'react';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import { Link } from 'react-router-dom'
import './LogoutForm.css';
import Button from '../common/form/Button.js';



const LogoutForm = () => {
    const { logoutUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext)
    
    const handleLogout = async () => {
      try {
        dispatch({ type: "LOADING", loadingMessage: "로그아웃 중.." })
        const user = await logoutUser();
      } catch(err) {
        console.err(err)
      }
    };


    return (
        <div className='logout_form'>
            <span>{state.user?.name} 님</span>
            <div><Link to="/profile">프로필</Link></div>
            <Button onClick={handleLogout}>로그아웃</Button>
        </div>
    );
};

export default LogoutForm;