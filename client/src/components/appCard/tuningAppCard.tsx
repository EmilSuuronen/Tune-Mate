import React from 'react'
import './tuningAppCard.css';
import {LiaBookOpenSolid} from "react-icons/lia";
import {useNavigate} from "react-router-dom";

export const TuningAppCard = () => {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/tuningCreator');
    }

    return (
        <div className="tuning-app-card-main-div" onClick={handleNavigate}>
            <LiaBookOpenSolid className="tuning-app-card-icon"/>
            <h3 className="tuning-app-card-text">Tuning Creator</h3>
        </div>
    )
}
