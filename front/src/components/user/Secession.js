import React, { useEffect, Fragment, useContext } from 'react';
import _debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../common/hooks/index.js'
import { statusCode } from '../../utils/utils.js'
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import { UserContext } from '../../context/UserContext.js'
import UserRequest from '../../reducers/UserRequest.js'
import Button from '../common/form/Button.js';
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";


const Secession = () => {
    const { secession } = UserRequest();
    const {state, dispatch} = useContext(UserContext);
    const navi = useNavigate();

    // const [userId, handleUserId, setUserId] = useInput('')
    const [userPassword, handlePassword, setUserPassword] = useInput('');

    const handleSubmit = async e => {
        e.preventDefault();
        return window.confirm(`아이디 ${state.user.id} 님의 탈퇴가 진행됩니다.\n정말 탈퇴 하시겠습니까?`) ? submit() : null;
    };

    const submit = _debounce(async () => {
        try {
            dispatch({ type: "LOADING", loadingMessage: "탈퇴 처리 중.." });
            console.log('????')
            const user = await secession({ id: state.user.id, password: userPassword });
            if(statusCode(user.status, 2)) {
                
                // setUserId('');
                setUserPassword('');
                alert('탈퇴가 완료되었습니다.');
                navi('/');
            };
        } catch(err) {
            console.error('catch?', err);
        };
    }, 500);

    useEffect(() => () => submit.cancel(), [submit])

    return (
        <div className='form_wrap gapt_50'>
            <h3 className='form_title gap_20'>
                <HiOutlineArrowRightOnRectangle />
                <strong>회원탈퇴</strong>
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="userPassword" content="비밀번호" className={"label_type1"} />
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
                <div className='align_c gapt_30'>
                    <Button className={'button_type5'} disabled={!userPassword}>
                        탈퇴하기
                    </Button>
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        {state.authNumberErrorMessage && <p>{state.authNumberErrorMessage}</p>}
                    </ErrorMsg>
                </div>
            </form>
        </div>
    );
};

export default Secession;