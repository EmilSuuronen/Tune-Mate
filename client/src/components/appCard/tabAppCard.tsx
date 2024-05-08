import React from 'react'
import './tabAppCard.css';
import { LiaBookOpenSolid } from "react-icons/lia";
import {useNavigate} from "react-router-dom";

export const TabAppCard = () => {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/tabCreator');
    }

    return (
        <div className="tab-app-card-main-div" onClick={handleNavigate}>
            <LiaBookOpenSolid className="tab-app-card-icon"/>
            <h3 className="tab-app-card-text">Tab Creator</h3>
        </div>
    )
}
