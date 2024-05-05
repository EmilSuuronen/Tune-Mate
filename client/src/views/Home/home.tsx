import React from 'react'
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
                        <button className="button-border" onClick={navigateToLogin}>Log In</button>
                    </div>
                </div>

                <div className="div-landing-page-details-image">
                    <div className="text-features-title">Test without account</div>
                    <div className="text-description-landing-page">
                        Saving and editing features are disabled for unregistered users.
                    </div>
                    <button className="button-border" onClick={navigateToLogin}>Go</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
