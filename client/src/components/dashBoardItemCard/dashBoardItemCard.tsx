import React from 'react';
import Tab from "../../views/tabCreator/TabInterface";
import './dashBoardItemCard.css';
import { FaItunesNote } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {DELETE_TAB} from "../../views/graphql/tabTypes";

interface ItemCardProps {
    cardData: Tab;
}

const ItemCard: React.FC<ItemCardProps> = ({cardData}) => {
    const navigate = useNavigate();

    function handleNavigateToTab() {
        navigate(`/tabCreator/${cardData.id}`);
    }

    const [deleteTab, {data, loading}] = useMutation(DELETE_TAB);

    const handleDeleteTab = async () => {
        console.log("deleting tab: ", cardData.id)
        try {
            await deleteTab({
                variables: {id: cardData.id}
            });
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="div-item-card-main" >
            <div className="item-card-header">
                {cardData.name}
                <p>bpm {cardData.tempo} <FaItunesNote /></p>
            </div>
            <div className="item-card-content" onClick={handleNavigateToTab}>
                <p>Delete</p>
                <p>Edited: </p>
            </div>
            <button onClick={handleDeleteTab}> delete </button>
        </div>
    );
}

export default ItemCard;
