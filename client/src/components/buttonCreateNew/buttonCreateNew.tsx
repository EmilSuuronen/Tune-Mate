import React from 'react';
import './buttonCreateNew.css'
import {useNavigate} from "react-router-dom";

function ButtonCreateNew(navLocation: any) {
    const navigate = useNavigate()

    function navigateToTabs() {
        console.log("navLocation" + JSON.stringify(navLocation))
        navigate(navLocation.navLocation)
    }

    return (
        <div className="div-button-create">
            <button className="button-create-new" onClick={navigateToTabs}>+</button>
            <p>Create New</p>
        </div>
    );
}

export default ButtonCreateNew;
