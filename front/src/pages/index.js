import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';


import Layout from '../components/common/Layout.js'

import Main from './main.js'
import About from './about.js'
import Profile from './profile.js'
import Signup from './signupPage.js'
import LoginForm from '../components/user/LoginForm.js'
import Error from './error.js'
import StyleGuide from './guide/styleGuide.js'



const RoutesPage = () => {

    
    return (
        <Fragment>
            <Layout>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/login' element={ <LoginForm />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/style/:id' element={<StyleGuide />}></Route>
                    <Route path='/error' element={<Error />}></Route>
                </Routes>
            </Layout>
        </Fragment>
    );
};

export default RoutesPage;