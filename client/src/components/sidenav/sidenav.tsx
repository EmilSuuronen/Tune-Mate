import React from 'react';
import './sidenav.css'
import { LuLogOut, LuHome, LuUser} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { CgLogOut } from "react-icons/cg";

function SideNav() {

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        window.location.href = '/';
    }

    function handleNavigateToDashBoard() {
        navigate('/dashboard')
    }

    function handleNavigateToUserSettings() {
        navigate('/userSettings')
    }


    return(
        <div className='div-nav-main'>
            <div className="sidenav-icon-container" id="home-icon-div" onClick={handleNavigateToDashBoard}>
                <LuHome className="sidebar-icon"/>
                <p className="sidenav-icon-text">Home</p>
            </div>
            <div className="sidenav-icon-container" id="user-icon-div" onClick={handleNavigateToUserSettings}>
                <LuUser className="sidebar-icon"/>
                <p className="sidenav-icon-text">User</p>
            </div>
            <div className="sidenav-icon-container" id="logout-icon-div" onClick={handleLogout}>
                <CgLogOut  className="sidebar-icon"/>
                <p className="sidenav-icon-text">Log out</p>
            </div>
        </div>
    );
}

export default SideNav;
