import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation, createBrowserHistory } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import Cookies from 'universal-cookie';
import { useInput, useInputRadio } from '../components/common/hooks/index.js'
import Input from '../components/common/form/Input.js'
import Label from '../components/common/form/Label.js'
import UserRequest from '../reducers/UserRequest.js';
import { UserContext } from '../context/UserContext.js';
import { questionData, statusCode, passwordChecked, englishChecked, stringLengthChecked, onlyNumChecked } from '../utils/utils.js'
import SuccessMsg from '../components/common/successMsg/SuccessMsg.js';
import ErrorMsg from '../components/common/errorMsg/ErrorMsg.js';
import { HiOutlineChevronDown } from "react-icons/hi2";
import Button from '../components/common/form/Button.js';
import Use from '../components/common/terms/use.js';
import Info from '../components/common/terms/info.js';
import Acc from '../components/common/accordion/Accordion.js';
import Spinners from '../components/common/spinners/Spinners.js';
import './signup.css';

// 회원가입 시 메일인증
// https://lakelouise.tistory.com/240
// (https://nodemailer.com/about/)
// https://velog.io/@neity16/NodeJs-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84nodemailer
// 메일 구독 등 도메인으로 메일보내고 싶을떄.. https://www.peterkimzz.com/custom-email-service-for-free-forever/

// https://charming-kyu.tistory.com/6
// https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=sejun3278&logNo=221856823435&redirect=Dlog&widgetTypeCall=true&directAccess=false  <


// https://velog.io/@tkdfo93/Email-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84-Final-Project-Skill <- 이거로 하자
// 구글 OAuth https://velog.io/@tkdfo93/%EA%B5%AC%EA%B8%80-OAuth2.0-Final-Project
// 카카오 네이버 Oauth https://tyrannocoding.tistory.com/49



const Signup = ({ page }) => {
    
    const { signupUser } = UserRequest();
    // const { imageUpload } = ImageRequest();
    const { state, dispatch } = useContext(UserContext)
    const cookies = new Cookies();
    const successRoot = cookies.get('signup')
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const email = decodeURIComponent(searchParams.get('email'));

    const [userId, handleUserId] = useInput('') 
    const [userPassword, handlePassword] = useInput('') 
    const [userPasswordCheck, handlePasswordCheck] = useInput('') 
    const [passwordIsChecked, setPasswordIsChecked] = useState(false);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [englishCheckedState, setEnglishCheckedState] = useState(false);
    // const [userEmail, handleUserEmail] = useInput('') 
    const [userName, handleUserName] = useInput('') 
    const [questionType, setQuestionType] = useState(null)
    const [result, handleResult] = useInput('') 
    const [terms, setTerms] = useState(false) ;
    const [submitActive, setSubmitActive] = useState(false);
    const [phoneNumber, handlePhoneNumber] = useInput('') 
    const [phoneNumberLengthChecked, setPhoneNumberLengthChecked] = useState(false)
    const [gender, handleGender] = useInput('남') 
    const [birthday, handleBirthday] = useInput('')
    const [birthdayLengthChecked, setBirthdayLengthChecked] = useState(false)
    const [profileImage, setProfileImage] = useState(null)

    const handleTerms = useCallback(e => {
        // setTerms({
        //     ...terms,
        //     [e.target.name]: e.target.checked
        // })
        setTerms(e.target.checked)
    }, [setTerms])


    const handleQuestion = useCallback(e => {
        setQuestionType(e.target.value)
    }, [questionType, setQuestionType])

    
    // 요청
    const handleSubmit = e => {
        e.preventDefault();
        signup();
    }


    const accData = [
        {   
            id:0,
            header: <strong className="tit">이용 약관</strong>, 
            body: <Use />,
            done: false,
        },
        {
            id:1,
            header: <strong className="tit">개인정보 이용동의</strong>, 
            body: <Info />,
            done: false,
           
        },
    ]


   

    const signup = useMemo(() => _debounce(async() => {
        try {   
            if(!userId && !userPassword && !userName && !passwordIsChecked && !terms && !questionType && !result && !phoneNumber && !gender && !birthday && !profileImage) return;

            dispatch({ type: "USER_SIGNUP_REQEUST" })
            const singupData = {
                id: userId, 
                password: userPassword, 
                email: email, 
                name: userName,
                question: { questionType, result },
                phoneNumber, 
                gender, 
                birthday,
            };
       
            // 이미지모델에 등록되면 어디에서 요청했는지에 따라 그 아이디값을 각 모델에 보냄
            // 이미지는 default 기본이미지 넣고 나중에 개인정보 수정에서 수정하는걸로 
           
            const user = await signupUser(singupData);

            if(statusCode(user.status, 2)) {
                alert('회원 가입이 완료되었습니다. 기존 페이지는 닫아주세요')
                // 로그인 페이지 만들면 로그인으로 
                navigate('/login')
            };
        } catch(err) {
            console.error('view ', err)
        };
    }, 500), [userId, userPassword, userName, passwordIsChecked, terms, questionType, result, phoneNumber, gender, birthday]);


    useEffect(() => {
         // 백엔드에서 15분 후에 만료되는 쿠키 전달. 쿠키가 없으면 다시 인증
         alert(successRoot)
        if(!successRoot) {
            alert('인증 후 15분이 지났거나 잘못된 접근입니다. 다시 인증해주세요', successRoot)
            // navigate(-1)
            // navigate('/signuppage')
            console.log(successRoot, 'successRoot')
            
        }
        // return () => cookies.remove('signup')
    }, [])

    useEffect(() => { //비번 강화 체크 
        userPassword && passwordChecked(userPassword) ? setPasswordProtected(true) : setPasswordProtected(false)
    }, [userPassword])

    useEffect(() => { //de 
        userId && englishChecked(userId) ? setEnglishCheckedState(false) : setEnglishCheckedState(true)
    }, [userId])

    useEffect(() => {
        phoneNumber && onlyNumChecked(phoneNumber) ? setPhoneNumberLengthChecked(false) : setPhoneNumberLengthChecked(true)
    }, [phoneNumber]) 

    useEffect(() => {
        birthday && stringLengthChecked(birthday, 8) ? setBirthdayLengthChecked(false) : setBirthdayLengthChecked(true)
    }, [birthday]) 

    useEffect(() => {
        userPassword && userPassword === userPasswordCheck ? setPasswordIsChecked(true) : setPasswordIsChecked(false);
    }, [userPasswordCheck, userPassword])


    useEffect(() => {
        if(userId && userPassword && userName && passwordIsChecked && terms && questionType && result && phoneNumber && gender && birthday && passwordProtected && !phoneNumberLengthChecked && !birthdayLengthChecked) {
            setSubmitActive(true)
        } else {
            setSubmitActive(false)
        };
    }, [userId, userName, passwordIsChecked, terms, userPassword, userPasswordCheck, questionType, result, phoneNumber, gender, birthday, passwordProtected, phoneNumberLengthChecked, birthdayLengthChecked])


    return (
        // id, password, email, name
        // 이메일은 먼저 인증하고 시작함(임시로 홈에있음)

        /*
            비번 조건 
            1. 8자 이상 14자 이하 
            2. 1개 이상의 숫자 + 1개 이상의 특수문자 
            3. 아뒤랑 같게 안됨 
            4. 이메일이랑 같게 안됨 
            5. 이름이랑 같게 안됨 

            비번 수정 조건 
            위에 + 
            6. 이전비번이랑 동일한지 
            
        */
        <div className='b_conts'>
            <h2>{page}</h2>
           
                <div className='form_wrap'>
                <span className='gap_15'>※ 인증된 페이지는 15분 후에 만료됩니다.</span>
                <form onSubmit={handleSubmit}>
                    
                    <ul className='Profile_info_wrap'>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="userEmail" content="이메일" className={"label_type1"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <span>{email}</span>
                                <SuccessMsg className={"success_type3 align_l gapt_5"}>인증완료</SuccessMsg>
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="userId" content="아이디" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <Input  
                                    id="userId" 
                                    type="text" 
                                    required={true} 
                                    placeholder="아이디를 입력해주세요." 
                                    className={"input_type1"}  
                                    name="userId" 
                                    value={userId} 
                                    evt="onChange" 
                                    onChange={handleUserId} 
                                />
                                {englishCheckedState && 
                                    <ErrorMsg className={'error_type3'}>
                                        영문, 숫자 조합으로만 작성해주세요.
                                    </ErrorMsg>
                                }
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="userPassword" content="비밀번호" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
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
                               {passwordProtected ? (
                                    <SuccessMsg className={"success_type3 align_l gapt_10"}>
                                        안전한 비밀번호입니다.
                                    </SuccessMsg>
                                ) : (
                                    <ErrorMsg className={'error_type3 gapt_10'}>
                                        8~16글자에 숫자와 특수문자를 조합해주세요.
                                    </ErrorMsg>
                                )}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="userPasswordCheck" content="비밀번호 체크" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <Input 
                                    id="userPasswordCheck" 
                                    type="password" 
                                    required={true} 
                                    placeholder="비밀번호를 한번 더 입력해주세요." 
                                    className={"input_type1"}  
                                    name="userPasswordCheck" 
                                    value={userPasswordCheck} 
                                    evt="onChange" 
                                    onChange={handlePasswordCheck} 
                                />
                                {passwordIsChecked ? (
                                    <SuccessMsg className={"success_type3 align_l gapt_10"}>
                                        비밀번호가 일치합니다.
                                    </SuccessMsg>
                                ) : (
                                    <ErrorMsg className={'error_type3 gapt_10'}>
                                        입력한 비밀번호와 일치하지 않습니다.
                                    </ErrorMsg>
                                )}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="userName" content="이름" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <Input 
                                    id="userName" 
                                    type="text" 
                                    required={true} 
                                    placeholder="이름을 입력해주세요." 
                                    className={"input_type1"} 
                                    name="userName" 
                                    value={userName} 
                                    evt="onChange" 
                                    onChange={handleUserName} 
                                />
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="phoneNumber" content="전화번호" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <Input 
                                    id="phoneNumber" 
                                    type="tel" 
                                    required={true} 
                                    placeholder="전화번호를 입력해주세요." 
                                    className={"input_type1"} 
                                    name="phoneNumber" 
                                    value={phoneNumber} 
                                    evt="onChange" 
                                    onChange={handlePhoneNumber} 
                                />
                                 {phoneNumberLengthChecked && (
                                    <ErrorMsg className={'error_type3'}>
                                        휴대폰 번호는 -없이 숫자만 입력해주세요.
                                    </ErrorMsg>
                                )}
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit gapt_0'>성별</strong>
                            <div className='Profile_info_cont gender_wrap'>
                                <Input 
                                    id="man" 
                                    type="radio" 
                                    required={true} 
                                    className={"input_type1"} 
                                    name="gender" 
                                    value="남" 
                                    evt="onChange" 
                                    onChange={handleGender} 
                                    defaultChecked={true}
                                />
                                <Label htmlFor="man" content="남성" className={"label_type1 gap_0"} />
                                <Input 
                                    id="woman" 
                                    type="radio" 
                                    required={true} 
                                    className={"input_type1"} 
                                    name="gender" 
                                    value="여" 
                                    evt="onChange" 
                                    onChange={handleGender} 
                                />
                                <Label htmlFor="woman" content="여성" className={"label_type1 gap_0"} />
                            </div>
                        </li>
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="birthday" content="생년월일" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <Input 
                                    id="birthday" 
                                    type="text" 
                                    required={true} 
                                    placeholder="생일을 입력해주세요. 19870907" 
                                    className={"input_type1"} 
                                    name="birthday" 
                                    value={birthday} 
                                    evt="onChange" 
                                    onChange={handleBirthday} 
                                />
                                 {birthdayLengthChecked && (
                                    <ErrorMsg className={'error_type3'}>
                                        생일 8자리로 입력해주세요.
                                    </ErrorMsg>
                                )}
                            </div>
                        </li>   
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="question" content="질문" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <div className='selectbox_type1'>
                                    <select name="question" onChange={handleQuestion}>
                                        {   
                                            questionData && questionData.map((data, idx) => {
                                                return <option key={idx} value={data.questionType}>{data.question}</option>
                                            })
                                        }
                                    </select>
                                    <span className="svg_wrap"><HiOutlineChevronDown /></span>
                                </div>

                            </div>
                        </li>   
                        <li>
                            <strong className='Profile_info_tit'>
                                <Label htmlFor="result" content="답" className={"label_type1 gap_0"} />
                            </strong>
                            <div className='Profile_info_cont'>
                                <div className='selectbox_type1'>
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
                            </div>
                        </li>   
                    </ul>

                    <div className='gapt_40'>
                        <Acc 
                            data={accData} 
                            className={"acc"}
                        />
                        <div className='terms'>
                            <Input 
                                id="userTerms" 
                                type="checkbox"  
                                className={"input_type1"} 
                                onChange={handleTerms}
                                name="hoho"
                            />
                            <Label htmlFor="userTerms" content="약관에 동의하시겠습니까 ?" className={"label_type1 gap_0"} />
                        </div>
                         
                        
                        {terms ? (
                            <SuccessMsg className={"success_type3 align_l gapt_10"}>약관에 동의하셨습니다.</SuccessMsg>
                        ) : (
                            <ErrorMsg className={'error_type3 gapt_10'}>약관 동의는 필수입니다.</ErrorMsg>
                        )}
                    </div>
                   
                    <div className='align_c gapt_30'>
                        {state.signupUserLoading ? (<Spinners />) : (
                            <Button className={`button_type2 ${submitActive ? 'checked' : 'none'}`} disabled={submitActive ? false : true}>
                                회원가입
                            </Button>
                        )}
                        <ErrorMsg className={'error_type1 align_c gapt_30'}>
                            {state.signupUserError && <p> {state.signupUserError}</p>}
                        </ErrorMsg>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;