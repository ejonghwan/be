import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import { useInput } from '../common/hooks/index.js'
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import UserRequest from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'
import { statusCode, passwordChecked } from '../../utils/utils.js'
import { HiOutlineShieldExclamation } from "react-icons/hi2";
import SuccessMsg from '../common/successMsg/SuccessMsg.js';
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import Button from '../common/form/Button.js';
import Spinners from '../common/spinners/Spinners.js';


const UserPasswordEdit = ({ prevPasswordCheck, userId  }) => {
    const { prevPasswordEditUser, findPasswordEditUser, logoutUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const [prevPassword, handlePrevPassword, setPrevPassword] = useInput('') 
    const [newPassword, handleNewPassword, setNewPassword] = useInput('') 
    const [newPasswordCheck, handleNewPasswordCheck, setNewPasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false) 
    
    // 유효성 검사
    const [passwordProtected, setPasswordProtected] = useState(null);
    const [prevPasswordMatched, setPrevPasswordMatched] = useState(null);
    const [submitActive, setSubmitActive] = useState(false);


    // 인증이 모두 true인지
    useEffect(() => {
        newPassword === newPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
        if(prevPassword && newPassword && newPasswordCheck && passwordIsChecked && passwordProtected && !prevPasswordMatched) setSubmitActive(true)
        if(!prevPasswordCheck && newPassword && newPasswordCheck && passwordIsChecked && passwordProtected && !prevPasswordMatched) setSubmitActive(true)
    }, [prevPasswordCheck, newPasswordCheck, prevPassword, newPassword, newPasswordCheck, passwordIsChecked, passwordProtected, prevPasswordMatched])


    // 요청
    const handlePasswordEditSubmit = useCallback(async e => {
        e.preventDefault();
        prevPasswordCheck ? prevPasswordEdit() : newPasswordEdit();
    }, [prevPasswordCheck, prevPassword, newPassword, state, passwordIsChecked, prevPasswordMatched])


    // 기존 비번 바꾸기
    const prevPasswordEdit = _debounce(async() => {
        try {   
            if(!prevPassword || !newPassword || !state.user || !passwordIsChecked) throw new Error('정보 확인해주세요');
            dispatch({ type: "USER_PASSWORD_EDIT_REQUEST" })
            console.log('view', state.user._id)
            const user = await prevPasswordEditUser({
                prevPassword, 
                newPassword, 
                newPasswordCheck,
                _id: state.user?._id
            });
            if(statusCode(user.status, 2)) { // 성공시
                setPrevPassword('')
                setNewPassword('')
                setNewPasswordCheck('')
                alert('비밀번호가 변경 되었습니다. 다시 로그인해주세요.')
                logoutUser()
                navigate('/login')
                return;
            }
        } catch(err) {
            console.error(err)
        }
    }, 500)


    // 비번 찾기
    const newPasswordEdit = _debounce(async() => {
        try {   
            if(!userId && !newPassword && !state && !passwordIsChecked) return console.error('정보 확인해주세요');
            // dispatch({ type: "USER_PASSWORD_EDIT_REQUEST" })
            const user = await findPasswordEditUser({
                newPassword, 
                newPasswordCheck,
                _id: userId
            });
            if(user.data.matched) return setPrevPasswordMatched(true);
            if(statusCode(user.status, 2)) { // 성공시
                // 완료되면 로그인페이지로 
                setNewPassword('')
                setNewPasswordCheck('')
                alert('비밀번호가 새로 설정되었습니다')
                navigate('/')
            }

        } catch(err) {
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: err.err })
            console.error(err)
        }
    }, 500)

    useEffect(() => {
        passwordChecked(newPassword) === true ? setPasswordProtected(true) : setPasswordProtected(false);
        prevPassword && prevPassword === newPassword ? setPrevPasswordMatched(true) : setPrevPasswordMatched(false);
    }, [prevPassword, newPassword])


    useEffect(() => {
        return () => {
            prevPasswordEdit.cancel();
            newPasswordEdit.cancel();
        }
    }, [])


    return (
        <div className='form_wrap'>
            <h3 className='form_title gap_20'>
                <HiOutlineShieldExclamation />
                <strong>새 비밀번호 설정</strong>
            </h3>
            <SuccessMsg className={"success_type align_l gap_20"}>
                아이디는 <i className='check_txt'>{state.user?.id }</i> 입니다.
            </SuccessMsg>
             <form onSubmit={handlePasswordEditSubmit}>
                {prevPasswordCheck && (
                    // props prevPassword가 true여야 얘 보임
                     <div className='gap_20'>
                        <Label htmlFor="prevPassword" content="이전 비밀번호" className={"label_type1"} />
                        <Input  
                            id="prevPassword" 
                            type="password" 
                            required={true} 
                            placeholder="현재 비밀번호를 입력해주세요." 
                            className={"input_type1"} 
                            name="prevPassword" 
                            value={prevPassword} 
                            evt="onChange" 
                            onChange={handlePrevPassword} 
                        />
                    </div>
                )}
                <div className='gap_20'>
                    <Label htmlFor="newPassword" content="새로운 비밀번호" className={"label_type1"} />
                    <Input  
                        id="newPassword" 
                        type="password" 
                        required={true} 
                        placeholder="새로 설정할 비밀번호를 입력해주세요." 
                        className={"input_type1"} 
                        name="newPassword" 
                        value={newPassword} 
                        evt="onChange" 
                        onChange={handleNewPassword} 
                    />
                    <div>
                        {passwordProtected ? (
                            <SuccessMsg className={"success_type3 align_l gapt_10"}>
                                안전한 비밀번호입니다.
                            </SuccessMsg>
                        ) : (
                            <ErrorMsg className={'error_type3 gapt_10'}>
                                8~16글자에 숫자와 특수문자를 조합해주세요.
                            </ErrorMsg>
                        )}
                        {/* {prevPasswordMatched && (
                            <p style={{color: "red"}}>이전 비밀번호와 같습니다[x]</p>
                        )} */}
                        {/* <div className='align_c gapt_30'>
                            <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                {state.changeUserPasswordError &&  <p>{state.changeUserPasswordError}</p>}
                            </ErrorMsg>
                        </div> */}
                    </div>
                </div>
              
                <div className='gap_20'>
                    <Label htmlFor="newPasswordCheck" content="새로운 비밀번호 확인" className={"label_type1"} />
                    <Input 
                        id="newPasswordCheck" 
                        type="password" 
                        required={true} 
                        placeholder="위에 입력한 비밀번호를 다시 입력해주세요." 
                        className={"input_type1"}
                        name="newPasswordCheck" 
                        value={newPasswordCheck} 
                        evt="onChange" 
                        onChange={handleNewPasswordCheck} 
                    />
                    {newPasswordCheck && (
                        <div>
                          {passwordIsChecked ? (
                              <SuccessMsg className={"success_type3 align_l gapt_10"}>
                                  새 비밀번호와 같습니다.
                              </SuccessMsg>
                          ) : (
                              <ErrorMsg className={'error_type3 gapt_10'}>
                                새 비밀번호가 같지 않습니다. 다시 확인해주세요.
                              </ErrorMsg>
                          )}
                      </div>
                    )}
                </div>
                <div className={`${submitActive ? 'checked' : 'none'} align_c gapt_30`}>
                    <Button className={'button_type2'} disabled={submitActive ? false : true}>
                        비밀번호 변경
                    </Button>
                    {prevPasswordMatched && (
                        <ErrorMsg className={'error_type3 gapt_15'}>
                            변경하기 전의 비밀번호와 같습니다. <br />다른 비밀번호로 입력해주세요.
                        </ErrorMsg>
                    )}
                </div>
               
            </form>
            <div className='align_c gapt_30'>
                {state.changeUserPasswordError && (
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        <p>{state.changeUserPasswordError}</p>
                    </ErrorMsg>
                )}
            </div>
            {state.changeUserPasswordLoading && <Spinners full={false} />}
        </div>
    )
}


export default UserPasswordEdit;