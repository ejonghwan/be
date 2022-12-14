import React, { Fragment, useState, useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import _debounce from 'lodash.debounce';

// module
import { useInput } from '../common/hooks/index.js';

// components
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';
import Timer from '../common/utils/Timer.js';
import ProfileImageEdit from '../user/ProfileImageEdit.js'

// context & request 
// import  { userInfoEditUser, emailEditUser, memberAuthNumberRequest } from '../../reducers/UserRequest.js';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';

// util
import { stringLengthChecked, statusCode  } from '../../utils/utils.js';



const UserProfile = () => {
    const [editUserInfoState, setEditUserInfoState] = useState(false);
    const [editEmailState, setEditEmailState] = useState(false);
    const [editEmailAuthState, setEditEmailAuthState] = useState(false);
    
    const [userName, handleUserName, setUserName] = useInput('') ;
    const [userGender, handleUserGender, setUserGender] = useInput('') ;
    const [userBirthday, handleUserBirthday, setUserBirthday] = useInput('');
    const [birthdayLengthChecked, setBirthdayLengthChecked] = useState(false)
    const [userPhoneNumber, handleUserPhoneNumber] = useInput('') ;
    const [phoneNumberLengthChecked, setPhoneNumberLengthChecked] = useState(false)
    const [userEmail, handleUserEmail, setUserEmail] = useInput('');
    const [authNumber, handleAuthNumber, setAuthNumber] = useInput('');
    
    const { userInfoEditUser, emailEditUser, memberAuthNumberRequest } = UserRequest();
    const {state, dispatch} = useContext(UserContext);

    const [timerNumber, setTimerNumber] = useState(false);

    const womanRef = useRef(null) 
    const manRef = useRef(null) 

    const handleToggle = useCallback(e => {
        const { name } = e.target;
        if(name === "userInfo") return setEditUserInfoState(!editUserInfoState);
        if(name === "email") return setEditEmailState(!editEmailState);
        if(name === "emailAuth") { //?????? ?????? ??????
            setEditEmailAuthState(!editEmailAuthState);
            setEditEmailState(!editEmailState);
            setUserEmail('');
            setTimerNumber(false);
        };
    }, [editUserInfoState, editEmailState, editEmailAuthState]);



    // ????????? ?????? ???????????? ?????? 
    const handleEmailAuth = e => {
        e.preventDefault();
        emailAuth();
    };
    const emailAuth = useMemo(() => _debounce(async e => {
        try {
            const res = await memberAuthNumberRequest({ email: userEmail, _id: state.user._id });
            if(statusCode(res.status, 2)) { setEditEmailAuthState(true); }
        } catch(err) {
            console.error(err);
        };
    }, 500), [userEmail, timerNumber]);
    // ????????? ?????? ???????????? ?????? 


    // ????????? ?????? ??????  
    const handleEmailEdit = e => {
        e.preventDefault();
        emailEdit();
    }
    const emailEdit = useMemo(() => _debounce(async () => {
        try {
            const res = await emailEditUser({ email: userEmail, _id: state.user._id, authNumber: authNumber })
            if(statusCode(res.status, 2)) {
                setEditEmailState(!editEmailState);
                setEditEmailAuthState(!editEmailAuthState);
            }
        } catch(err) {
            console.error(err);
        }
    },500), [userEmail, authNumber]);
    // ????????? ?????? ??????  

    
    // ???????????? ?????? ??????
    const handleUserInfoEdit = e => {
        e.preventDefault();
        userInfo();
    };
    const userInfo = useMemo(() => _debounce(async() => {
        try {
            const userInfo = {
                name: userName, 
                gender: userGender,
                birthday: userBirthday,
                phoneNumber: userPhoneNumber,
                _id: state.user._id
            }
            const res = await userInfoEditUser(userInfo);
            setEditUserInfoState(!editUserInfoState);
        } catch(err) {
            console.error(err);
        };
    }), [userName, userGender, userBirthday, userPhoneNumber]);
    // ???????????? ?????? ??????


    useEffect(() => {
        userPhoneNumber && stringLengthChecked(userPhoneNumber, 11) ? setPhoneNumberLengthChecked(false) : setPhoneNumberLengthChecked(true)
    }, [userPhoneNumber]);

    useEffect(() => {
        userBirthday && stringLengthChecked(userBirthday, 8) ? setBirthdayLengthChecked(false) : setBirthdayLengthChecked(true)
    }, [userBirthday]);

    useEffect(() => {
        if(state.user.gender === '???') {
            setUserGender(manRef.current && manRef.current.defaultValue); //radio value
            manRef.current && manRef.current.setAttribute('checked', true);
        } else {
            setUserGender(womanRef.current && womanRef.current.defaultValue); //radio value
            womanRef.current && womanRef.current.setAttribute('checked', true)
        }
    }, [editUserInfoState]);


    

    return (
        <Fragment>
            <div>?????????</div>
            <ul>
            <li>
                {/* ?????? / ????????? stat?????? ???????????? */}
                {/* user profile img */}
                <ProfileImageEdit />
            </li>
            <li>
                {editEmailState ? (
                    <Fragment>
                        <form onSubmit={handleEmailAuth}>
                            <Label htmlFor="userEmail" content="????????? ?????????" classN="label_t1"/>
                            <Input 
                                id="userEmail" 
                                type="email" 
                                required={true} 
                                placeholder={state.user.email}
                                classN="input_text_t1" 
                                name="userEmail" 
                                value={userEmail} 
                                evt="onChange" 
                                onChange={handleUserEmail} 
                                disabled={editEmailAuthState && true}
                            />
                            {!editEmailAuthState ? (
                                <Fragment>
                                   <button name="email">????????? ????????????</button>
                                   <button type="button" name="email" onClick={handleToggle}>??????</button>
                                 </Fragment>
                            ) : (
                                <Fragment>
                                  <div>????????? ??????????????? ?????????????????????</div>
                                    <button type="button" name="emailAuth" onClick={handleToggle}>??????</button>
                                </Fragment>
                            )}
                        </form>

                        {/* ?????? ?????? ????????? ??? */}
                        {editEmailAuthState && (
                            <form onSubmit={handleEmailEdit}>
                                <Label htmlFor="authNumber" content="???????????? ??????" classN="label_t1"/>
                                <Input 
                                    id="authNumber" 
                                    type="text" 
                                    required={true} 
                                    placeholder="???????????? ??????"
                                    classN="input_text_t1" 
                                    name="authNumber" 
                                    value={authNumber} 
                                    evt="onChange" 
                                    onChange={handleAuthNumber} 
                                    disabled={!timerNumber ? false : true}
                                />
                                <button disabled={!timerNumber ? false : true}>????????? ????????????</button>
                               
                                <br />
                                <Timer  
                                    endSecond={180} 
                                    startingPoint={180} 
                                    countingName={''} 
                                    endMessage={'??????????????? ?????????????????????'}
                                    callback={() => setTimerNumber(true)}
                                />
                            </form>
                            )}
                       </Fragment>
                    ) : (
                        <Fragment>
                            ?????????: {state.user.email} 
                            <button type="button" name="email" onClick={handleToggle}>????????? ??????</button>
                        </Fragment>
                    ) }
                     {state.mailEditErrorMessage && <p style={{color: 'red'}}>{state.mailEditErrorMessage}</p>}
                </li>
                <li>?????????: {state.user.id}</li>
                {editUserInfoState ? (
                    <Fragment>
                        <form onSubmit={handleUserInfoEdit}>
                            <li>
                                <Label htmlFor="userName" content="?????? ?????????" classN="label_t1"/>
                                <Input 
                                    id="userName" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.name}
                                    classN="input_text_t1" 
                                    name="userName" 
                                    value={userName} 
                                    evt="onChange" 
                                    onChange={handleUserName} 
                                />
                            </li>
                            <li>
                                <span>?????? ?????????</span>
                                 <span>
                                    <Label htmlFor="man" content="??????" classN="label_t1"/>
                                    <Input 
                                        id="man" 
                                        type="radio" 
                                        required={true} 
                                        classN="" 
                                        name="gender" 
                                        value="???" 
                                        evt="onChange" 
                                        onChange={handleUserGender} 
                                        ref={manRef}
                                        // checked={state.user.gender === '???' ? true : false}
                                        // ?????? ???????????? ???????????? 
                                    />
                                </span>
                                <span>
                                    <Label htmlFor="woman" content="??????" classN="label_t1"/>
                                    <Input 
                                        id="woman" 
                                        type="radio" 
                                        required={true} 
                                        classN="" 
                                        name="gender" 
                                        value="???" 
                                        evt="onChange" 
                                        onChange={handleUserGender}
                                        ref={womanRef} 
                                        // checked={state.user.gender === '???' ? true : false}
                                    />
                                </span>
                            </li>
                            <li>
                                <Label htmlFor="userBirthday" content="?????? ?????????" classN="label_t1"/>
                                <Input 
                                    id="userBirthday" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.birthday}
                                    classN="input_text_t1" 
                                    name="userBirthday" 
                                    value={userBirthday} 
                                    evt="onChange" 
                                    onChange={handleUserBirthday} 
                                />
                                {birthdayLengthChecked && (
                                    <p style={{color: "red"}}>?????? 8????????? ?????????????????? [x]</p>
                                )}
                            </li>
                            <li>
                                <Label htmlFor="phoneNumber" content="??????????????? ?????????" classN="label_t1"/>
                                <Input 
                                    id="phoneNumber" 
                                    type="text" 
                                    required={true} 
                                    placeholder={state.user.phoneNumber}
                                    classN="input_text_t1" 
                                    name="phoneNumber" 
                                    value={userPhoneNumber} 
                                    evt="onChange" 
                                    onChange={handleUserPhoneNumber} 
                                />
                                {phoneNumberLengthChecked && (
                                    <p style={{color: "red"}}>????????? ?????? 11????????? ?????????????????? [x]</p>
                                )}
                            </li>
                            <button>???????????? ????????????</button>
                            {state.infoEditErrorMessage && <p style={{color: 'red'}}>{state.infoEditErrorMessage}</p>}
                            <button type="button" name="userInfo" onClick={handleToggle}>??????</button>
                        </form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li> ??????: {state.user.name}</li>
                        <li>??????: {state.user.gender}</li>
                        <li>??????: {state.user.birthday}</li>
                        <li>????????????: {state.user.phoneNumber}</li>
                        <button type="button" name="userInfo" onClick={handleToggle}>???????????? ??????</button>
                    </Fragment>
                )}
                <li>?????????: {state.user.createdAt}</li>
                <li>?????????: {state.user.updatedAt}</li>
            </ul>
        </Fragment>
    )
}


export default UserProfile;