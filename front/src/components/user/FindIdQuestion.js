import { Fragment, useState, useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import { useInput } from '../common/hooks/index.js'
import _debounce from 'lodash.debounce';
import Input from '../common/form/Input.js'
import Label from '../common/form/Label.js'
import UserRequest from '../../reducers/UserRequest.js'
import { UserContext } from '../../context/UserContext.js'

import { statusCode, questionData } from '../../utils/utils.js'


const FindIdQuestion = () => {
    const { nmaeEditUser, emailEditUser, findUserIdQuestion } = UserRequest();
    const {state, dispatch} = useContext(UserContext)

    const [authToggle, setAuthToggle] = useState(false);
    const [name, handleName, setName] = useInput('');
    const [email, handleEmail, setEmail] = useInput(''); 
    const [questionType, setQuestionType] = useState(null)
    const [result, handleResult, setResult] = useInput('') 

    const selectRef = useRef(null)
    const [resMsg, setResMsg] = useState({});


    const handleQuestion = e => setQuestionType(e.target.value)

    // 아이디찾기
    const handleFindIdSubmit = async e => {
        e.preventDefault();
        findIdSubmit();
    }
    const findIdSubmit = _debounce(async() => {
        try {
            const findId = await findUserIdQuestion({ name, email, questionType, result }); 
            if(statusCode(findId.status, 2)) { //성공시
                setAuthToggle(false);
                setName('');
                setEmail(''); 
                setResult('');
                setResMsg({id: findId.data.id});
                selectRef.current[0].selected = true
            }
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    useEffect(() => {
        return () => findIdSubmit.cancel()
    }, [name, email, resMsg])


    return (
        <Fragment>
            <form onSubmit={handleFindIdSubmit}>
                <div className='gap_20'>
                    <Label htmlFor="userName" content="이름" classN="label_t1"/>
                    <Input 
                        id="userName" 
                        type="text" 
                        required={true} 
                        placeholder="userName" 
                        classN="input_text_t1" 
                        name="userName" 
                        value={name} 
                        evt="onChange" 
                        onChange={handleName} 
                        disabled={authToggle && true}
                    />
                </div>
                <div className='gap_20'>
                    <Label htmlFor="userEmail" content="이메일" classN="label_t1"/>
                    <Input 
                        id="userEmail" 
                        type="email" 
                        required={true} 
                        placeholder="userEmail" 
                        classN="input_text_t1" 
                        name="userEmail" 
                        value={email} 
                        evt="onChange" 
                        onChange={handleEmail} 
                        disabled={authToggle && true}
                    />
                </div>
                <div className='gap_20'>
                    <Label htmlFor="question" content="질문" classN="label_t1"/>
                    <select name="question" onChange={handleQuestion} ref={selectRef}>
                        {questionData && questionData.map((data, idx) => {
                            return <option key={idx} value={data.questionType}>{data.question}</option>
                        })}
                    </select>
               
                    <Label htmlFor="result" content="답" classN="label_t1"/>
                    <Input 
                        id="result" 
                        type="text" 
                        required={true} 
                        placeholder="result" 
                        classN="input_text_t1" 
                        name="result" 
                        value={result} 
                        evt="onChange" 
                        onChange={handleResult} 
                    />
                </div>
                <button disabled={authToggle && true}>인증번호 보내기</button>
                {state.authNumberErrorMessage && <p style={{color: "red"}}> {state.authNumberErrorMessage}</p>}
            </form>

            <br /><br />
            {resMsg.id && (<div>
                <p>아이디 {resMsg.id}</p>
            </div>)}
        </Fragment>
    )
}


export default FindIdQuestion;