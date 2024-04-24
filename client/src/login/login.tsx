import React, { useState } from 'react';
import {CREATE_USER, LOGIN_USER} from "../graphql/userTypes";
import {useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_name: '',
        password: ''
    });

    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser({ variables: { input: formData } });
            localStorage.setItem('token', data.loginUser.token);
            console.log("token: ", data.loginUser.token);
            navigate('/');
        } catch (err) {
            console.error('error logging in', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>Log in</button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
}

export default Login;
