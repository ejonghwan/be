import React, { useState, useEffect, useContext } from 'react';
import { useInput } from '../common/hooks/index.js';
import UserRequest from '../../reducers/UserRequest.js';
import _debounce from 'lodash.debounce';
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';
import Timer from '../../components/common/utils/Timer.js';
import { UserContext } from '../../context/UserContext.js';
import { statusCode } from '../../utils/utils.js';
import Button from '../common/form/Button.js';
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import SuccessMsg from '../common/successMsg/SuccessMsg.js';
import { HiOutlineAtSymbol } from "react-icons/hi2";
import './FindId.css';



const FindId = () => {
    const { findUserId, nonLoginMemberAuthNumberRequest } = UserRequest();
    const { state } = useContext(UserContext);

    const [authNumber, handleAuthNumber, setAutnNumber] = useInput('');
    const [authToggle, setAuthToggle] = useState(false);
    const [name, handleName, setName] = useInput('');
    const [email, handleEmail, setEmail] = useInput(''); 
    const [resMsg, setResMsg] = useState({});
    const [authTimeout, setAuthTimeout] = useState(false);


    /* 이메일인증 서브밋 */
    const handleAuthNumberSubmit = e => {
        e.preventDefault();
        authSubmit();
    }
    const authSubmit = _debounce(async() => {
        try {
            const number = await nonLoginMemberAuthNumberRequest({ name, email }); 
            if(statusCode(number.status, 2)) return setAuthToggle(true) //성공 시 
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    /* 아이디 찾기 서브밋 */
    const handleFindIdSubmit = async e => {
        e.preventDefault();
        findIdSubmit();
    }

    const findIdSubmit = _debounce(async() => {
        try {
            const findId = await findUserId({ authNumber }); 
            // 여기선 쿠키 2개 보냄
            
            if(statusCode(findId.status, 2)) { 
                setAuthToggle(false);
                setName('');
                setEmail(''); 
                setAutnNumber('');
                setResMsg({id: findId.data.id, message: ''});
            }
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    useEffect(() => {
        return () => {
            authSubmit.cancel()
            findIdSubmit.cancel()
        }
    }, [])


    return (
        <div className='form_wrap'>
            <h3 className='form_title gap_20'>
                <HiOutlineAtSymbol />
                <strong>이메일 인증으로 찾기</strong>
            </h3>
            <form onSubmit={handleAuthNumberSubmit}>
                <div className='gap_20'>
                    <Label htmlFor="userName" content="이름" className={"label_type1"} />
                    <Input 
                        id="userName" 
                        type="text" 
                        required={true} 
                        placeholder="이름을 입력해주세요." 
                        className={"input_type1"} 
                        name="userName" 
                        value={name} 
                        evt="onChange" 
                        onChange={handleName} 
                        disabled={authToggle && true}
                    />
                </div>
                <div className='gap_20'>
                    <Label htmlFor="userEmail" content="이메일" className={"label_type1"} />
                    <Input 
                        id="userEmail" 
                        type="email" 
                        required={true} 
                        placeholder="인증할 이메일을 입력해주세요." 
                        className={"input_type1"} 
                        name="userEmail" 
                        value={email} 
                        evt="onChange" 
                        onChange={handleEmail} 
                        disabled={authToggle && true}
                    />
                </div>
               
                <div className='align_c gapt_30'>
                    <Button className={'button_type2'} disabled={authToggle && true}>
                        인증번호 보내기
                    </Button>
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        {state.mailAuthErrorMessage && <p> {state.mailAuthErrorMessage }</p>}
                    </ErrorMsg>
                </div>
            </form>

            {authToggle && (
                <form onSubmit={handleFindIdSubmit}>
                  <div className='gap_20'>
                     <Label htmlFor="authNumber" content="메일로 인증번호가 전송되었습니다." className={"label_type1"} />
                     <Input 
                         id="authNumber" 
                         type="text" 
                         required={true} 
                         placeholder="인증번호를 입력해주세요" 
                         className={"input_type1"} 
                         name="authNumber" 
                         value={authNumber} 
                         evt="onChange" 
                         onChange={handleAuthNumber} 
                         disabled={authTimeout}
                     />
                 </div >
                 <div className='gapt_20 align_c'>
                    <Timer  
                        endSecond={180} 
                        startingPoint={180} 
                        countingName={'인증번호를 입력해주세요.'} 
                        endMessage={'인증시간이 만료되었습니다. 다시 시도하려면 새로고침 해주세요.'}
                        callback={() => setAuthTimeout(true)}
                    />
                </div>
                 <div className='align_c gapt_30'>
                    <Button className={'button_type2'} disabled={authTimeout}>
                        아이디 찾기
                    </Button>
                    <ErrorMsg className={'error_type1 align_c gapt_30'}>
                        {state.authNumberErrorMessage && <p> {state.authNumberErrorMessage }</p>}
                    </ErrorMsg>
                 </div>
               
             </form>
            )}
            
            {/* 성공시 */}
            {resMsg.id && (
                <SuccessMsg className={"success_type"}>
                    아이디는 <i className='check_txt'>{resMsg.id}</i> 입니다.
                </SuccessMsg>
            )}
        </div>
    )
}


export default FindId;