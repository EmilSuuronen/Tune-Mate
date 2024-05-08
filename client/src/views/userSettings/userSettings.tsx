import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {CREATE_USER, MODIFY_USER} from "../graphql/userTypes";
import {useNavigate} from "react-router-dom";
import './userSettings.css';
import SideNav from "../../components/sidenav/sidenav";

const UserSettings = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        user_name: '',
        email: '',
        password: ''
    });

    const [modifyUser, {loading, error}] = useMutation(MODIFY_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(name, value);
    };

    const validateInput = (name: string, value: string) => {
        let errorMsg = '';
        if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMsg = 'Invalid email';
            }
        } else if (name === 'password' && value) {
            if (value.length < 8) {
                errorMsg = 'Password must be at least 8 characters long';
            }
        }
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUser = localStorage.getItem('currentUser');
        if (!errors.user_name && !errors.email && !errors.password && formData.user_name && formData.email && formData.password) {
            try {
                await modifyUser({variables: {id: currentUser, input: formData}});
                navigate('/dashboard');
            } catch (err) {
                console.error('Error creating user:', err);
            }
        } else {
            console.error('Validation errors', errors);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="div-user-settings-main">
            <SideNav/>
            <div className="register-main-container">
                <h1 className="login-header">Change account settings</h1>
                <form onSubmit={handleSubmit} className="register-main-container" id="form-content">
                    <label className="login-label">Username</label>
                    <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required
                           className='input-rounded' placeholder="Username"/>
                    {errors.user_name && <p style={{color: '#ff2f2f'}}>{errors.user_name}</p>}

                    <label className="login-label">Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required
                           className='input-rounded' placeholder="Email"/>
                    {errors.email && <p style={{color: '#ff2f2f'}}>{errors.email}</p>}

                    <label className="login-label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required
                           className='input-rounded' placeholder="Password"/>
                    {errors.password && <p style={{color: '#ff2f2f'}}>{errors.password}</p>}

                    <button type="submit" disabled={loading || !!errors.user_name || !!errors.email || !!errors.password}
                            className="button-color" id="create-account">Save changes
                    </button>
                    {error && <p style={{color: '#ff2f2f'}}>{error.message}</p>}
                </form>
            </div>
        </div>

    );
};

export default UserSettings;
