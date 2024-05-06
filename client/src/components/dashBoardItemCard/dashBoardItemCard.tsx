import React from 'react';
import Tab from "../../views/tabCreator/TabInterface";
import './dashBoardItemCard.css';
import { FaItunesNote } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

interface ItemCardProps {
    cardData: Tab;
}

const ItemCard: React.FC<ItemCardProps> = ({cardData}) => {
    const navigate = useNavigate();

    function handleNavigateToTab() {
        navigate(`/tabCreator/${cardData.id}`);
    }

    return (
        <div className="div-item-card-main" onClick={handleNavigateToTab}>
            <div className="item-card-header">
                {cardData.name}
                <p>bpm {cardData.tempo} <FaItunesNote /></p>
            </div>
            <div className="item-card-content">
                <p>Delete</p>
                <p>Edited: </p>
            </div>
        </div>
    );
}

export default ItemCard;
