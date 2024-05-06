import React, {useEffect, useState} from "react";
import './topAppBar.css'
import {useMutation} from "@apollo/client";
import {CREATE_TAB, DELETE_TAB, MODIFY_TAB} from "../../views/graphql/tabTypes";
import Modal from "../popupModal/popupModal";
import {useNavigate, useParams} from 'react-router-dom';

function TopAppBar(noteState: any) {

    const navigate = useNavigate();

    const tabId = useParams();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    function handleOpenModal() {
        if (formData.name !== "" && formData.tempo !== 0) {
            setModalOpen(true);
        }
    }

    function handleOpenDeleteModal() {
        setDeleteModalOpen(true);
        console.log("notestate", noteState.noteState.name)
        console.log("formdataName", formData.name)
        console.log("formData", formData)
    }

    const [formData, setFormData] = useState({
        name: '',
        tempo: 0,
        string1: [],
        string2: [],
        string3: [],
        string4: [],
        string5: [],
        string6: [],
        owner: localStorage.getItem('currentUser') || ''
    });

    useEffect(() => {
        if (noteState && noteState.noteState) {
            setFormData({
                name: noteState.noteState.name,
                tempo: noteState.noteState.tempo,
                string1: noteState.noteState.strings[1] || [],
                string2: noteState.noteState.strings[2] || [],
                string3: noteState.noteState.strings[3] || [],
                string4: noteState.noteState.strings[4] || [],
                string5: noteState.noteState.strings[5] || [],
                string6: noteState.noteState.strings[6] || [],
                owner: localStorage.getItem('currentUser') || ''
            });
        }
    }, [noteState]);

    const [createTab] = useMutation(CREATE_TAB);
    const [modifyTab, {loading}] = useMutation(MODIFY_TAB);

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

    const [deleteTab] = useMutation(DELETE_TAB);
    const handleConfirmDelete = async () => {
        try {
            await deleteTab({
                variables: {id: tabId.id}
            });
            console.log('Tab deleted successfully!');
            setDeleteModalOpen(false);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error deleting Tab:', err);
            setDeleteModalOpen(false);
        }
    }

    return (
        <div className='div-top-app-bar-main'>
            <form onSubmit={handleOnSaveClick} className="top-app-bar-form">
                <div className="top-app-bar-name">
                    <input name="name" value={formData.name} onChange={handleChange} className='input-project-name'
                           placeholder="name" required/>
                </div>
                <div className="top-app-bar-functions">
                    <p>Tempo</p>
                    <input name="tempo" type="number" value={formData.tempo} onChange={handleChange}
                           className='input-project-tempo'
                           placeholder="tempo" required/>
                    <button className="button-color" onClick={handleOpenModal} type="submit">Save</button>
                    <button className="button-color-red" onClick={handleOpenDeleteModal} type="submit">Delete</button>
                </div>
            </form>
            <Modal
                isOpen={modalOpen}
                text="Save changes?"
                onCancel={() => setModalOpen(false)}
                onOk={handleConfirmSave}
                isLoading={loading}
            />
            <Modal
                isOpen={deleteModalOpen}
                text="Are you sure. This will delete the project permanently?"
                onCancel={() => setDeleteModalOpen(false)}
                onOk={handleConfirmDelete}
                isLoading={loading}
            />
        </div>
    );
}

export default TopAppBar;
