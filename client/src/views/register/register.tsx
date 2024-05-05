import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {CREATE_USER} from "../graphql/userTypes";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    });

    const [createUser, { loading, error }] = useMutation(CREATE_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUser({ variables: { input: formData} });
            navigate('/');
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="login-main-container">
            <form onSubmit={handleSubmit} className="login-main-container">
                <label className="login-label">Username</label>
                <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required
                       className='input-rounded'/>
                <label className="login-label">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} required
                       className='input-rounded'/>
                <label className="login-label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required
                       className='input-rounded'/>
                <button type="submit" disabled={loading} className="button-color">Create an account</button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default Register;

