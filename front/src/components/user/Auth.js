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
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import SuccessMsg from '../common/successMsg/SuccessMsg';
import Spinners from '../common/spinners/Spinners';


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
            dispatch({ type: "AUTH_NUMBER_REQUEST" })
            const res = await emailAuth({ email: email })
            if(statusCode(res.status, 2)) return setAuthState(true);
        } catch(err) {
            console.error(err)
        }
    }, 500), [email])




    useEffect(() => {
        return () => authMail.cancel();
    }, [])


    return (
        <Fragment>
            {state.authNumberLoading && <Spinners full={true} />}
            {!authState ? (
                <Fragment>
                    <form onSubmit={handleAuthMailSubmit}>
                        <div>
                            <Label htmlFor="email" content="이메일" classN="label_t1"/>
                            <Input  
                                id="email" 
                                className={'input_type1 gapt_10'}
                                type="email" 
                                required={true} 
                                placeholder="인증받을 이메일을 입력해주세요." 
                                classN="input_text_t1" 
                                name="email" 
                                value={email} 
                                evt="onChange" 
                                onChange={handleEmail} 
                            />
                        </div>
                        <div className="align_c">
                            <Button className={"button_type2 gapt_30"}>인증메일 보내기</Button>
                        </div>
                    </form>
                    <ErrorMsg className={'error_type1 align_c gapt_40'}>
                        {state.authNumberError && <span>{state.authNumberError}</span>}
                    </ErrorMsg>

                    <div className="gapt_10">
                        <p>※ 회원가입을 하시려면 메일 인증을 해주세요.</p>
                    </div>
                </Fragment>
            ) : (
            <SuccessMsg className={'success_type1'}>
                <strong>인증메일이 발송되었습니다.</strong>
                <span>발송된 메일의 인증페이지로 회원가입을 진행해주세요.</span>
                <span className='gapt_5'>※ 인증된 페이지는 15분 후에 만료됩니다.</span>

            </SuccessMsg>
        )}
        </Fragment>
    )
}


export default Auth;