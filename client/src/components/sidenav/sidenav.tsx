import React from 'react';
import './sidenav.css'
import { LuLogOut, LuHome, LuUser} from "react-icons/lu";
function SideNav() {

    function handleLogout(){
        localStorage.clear();
        window.location.href = '/';
    }

    return(
        <div className='div-nav-main'>
            <div className="sidenav-icon-container" id="home-icon-div">
                <LuHome className="sidebar-icon"/>
                <p className="sidenav-icon-text">Home</p>
            </div>
            <div className="sidenav-icon-container" id="user-icon-div">
                <LuUser className="sidebar-icon"/>
                <p className="sidenav-icon-text">User</p>
            </div>
            <div className="sidenav-icon-container" id="logout" onClick={handleLogout}>
                <LuLogOut className="sidebar-icon"/>
                <p className="sidenav-icon-text">Log out</p>
            </div>
        </div>
    );
}

export default SideNav;
