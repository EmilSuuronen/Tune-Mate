import React, {useState} from 'react';
import {LOGIN_USER} from "../graphql/userTypes";
import {useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-dom';
import "./login.css"

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_name: '',
        password: ''
    });

    const [loginUser, {loading, error}] = useMutation(LOGIN_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginUser({variables: {input: formData}});
            localStorage.setItem('token', response.data.loginUser.token);
            localStorage.setItem('currentUser', response.data.loginUser.user.id);
            localStorage.setItem('currentUserName', response.data.loginUser.user.user_name);
            localStorage.setItem('currentUserEmail', response.data.loginUser.user.email);
            console.log(localStorage.getItem('currentUserName'), "logged in as: ", localStorage.getItem('currentUser'));
            navigate('/dashboard');
        } catch (err) {
            console.error('error logging in', err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="login-main-container">
            <form onSubmit={handleSubmit} className="login-main-container">
                <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required
                       className='input-rounded' placeholder="Username"/>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required
                       className='input-rounded' placeholder="Password"/>
                <button type="submit" disabled={loading} className="button-color">Log in</button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    );
}

export default Login;
