import React from 'react';
import LoginForm from '../components/user/LoginForm';

const login = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <LoginForm />
        </div>
    );
};

export default login;