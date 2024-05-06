import React, {useEffect, useState} from "react";
import './topAppBar.css'
import {useMutation} from "@apollo/client";
import {CREATE_TAB, MODIFY_TAB} from "../../views/graphql/tabTypes";
import Modal from "../popupModal/popupModal";
import {useNavigate, useParams} from 'react-router-dom';

function TopAppBar(noteState: any, tablature: any) {

    const navigate = useNavigate();

    const tabId = useParams();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleOpenModal() {
        if (formData.name !== "" && formData.tempo !== 0) {
            setModalOpen(true);
        }
    }
    
    const [formData, setFormData] = useState({
        name: noteState.noteState.name,
        tempo: noteState.noteState.tempo,
        string1: noteState.noteState.strings[1],
        string2: noteState.noteState.strings[2],
        string3: noteState.noteState.strings[3],
        string4: noteState.noteState.strings[4],
        string5: noteState.noteState.strings[5],
        string6: noteState.noteState.strings[6],
        owner: localStorage.getItem('currentUser')
    });

    const [createTab] = useMutation(CREATE_TAB);
    const [modifyTab, {data, loading, error}] = useMutation(MODIFY_TAB);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const valueAsNumber = name === 'tempo' ? parseInt(value, 10) : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: valueAsNumber,
        }));
        console.log(value)
    };

    const handleOnSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({
            ...formData,
            string1: noteState.noteState.strings[1],
            string2: noteState.noteState.strings[2],
            string3: noteState.noteState.strings[3],
            string4: noteState.noteState.strings[4],
            string5: noteState.noteState.strings[5],
            string6: noteState.noteState.strings[6],
            owner: localStorage.getItem('currentUser') || ''
        })
        setModalOpen(true);
    };

    const handleConfirmSave = async () => {
        if (tabId.id) {
            try {
                await modifyTab({
                    variables: {
                        id: tabId.id,
                        input: formData
                    }
                });
                console.log('Tab modified successfully!');
                setModalOpen(false);
            } catch (err) {
                console.error('Error modifying Tab:', err);
                setModalOpen(false);
            }
        } else {
            try {
                await createTab({variables: {input: formData}});
                console.log('Tab created successfully!');
                setModalOpen(false);
            } catch (err) {
                console.error('Error creating Tablature:', err);
                setModalOpen(false);
            }
        }
    };

    function handleNavigateToHome() {
        navigate('/dashboard');
    }

    return (
        <div className='div-top-app-bar-main'>
            <h2 className="top-app-bar-main-text" onClick={handleNavigateToHome}>TuneMate</h2>
            <form onSubmit={handleOnSaveClick}>
                <input name="name" value={formData.name} onChange={handleChange} className='input-project-name'
                       placeholder="name" required/>
                <input name="tempo" type="number" value={formData.tempo} onChange={handleChange}
                       className='input-project-tempo'
                       placeholder="tempo" required/>
                <button className="button-color" onClick={handleOpenModal} type="submit">Save</button>
            </form>
            <Modal
                isOpen={modalOpen}
                text="Save changes?"
                onCancel={() => setModalOpen(false)}
                onOk={handleConfirmSave}
                isLoading={loading}
            />
        </div>
    );
}

export default TopAppBar;
