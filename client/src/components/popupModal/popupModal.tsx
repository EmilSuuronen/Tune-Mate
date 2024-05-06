// Modal.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    text: string;
    onCancel: () => void;
    onOk: () => void;
    isLoading?: boolean;
}

const modalRoot = document.getElementById('root') as HTMLElement;

const Modal: React.FC<ModalProps> = ({ isOpen, text, onCancel, onOk, isLoading }) => {
    const [element] = useState(document.createElement('div'));

    useEffect(() => {
        modalRoot.appendChild(element);
        return () => {
            modalRoot.removeChild(element);
        };
    }, [element]);

    if (!isOpen) return null;

    if (isLoading) return <p>Loading...</p>;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{text}</p>
                <button onClick={onOk} className="button-color">OK</button>
                <button onClick={onCancel} className="button-border">Cancel</button>
            </div>
        </div>,
        element
    );
};

export default Modal;
