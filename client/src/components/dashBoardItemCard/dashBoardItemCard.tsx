import React, {useState} from 'react';
import Tab from "../../views/tabCreator/TabInterface";
import './dashBoardItemCard.css';
import { FaItunesNote } from "react-icons/fa";

interface ItemCardProps {
    cardData: Tab;
}

const ItemCard: React.FC<ItemCardProps> = ({cardData}) => {
    return (
        <div className="div-item-card-main">
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
