import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce';
// import jwt from 'jsonwebtoken';


// module
import { useInput } from '../common/hooks/index.js'

// util
import { statusCode } from '../../utils/utils.js'
import './LoginForm.css';

// components
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import LoginUserInfo from './LoginUserInfo.js';

// context
import { UserContext } from '../../context/UserContext.js'
// import { loginUser, logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'


const LoginForm = () => {

    const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('')

    const { loginUser, logoutUser } = UserRequest();
    const {state, dispatch} = useContext(UserContext)

    const handleSubmit = async e => {
        e.preventDefault();
        submit();
    }


    const submit = useMemo(() => _debounce(async () => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "로그인 중.." })
            const user = await loginUser({ id: userId, password: userPassword })
            console.log('0000???????????????', user.status, statusCode(user.status, 2))
            if(statusCode(user.status, 2)) {
                setUserId('')
                setUserPassword('')
                // cookie 시간과 맞춰서 로그아웃
                setTimeout(async () => {
                    await logoutUser();
                }, 7200000)
                /*
                    문제점 
                    setTimeout이 끝나기전에 브라우저를 종료하면 로그아웃이 안됨... 
                    근데 어차피 back에서 보내준 http 쿠키는 만료가 될거고 
                    로컬저장소에 저장된 토큰은 못쓰게 될테니 load api가 실패해도 문제는 없음..
                */
                

            }
        } catch(err) {
            console.error('catch?', err)
        }
    }, 500), [userId, userPassword])


 
    useEffect(() => {
        return () => {
         submit.cancel();
        }
     }, [userId, userPassword])
  



    // 이거 꼭 기억하자;;
    // const dd = _debounce(() => {
    //     return console.log(1111)
    // })

    // const fn = (e) => {

    
    //     e.preventDefault();
    //     console.log(e)
    //     dd();
    // }
 



    return (
        <Fragment>
            {state.isLogged ? (<LoginUserInfo />) : (
                 <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="userId" content="아이디" classN="label_t1"/>
                        <Input  
                            id="userId" 
                            type="text" 
                            required={true} 
                            placeholder="id" 
                            classN="input_text_t1" 
                            name="userId" 
                            value={userId} 
                            evt="onChange" 
                            onChange={handleUserId} 
                        />
                    </div>
                    <div>
                        <Label htmlFor="userPassword" content="비밀번호" classN="label_t1"/>
                        <Input  
                            id="userPassword" 
                            type="password" 
                            required={true} 
                            placeholder="password" 
                            classN="input_text_t1"
                            name="userPassword" 
                            value={userPassword} 
                            evt="onChange" 
                            onChange={handlePassword} 
                        />
                        <button>view password</button>
                    </div>
                    <button type="submit">로그인</button>
                    <p style={{color: "red"}}>{state.loginErrorMessage}</p>
                </form>
            )}
        </Fragment>
    );
};

export default LoginForm;