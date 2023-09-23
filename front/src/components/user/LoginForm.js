import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import { useInput } from '../common/hooks/index.js'
import { statusCode } from '../../utils/utils.js'
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import { UserContext } from '../../context/UserContext.js'
import UserRequest from '../../reducers/UserRequest.js'
import Button from '../common/form/Button.js';
import './LoginForm.css';
import Spinners from '../common/spinners/Spinners.js';


const LoginForm = () => {

    const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('')

    const { loginUser, logoutUser } = UserRequest();
    const {state, dispatch} = useContext(UserContext)
    const navigate  = useNavigate();
    const location = useLocation();

    const handleSubmit = async e => {
        e.preventDefault();
        submit();
    }


    const submit =_debounce(async () => {
        try {
            dispatch({ type: "USER_LOGIN_REQUEST" })
            const user = await loginUser({ id: userId, password: userPassword })
            if(statusCode(user.status, 2)) {
                setUserId('')
                setUserPassword('')
                
                if(location.pathname === '/login') navigate('/'); // 로그인 창에선 메인으로
               
            }
        } catch(err) {
            console.error('catch?', err)
        }
    }, 500)


    return (
        <div className="form_wrap">
            {state.loginUserLoading ? (<Spinners />) : (
                <form onSubmit={handleSubmit}>
                    <div className='gap_20'>
                        <Label htmlFor="userId" content="아이디" className={"label_type1"}/>
                        <Input  
                            id="userId" 
                            type="text" 
                            required={true} 
                            placeholder="아이디를 입력해주세요." 
                            className={"input_type1"}
                            name="userId" 
                            value={userId} 
                            evt="onChange" 
                            onChange={handleUserId} 
                        />
                    </div>
                    <div className='gap_20'>
                        <Label htmlFor="userPassword" content="비밀번호" className={"label_type1"}/>
                        <Input  
                            id="userPassword" 
                            type="password" 
                            required={true} 
                            placeholder="비밀번호를 입력해주세요." 
                            className={"input_type1"}
                            name="userPassword" 
                            value={userPassword} 
                            evt="onChange" 
                            onChange={handlePassword} 
                        />
                    </div>
                    <div className='align_c gapt_40'>
                        <Button className={'button_type2'}>로그인</Button>
                    </div>
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>{state.loginUserError}</ErrorMsg>
                </form>
            )}
        </div>
    );
};

export default LoginForm;