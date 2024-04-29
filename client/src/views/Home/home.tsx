import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css'

const Home = () => {
    function navigateToRegister() {
        navigate('/register')
    }

    function navigateToLogin() {
        navigate('/login')
    }

    const navigate = useNavigate()
    return (
        <div>
            <h1>TuneMate Home page</h1>
            <button onClick={navigateToRegister} className="button-color">
                Register
            </button>
            <button onClick={navigateToLogin} className="button-border">
                Log in
            </button>
        </div>
    );
};

export default Home;
