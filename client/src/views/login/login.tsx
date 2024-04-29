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
            localStorage.setItem('currentUser', JSON.stringify(data.loginUser().user))
            console.log("token: ", data.loginUser.token);
            console.log("Currently logged in as: ", localStorage.getItem('currentUser'));
            navigate('/dashboard');
        } catch (err) {
            console.error('error logging in', err);
        }
    };

    return (
        <div className="div-form-content-centered">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required className='input-rounded'/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className='input-rounded'/>
                </div>
                <button type="submit" disabled={loading} className="button-color">Log in</button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
}

export default Login;
