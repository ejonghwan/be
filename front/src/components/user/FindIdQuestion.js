import { useState, useEffect, useContext, useRef, Fragment } from 'react';
import { useInput } from '../common/hooks/index.js';
import _debounce from 'lodash.debounce';
import Input from '../common/form/Input.js';
import Label from '../common/form/Label.js';
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineChevronDown } from "react-icons/hi2";
import { statusCode, questionData } from '../../utils/utils.js';
import Button from '../common/form/Button.js';
import ErrorMsg from '../common/errorMsg/ErrorMsg.js';
import Spinners from '../common/spinners/Spinners.js';
import CompleteMsg from '../common/complete/CompleteMsg.js';
import { PiRobotDuotone } from "react-icons/pi";
import '../common/form/Selectbox.css';


const FindIdQuestion = () => {
    const { findUserIdQuestion } = UserRequest();
    const { state, dispatch } = useContext(UserContext);

    const [authToggle, setAuthToggle] = useState(false);
    const [name, handleName, setName] = useInput('');
    const [email, handleEmail, setEmail] = useInput(''); 
    const [questionType, setQuestionType] = useState(null);
    const [result, handleResult, setResult] = useInput(''); 

    const selectRef = useRef(null);
    const [resMsg, setResMsg] = useState({});


    const handleQuestion = e => setQuestionType(e.target.value);

    // 아이디찾기
    const handleFindIdSubmit = async e => {
        e.preventDefault();
        findIdSubmit();
    };
    const findIdSubmit = _debounce(async() => {
        try {
            dispatch({ type: "USER_QUESTION_FIND_ID_REQUEST" });
            const findId = await findUserIdQuestion({ name, email, questionType, result }); 
            if(statusCode(findId.status, 2)) { //성공시
                setAuthToggle(false);
                setName('');
                setEmail(''); 
                setResult('');
                setResMsg({id: findId.data.id});
                selectRef.current[0].selected = true;
            };
        } catch(err) {
            console.error(err);
        };
    }, 1000);


    useEffect(() => {
        return () => findIdSubmit.cancel();
    }, []);


    return (
        <div className='form_wrap gapt_50'>
            {!state.questionFindIdDone && (
                <Fragment>
                    <h3 className='form_title gap_20'>
                        <HiOutlineChatBubbleLeftEllipsis />
                        <strong>질문/답으로 찾기</strong>
                    </h3>
                    <form onSubmit={handleFindIdSubmit}>
                        <div className='gap_20'>
                            <Label htmlFor="userName" content="이름" className={"label_type1"}/>
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
                            <Label htmlFor="userEmail" content="이메일" className={"label_type1"}/>
                            <Input 
                                id="userEmail" 
                                type="email" 
                                required={true} 
                                placeholder="이메일을 입력해주세요." 
                                className={"input_type1"} 
                                name="userEmail" 
                                value={email} 
                                evt="onChange" 
                                onChange={handleEmail} 
                                disabled={authToggle && true}
                            />
                        </div>
                        <div className='gap_20'>
                            <Label htmlFor="question" content="질문" className={"label_type1"}/>
                            <div className='selectbox_type1'>
                                <select name="question" onChange={handleQuestion} ref={selectRef}>
                                    {questionData && questionData.map((data, idx) => {
                                        return <option key={idx} value={data.questionType}>{data.question}</option>
                                    })}
                                </select>
                                <span className="svg_wrap"><HiOutlineChevronDown /></span>
                            </div>
                        </div>
                        <div className='gap_20'>
                            <Label htmlFor="result" content="답" className={"label_type1"}/>
                            <Input 
                                id="result" 
                                type="text" 
                                required={true} 
                                placeholder="질문의 답을 입력해주세요." 
                                className={"input_type1"} 
                                name="result" 
                                value={result} 
                                evt="onChange" 
                                onChange={handleResult} 
                            />
                        </div>
                        {state.questionFindIdLoading ? (<Spinners />) : (
                            <div className='align_c gapt_30'>
                                <Button className={'button_type2'} disabled={authToggle && true}>
                                    아이디 찾기
                                </Button>
                                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                                    {state.questionFindIdError && <p> {state.questionFindIdError}</p>}
                                </ErrorMsg>
                            </div>
                        )}
                    </form>
                </Fragment>
            )}
            

            {/* 성공시 */}
            {resMsg.id && (
                <CompleteMsg
                    icon={<PiRobotDuotone />} 
                    title={`아이디는 ${resMsg.id} 입니다.`}
                />
            )}
        </div>
    )
};


export default FindIdQuestion;