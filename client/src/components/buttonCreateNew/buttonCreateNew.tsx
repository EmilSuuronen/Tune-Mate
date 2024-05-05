import React from 'react';
import './buttonCreateNew.css'
import {useNavigate} from "react-router-dom";

function ButtonCreateNew() {
    const navigate = useNavigate()

    function navigateToTabs() {
        navigate('/tabCreator')
    }

    return(
        <button className="button-create-new" onClick={navigateToTabs}> + </button>
    );
}

export default ButtonCreateNew;
