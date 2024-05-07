import React from 'react'
import './tuningAppCard.css';
import { GiGuitarHead } from "react-icons/gi";
import {useNavigate} from "react-router-dom";

export const TuningAppCard = () => {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/tuningCreator');
    }

    return (
        <div className="tuning-app-card-main-div" onClick={handleNavigate}>
            <GiGuitarHead className="tuning-app-card-icon"/>
            <h3 className="tuning-app-card-text">Tuning Creator</h3>
        </div>
    )
}
