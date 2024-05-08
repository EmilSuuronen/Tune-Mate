import React, {useState} from 'react';
import Tab from "../../views/tabCreator/TabInterface";
import './dashBoardItemCard.css';
import {FaItunesNote} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {DELETE_TAB} from "../../views/graphql/tabTypes";
import Modal from "../popupModal/popupModal";

interface ItemCardProps {
    cardData: Tab;
}

const ItemCard: React.FC<ItemCardProps> = ({cardData}) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleOpenModal() {
        setModalOpen(true);
    }

    function handleNavigateToTab() {
        navigate(`/tabCreator/${cardData.id}`);
    }

    const [deleteTab, {data, loading}] = useMutation(DELETE_TAB);

    const handleDeleteTab = async () => {
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
        <div className="div-item-card-main">
            <div className="div-item-card-element">
                <p className="item-card-name" id="name" onClick={handleNavigateToTab}>{cardData.name}</p>
            </div>
            <div className="div-item-card-element" id="tempo">
                {cardData.tempo} bpm
            </div>
            <div className="div-item-card-element" id="delete" onClick={handleOpenModal}>
                Delete
            </div>
            <Modal
                isOpen={modalOpen}
                text="Are you sure?"
                onCancel={() => setModalOpen(false)}
                onOk={handleDeleteTab}
                isLoading={loading}
            />
        </div>
    );
}

export default ItemCard;
