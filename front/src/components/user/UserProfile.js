import React, { Fragment, useState, useEffect, useCallback, useContext, useRef } from 'react';
import _debounce from 'lodash.debounce';
import { useInput } from '../common/hooks/index.js';
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';
import Timer from '../common/utils/Timer.js';
import ProfileImageEdit from '../user/ProfileImageEdit.js'
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import { stringLengthChecked, statusCode, onlyNumChecked  } from '../../utils/utils.js';
import './UserProfile.css';
import Button from '../common/form/Button.js';
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';



const UserProfile = () => {
    const { state } = useContext(UserContext);

    const [editUserInfoState, setEditUserInfoState] = useState(false);
    const [editEmailState, setEditEmailState] = useState(false);
    const [editEmailAuthState, setEditEmailAuthState] = useState(false);
   
    const [userName, handleUserName, setUserName] = useInput(state.user.name) ;
    const [userGender, handleUserGender, setUserGender] = useInput('') ;
    const [userBirthday, handleUserBirthday, setUserBirthday] = useInput(state.user.birthday);
    const [birthdayLengthChecked, setBirthdayLengthChecked] = useState(false)
    const [userPhoneNumber, handleUserPhoneNumber] = useInput(state.user.phoneNumber) ;
    const [phoneNumberLengthChecked, setPhoneNumberLengthChecked] = useState(false)
    const [userEmail, handleUserEmail, setUserEmail] = useInput(state.user.email);
    const [authNumber, handleAuthNumber, setAuthNumber] = useInput('');
    
    const { userInfoEditUser, emailEditUser, memberAuthNumberRequest } = UserRequest();
    const [timerNumber, setTimerNumber] = useState(false);

    // const womanRef = useRef(null) 
    // const manRef = useRef(null) 

    const handleToggle = useCallback(e => {
        const { name } = e.target;
        if(name === "userInfo") return setEditUserInfoState(!editUserInfoState);
        if(name === "email") return setEditEmailState(!editEmailState);
        if(name === "emailAuth") { //인증 수정 취소
            setEditEmailAuthState(!editEmailAuthState);
            setEditEmailState(!editEmailState);
            setUserEmail('');
            setTimerNumber(false);
        };
    }, [editUserInfoState, editEmailState, editEmailAuthState, setUserEmail]);



    // 이메일 수정 인증번호 요청 
    const handleEmailAuth = e => {
        e.preventDefault();
        emailAuth();
    };
    const emailAuth = _debounce(async e => {
        try {
            const res = await memberAuthNumberRequest({ email: userEmail, _id: state.user._id });
            if(statusCode(res.status, 2)) { setEditEmailAuthState(true); }
        } catch(err) {
            console.error(err);

        };
    }, 500)


    // 이메일 수정 요청  
    const handleEmailEdit = e => {
        e.preventDefault();
        emailEdit();
    }
    const emailEdit = _debounce(async () => {
        try {
            const res = await emailEditUser({ email: userEmail, _id: state.user._id, authNumber: authNumber })
            if(statusCode(res.status, 2)) {
                setEditEmailState(!editEmailState);
                setEditEmailAuthState(!editEmailAuthState);
                setAuthNumber('')
                alert(`이메일이 ${userEmail}으로 변경되었습니다!`)
            }
        } catch(err) {
            console.error(err);
        }
    }, 500)

    
    // 회원정보 수정 요청
    const handleUserInfoEdit = e => {
        e.preventDefault();
        userInfo();
    };
    const userInfo = _debounce(async() => {
        try {
            const userInfo = {
                name: userName, 
                gender: userGender,
                birthday: userBirthday,
                phoneNumber: userPhoneNumber,
                _id: state.user._id
            }
            await userInfoEditUser(userInfo);
            setEditUserInfoState(!editUserInfoState);
            alert('정보가 변경되었습니다.')
        } catch(err) {
            console.error(err);
        };
    }, 500)


    useEffect(() => {
        userPhoneNumber && onlyNumChecked(userPhoneNumber) ? setPhoneNumberLengthChecked(false) : setPhoneNumberLengthChecked(true)
    }, [userPhoneNumber]);

    useEffect(() => {
        userBirthday && stringLengthChecked(userBirthday, 8) ? setBirthdayLengthChecked(false) : setBirthdayLengthChecked(true)
    }, [userBirthday]);

    // useEffect(() => {
    //     if(state.user.gender === '남') {
    //         setUserGender(manRef.current && manRef.current.defaultValue); //radio value
    //         manRef.current && manRef.current.setAttribute('checked', true);
    //     } else {
    //         setUserGender(womanRef.current && womanRef.current.defaultValue); //radio value
    //         womanRef.current && womanRef.current.setAttribute('checked', true)
    //     }
    // }, [editUserInfoState]);


    

    return (
        <div className='form_wrap'>
            <ProfileImageEdit />
            <ul className='Profile_info_wrap'>
                <li>
                {editEmailState ? (
                    <Fragment>
                        <form onSubmit={handleEmailAuth}>
                            <div className='update_form'>
                                <Label htmlFor="userEmail" content="이메일" className={"label_type1"}/>
                                <Input 
                                    id="userEmail" 
                                    type="email" 
                                    required={true} 
                                    placeholder={state.user.email}
                                    className={"input_type1"}
                                    name="userEmail" 
                                    value={userEmail} 
                                    evt="onChange" 
                                    onChange={handleUserEmail} 
                                    disabled={editEmailAuthState && true}
                                />
                            </div>
                            {!editEmailAuthState ? (
                                <div className='align_l gapt_10 btn'>
                                    <Button className={'button_type2'} name="email">이메일 인증</Button>
                                    <Button className={'button_type_cancel'} type="button" name="email" onClick={handleToggle}>취소</Button>
                                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                        {state.mailAuthErrorMessage && <p> {state.mailAuthErrorMessage}</p>}
                                    </ErrorMsg>
                                </div>
                            ) : (
                                <div className='align_l gapt_10 btn'>
                                    <p>메일로 인증번호가 발송되었습니다</p>
                                    <Button className={'button_type_cancel gapt_10'} type="button" name="emailAuth" onClick={handleToggle}>취소</Button>
                                </div>
                            )}
                        </form>

                        {/* 인증 메일 보냈을 시 */}
                        {editEmailAuthState && (
                            <div className='align_l gapt_30 btn'>
                                <form onSubmit={handleEmailEdit}>
                                    <div className='flex gap_10'>
                                        <Label htmlFor="authNumber" content="인증번호 입력" className={"label_type1"}/>
                                        <Timer  
                                            endSecond={180} 
                                            startingPoint={180} 
                                            countingName={''} 
                                            endMessage={'인증시간이 만료되었습니다'}
                                            callback={() => setTimerNumber(true)}
                                        />
                                    </div>
                                    <Input 
                                        id="authNumber" 
                                        type="text" 
                                        required={true} 
                                        placeholder="인증번호를 입력 해주세요."
                                        className={"input_type1"}
                                        name="authNumber" 
                                        value={authNumber} 
                                        evt="onChange" 
                                        onChange={handleAuthNumber} 
                                        disabled={!timerNumber ? false : true}
                                    />
                                    <Button className={'button_type2 gapt_10'} onClick={handleToggle} disabled={!timerNumber ? false : true} >이메일 변경</Button>
                                </form>
                                {state.mailEditErrorMessage && 
                                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                        {state.mailEditErrorMessage}
                                    </ErrorMsg>
                                }
                            </div>
                        )}
                        
                       </Fragment>
                    ) : (
                        <Fragment>
                            <strong className='Profile_info_tit'>이메일</strong> 
                            <div className='Profile_info_cont'>
                                <span>{state.user.email}</span>
                                <Button className={'button_type_txt'} name="email" onClick={handleToggle}>
                                    이메일 수정
                                </Button>
                            </div>
                        </Fragment>
                    ) }
                    
                </li>
                <li>
                    <strong className='Profile_info_tit'>아이디</strong>
                    <div className='Profile_info_cont'>
                        {state.user.id}
                    </div>
                </li>
                {editUserInfoState ? (
                    <li>
                        <form onSubmit={handleUserInfoEdit}>
                            <ul className='Profile_info_wrap'>
                                <li>
                                    <strong className='Profile_info_tit'>
                                        <Label htmlFor="userName" content="이름" className={"label_type1 gap_0"}/>
                                    </strong>
                                    <div className='Profile_info_cont'>
                                        <Input 
                                            id="userName" 
                                            type="text" 
                                            required={true} 
                                            placeholder={state.user.name}
                                            className={"input_type1"}
                                            name="userName" 
                                            value={userName} 
                                            evt="onChange" 
                                            onChange={handleUserName} 
                                        />
                                    </div>
                                </li>
                                <li>
                                    <strong className='Profile_info_tit'>성별</strong>
                                    <div className='Profile_info_cont gender_wrap'>
                                        <div className='gender_item'>
                                            <Label htmlFor="man" content="남자" className={"label_type1 gap_0"}/>
                                            <Input 
                                                id="man" 
                                                type="radio" 
                                                required={true} 
                                                className={"input_type1"} 
                                                name="gender" 
                                                value="남" 
                                                evt="onChange" 
                                                onChange={handleUserGender} 
                                                // ref={manRef}
                                                // checked={state.user.gender === '남' ? true : false}
                                                // 이거 수정할떄 체크안됨 
                                            />
                                        </div>
                                        <div className='gender_item'>
                                            <Label htmlFor="woman" content="여자" className={"label_type1 gap_0"}/>
                                            <Input 
                                                id="woman" 
                                                type="radio" 
                                                required={true} 
                                                className={"input_type1"} 
                                                name="gender" 
                                                value="여" 
                                                evt="onChange" 
                                                onChange={handleUserGender}
                                                // ref={womanRef} 
                                                // checked={state.user.gender === '여' ? true : false}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <strong className='Profile_info_tit'>
                                        <Label htmlFor="userBirthday" content="생일" className={"label_type1 gap_0"}/>
                                    </strong>
                                    <div className='Profile_info_cont'>
                                        <Input 
                                            id="userBirthday" 
                                            type="text" 
                                            required={true} 
                                            placeholder={state.user.birthday}
                                            className={"input_type1"}  
                                            name="userBirthday" 
                                            value={userBirthday} 
                                            evt="onChange" 
                                            onChange={handleUserBirthday} 
                                        />
                                          {birthdayLengthChecked && (
                                                <ErrorMsg className={'error_type3'}>
                                                    생일은 8자리로 입력해주세요. ex)19870907
                                                </ErrorMsg>
                                            )}
                                    </div>
                                </li>
                                <li>
                                    <strong className='Profile_info_tit'>
                                        <Label htmlFor="phoneNumber" content="휴대폰번호" className={"label_type1 gap_0"}/>
                                    </strong>
                                    <div className='Profile_info_cont'>
                                        <Input 
                                            id="phoneNumber" 
                                            type="text" 
                                            required={true} 
                                            placeholder={state.user.phoneNumber}
                                            className={"input_type1"}  
                                            name="phoneNumber" 
                                            value={userPhoneNumber} 
                                            evt="onChange" 
                                            onChange={handleUserPhoneNumber} 
                                        />
                                        {phoneNumberLengthChecked && (
                                            <ErrorMsg className={'error_type3'}>
                                                휴대폰 번호는 -없이 숫자만 입력해주세요.
                                            </ErrorMsg>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <strong className='Profile_info_tit'>가입일</strong>
                                    <div className='Profile_info_cont'>
                                        {state.user.createdAt}
                                    </div>
                                </li>
                                <li>
                                    <strong className='Profile_info_tit'>수정일</strong>
                                    <div className='Profile_info_cont'>
                                        {state.user.updatedAt}
                                    </div>
                                </li>
                            </ul>
                            <div className='align_c gapt_30 btn_wrap'>
                                <Button className={'button_type2'} name={'userInfo'} onClick={handleUserInfoEdit} disabled={ !userName || !userGender || !userBirthday || !userPhoneNumber || birthdayLengthChecked || phoneNumberLengthChecked}>개인정보 변경</Button>
                                <Button className={'button_type_cancel'} name={'userInfo'} onClick={handleToggle} type="button">취소</Button>
                            </div>
                        </form>
                    </li>
                ) : (
                    <Fragment>
                        <li>
                            <strong className='Profile_info_tit'>이름</strong>
                            <div className='Profile_info_cont'>
                                {state.user.name}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>성별</strong>
                            <div className='Profile_info_cont'>
                                {state.user.gender}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>생일</strong>
                            <div className='Profile_info_cont'>
                                {state.user.birthday}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>생일</strong>
                            <div className='Profile_info_cont'>
                                {state.user.phoneNumber}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>가입일</strong>
                            <div className='Profile_info_cont'>
                                {state.user.createdAt}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>수정일</strong>
                            <div className='Profile_info_cont'>
                                {state.user.updatedAt}
                            </div>
                            <div className='align_c gapt_30 btn_wrap'>
                                <Button className={'button_type2'} name={'userInfo'} onClick={handleToggle} >
                                    개인정보 수정
                                </Button>
                            </div>
                        </li>
                    </Fragment>
                )}
            </ul>
        </div>
    )
}


export default UserProfile;