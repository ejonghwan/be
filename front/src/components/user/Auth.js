import React, { useState, useCallback, useEffect, Fragment, useContext, useMemo } from 'react';
import _debounce from 'lodash.debounce'
import { useInput } from '../common/hooks/index'
import Input from '../common/form/Input'
import Label from '../common/form/Label'
import Button from '../common/form/Button'
import { UserContext } from '../../context/UserContext'
// import { emailAuth } from '../../reducers/UserRequest'
import UserRequest from '../../reducers/UserRequest'
import { statusCode } from '../../utils/utils'


const Auth = () => {

    const { emailAuth } = UserRequest();
    const {state, dispatch} = useContext(UserContext);

    const [email, handleEmail] = useInput('');
    const [authState, setAuthState] = useState(false);

    const handleAuthMailSubmit = e => {
        e.preventDefault();
        authMail();
    }
    const authMail = useMemo(() => _debounce(async e => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "인증메일 보내는 중.." })
            const res = await emailAuth({ email: email })
            if(statusCode(res.status, 2)) return setAuthState(true);
        } catch(err) {
            console.error(err)
        }
    }, 500), [email])




    useEffect(() => {
        return () => {
            authMail.cancel();
        }
    }, [])


    return (
        <Fragment>
            {!authState ? (
                <form onSubmit={handleAuthMailSubmit}>
                <div>
                    <Label htmlFor="email" content="email" classN="label_t1"/>
                    <Input  
                        id="email" 
                        className={'input_type1'}
                        type="email" 
                        required={true} 
                        placeholder="email" 
                        classN="input_text_t1" 
                        name="email" 
                        value={email} 
                        evt="onChange" 
                        onChange={handleEmail} 
                    />
                </div>
                <Button className={"button_type1"}>인증메일 보내기</Button>
            </form>
            ) : (
            <div>
                메일이 발송되었습니다<br />
            </div>
        )}
         {state.authNumberErrorMessage && <span>{state.authNumberErrorMessage}</span>}<br />
        </Fragment>
    )
}


export default Auth;