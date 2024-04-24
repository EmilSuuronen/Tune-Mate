import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {CREATE_USER} from "../graphql/userTypes";
import {useNavigate} from "react-router-dom";
const navigate = useNavigate();

const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    });

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUser({ variables: { input: formData } });
            navigate('/register');
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>Register</button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default Register;

