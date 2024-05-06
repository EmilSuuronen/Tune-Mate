import React from 'react'
import './appCard.css';
import { LiaGuitarSolid } from "react-icons/lia";
import {useNavigate} from "react-router-dom";

export const AppCard = () => {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/tuner');
    }
    return (
        <div className="app-card-main-div" onClick={handleNavigate}>
            <LiaGuitarSolid className="app-card-icon"/>
            <h3 className="app-card-text">Guitar Tuner</h3>
        </div>
    )
}
