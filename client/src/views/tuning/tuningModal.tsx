import React from 'react';
import './tuningModal.css';

interface ModalProps {
    show: boolean;
    onClose: any;
    children: any;
}

const TuningModal: React.FC<ModalProps> = ({show, onClose, children}) => {
    if (!show) {
        return null;
    }

    return (
        <div className="tuning-modal-overlay">
            <div className="tuning-modal-content">
                {children}
                <button onClick={onClose} style={{marginTop: 20}}>Close</button>
            </div>
        </div>
    );
};

export default TuningModal;
