import React from 'react'
import {useNavigate} from 'react-router-dom';
import '../../styles/styles.css'
import './home.css'
import Login from "../login/login";

const Home = () => {
    function navigateToRegister() {
        navigate('/register')
    }

    function navigateToDashBoard() {
        navigate('/dashboard')
    }

    const navigate = useNavigate()
    return (
        <div className="div-main-landing-page">
            <div className="div-main-container-get-started">
                <div className="div-landing-page-details">
                    <div className="div-title">Welcome to TuneMate</div>
                    <div className="text-description-landing-page">
                        Place for all your guitar needs - create your own guitar tabs, chords and tunings all in one place
                        Get started <b>by creating an account or logging in.</b>
                    </div>

                    <div className="div-login-buttons">
                        <button className="button-color" onClick={navigateToRegister}>Register</button>
                        <button className="button-border" onClick={navigateToDashBoard}>Test without account</button>
                    </div>
                </div>

                <div className="div-landing-page-details-login">
                    <div className="text-features-title">Login</div>
                    <div className="text-description-landing-page">
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
