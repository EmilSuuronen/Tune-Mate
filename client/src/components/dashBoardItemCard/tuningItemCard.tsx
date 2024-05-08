import React, {useState} from 'react';
import Tuning from "../../views/tuning/TuningInterface";
import './dashBoardItemCard.css';
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {DELETE_TAB} from "../../views/graphql/tabTypes";
import {DELETE_TUNING} from "../../views/graphql/tuningTypes";
import Modal from "../popupModal/popupModal";

interface ItemCardProps {
    cardData: Tuning;
}

const TuningItem: React.FC<ItemCardProps> = ({cardData}) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleOpenModal() {
        setModalOpen(true);
    }

    function handleNavigateToTab() {
        navigate(`/tuningCreator/${cardData.id}`);
    }

    const [deleteTuning, {data, loading}] = useMutation(DELETE_TUNING);

    const handleDeleteTab = async () => {
        try {
            await deleteTuning({
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

export default TuningItem;
