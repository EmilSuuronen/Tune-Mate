import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import '../../styles/styles.css'
import './home.css'

const Home = () => {
    function navigateToRegister() {
        navigate('/register')
    }

    function navigateToLogin() {
        navigate('/login')
    }
    function navigateToDashBoard() {
        navigate('/dashboard')
    }

    const navigate = useNavigate()
    return (
        <div>
            <div className="div-home-container">
                <div className="div-home-main-container">
                    <h1 id="h1-home">Welcome to TuneMate</h1>
                    <p>Get started with all your guitar needs by registering</p>
                    <div className="div-translucent-container" id="div-translucent-container-horizontal">
                        <div className="div-translucent-container" id="div-login-buttons">
                            <p>Create an account</p>
                            <button onClick={navigateToRegister} className="button-color" >
                                Register
                            </button>
                            <p>Already an user?</p>
                            <button onClick={navigateToLogin} className="button-border">
                                Log in
                            </button>
                        </div>
                        <div className="div-translucent-container" id="div-no-account">
                            <p> Test features without account</p>
                            <button onClick={navigateToDashBoard} className="button-color">
                                Get started without an account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
