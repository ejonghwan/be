import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/common/Layout.js';
import Home from './home.js';
import About from './about.js';
import Profile from './profile.js';
import Signup from './signupPage.js';
import Login from './login.js';
import FindId from './findid.js';
import FindPassword from './findpassword.js';
import ChangePassword from './changepassword.js';
import Error from './error.js';
import StyleGuide from './guide/styleGuide.js';
import { UserContext } from './../context/UserContext.js';
import Protected from './protected/protectedPage.js';



const RoutesPage = () => {

    const {state, dispatch} = useContext(UserContext);

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={state.user.id ? <About page={'내 습관'} /> : <Protected page={'내 습관'}/>}></Route>
                <Route path='/profile' element={state.user.id ? <Profile page={'프로필'} /> : <Protected page={'프로필'} />}></Route>
                <Route path='/login' element={ <Login page={'로그인'}/>}></Route>
                <Route path='/signup' element={<Signup page={'회원가입'} />}></Route>
                <Route path='/findid' element={<FindId page={'아이디 찾기'} />}></Route>
                <Route path='/findpassword' element={<FindPassword page={'비밀번호 찾기'} />}></Route>
                <Route path='/changepassword' element={<ChangePassword page={'비밀번호 변경'} />}></Route>
                <Route path='/error' element={<Error page={'에러'}/>}></Route>
                <Route path='/style/:id' element={<StyleGuide />}></Route>
            </Routes>
        </Layout>
    );
};

export default RoutesPage;