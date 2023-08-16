import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';


import Layout from '../components/common/Layout.js'

import Home from './home.js'
import About from './about.js'
import Profile from './profile.js'
import Signup from './signupPage.js'
import Login from './login.js'
import FindId from './findid.js'
import FindPassword from './findpassword.js'
import Error from './error.js'
import StyleGuide from './guide/styleGuide.js'



const RoutesPage = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About page={'어바웃'} />}></Route>
                <Route path='/profile' element={<Profile page={'프로필'} />}></Route>
                <Route path='/login' element={ <Login page={'로그인'}/>}></Route>
                <Route path='/signup' element={<Signup page={'회원가입'} />}></Route>
                <Route path='/findid' element={<FindId page={'아이디 찾기'} />}></Route>
                <Route path='/findpassword' element={<FindPassword page={'비밀번호 찾기'} />}></Route>
                <Route path='/error' element={<Error />}></Route>
                <Route path='/style/:id' element={<StyleGuide />}></Route>
            </Routes>
        </Layout>
    );
};

export default RoutesPage;