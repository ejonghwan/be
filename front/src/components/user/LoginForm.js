import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import { useInput } from '../common/hooks/index.js'

import { statusCode } from '../../utils/utils.js'

import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import LoginUserInfo from './LoginUserInfo.js';

// context
import { UserContext } from '../../context/UserContext.js'
// import { loginUser, logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'

import './LoginForm.css';
import Button from '../common/form/Button.js';


const LoginForm = () => {

    const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('')

    const { loginUser, logoutUser } = UserRequest();
    const {state, dispatch} = useContext(UserContext)
    const navigate  = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        submit();
    }


    const submit =_debounce(async () => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
            const user = await loginUser({ id: userId, password: userPassword })
            if(statusCode(user.status, 2)) {
                setUserId('')
                setUserPassword('')
                navigate('/')
                // cookie 시간과 맞춰서 로그아웃
                setTimeout(async () => {
                    await logoutUser();
                }, 7200000)
            }
        } catch(err) {
            console.error('catch?', err)
        }
    }, 500)


    return (
        <div className="form_wrap">
             <form onSubmit={handleSubmit}>
                <div className='gap_20'>
                    <Label htmlFor="userId" content="아이디" className={"label_type1"}/>
                    <Input  
                        id="userId" 
                        type="text" 
                        required={true} 
                        placeholder="id" 
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
                        placeholder="password" 
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
                <ErrorMsg className={'error_type1 align_c gapt_30'}>{state.loginErrorMessage}</ErrorMsg>
                
            </form>
        </div>
    );
};

export default LoginForm;