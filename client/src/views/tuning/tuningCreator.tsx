import React, {useEffect, useState} from "react";
import './tuningCreator.css';
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import SideNav from "../../components/sidenav/sidenav";
import {CREATE_TUNING, FIND_TUNING_BY_ID, MODIFY_TUNING} from "../graphql/tuningTypes";
import TUNING_NOTES from "./tuningHelpers";
import TuningModal from "./tuningModal";
import {MdMusicNote} from "react-icons/md";
import Modal from "../../components/popupModal/popupModal";
import isLoggedIn from "../../script/isLoggedIn";

export default function TuningCreator() {
    const tuningId = useParams();

    const [modalShow, setModalShow] = useState(false);
    const [selectedString, setSelectedString] = useState(0);
    const [stringCount, setStringCount] = useState<number>(6);
    const [stringNotes, setStringNotes] = useState<string[]>(new Array(6).fill('E'));
    const [tuningName, setTuningName] = useState<string>('Untitled Tuning');
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleOpenSaveModal() {
        setSaveModalOpen(true);
    }

    const [createTuning, {data: createTuningData, loading: createTuningLoading}] = useMutation(CREATE_TUNING);
    const {data: findTuningData, loading: findTuningLoading} = useQuery(FIND_TUNING_BY_ID, {
        variables: {input: {id: tuningId.id}}
    });
    const [modifyTuning, {data: modifyTuningData, loading: modifyTuningLoading}] = useMutation(MODIFY_TUNING);

    const [input, setInput] = useState({
        name: '',
        string_count: 6,
        string_notes: Array(6).fill('E'),
        owner: localStorage.getItem('currentUser')
    });

    useEffect(() => {
        if (findTuningData && findTuningData.findTuningsById) {
            setInput({
                name: findTuningData.findTuningsById.name,
                string_count: findTuningData.findTuningsById.string_count,
                string_notes: findTuningData.findTuningsById.string_notes,
                owner: findTuningData.findTuningsById.owner
            });
            setTuningName(findTuningData.findTuningsById.name);
            setStringCount(findTuningData.findTuningsById.string_count);
            setStringNotes(findTuningData.findTuningsById.string_notes);
        }
    }, [findTuningData]);

    // Adjust the number of strings and reset notes when string count changes
    const handleStringCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(event.target.value);
        setStringCount(count);
        setStringNotes(new Array(count).fill('E')); // Reset notes, defaulting to 'E'
    };

    const handleNoteChange = (note: any) => {
        const currentUser = localStorage.getItem('currentUser') || '';
        const newNotes = [...stringNotes];
        newNotes[selectedString] = note;
        setStringNotes(newNotes);
        setModalShow(false);
    };

    const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTuningName(event.target.value);
    }

    const handleSubmit = async () => {
        const currentUser = localStorage.getItem('currentUser') || '';
        console.log(JSON.stringify(input))
        console.log(currentUser)
        setSaveModalOpen(false);
        const newInput = {
            name: tuningName,
            string_count: stringCount,
            string_notes: stringNotes,
            owner: currentUser
        };
        setInput(newInput);
        if (tuningId.id) {
            try {
                const response = await modifyTuning({
                    variables: {id: tuningId.id, input: newInput}
                });
                console.log('Tuning created successfully:', response.data.createTuning);
            } catch (error: any) {
                if (error.graphQLErrors) {
                    console.error("Network error:", error.graphQLErrors);
                } else {
                    console.error("Error creating tuning", error);
                }
            }
        } else {
            try {
                const response = await createTuning({
                    variables: {input: newInput}
                });
                console.log('Tuning created successfully:', response.data.createTuning);
                navigate("/tuningCreator/" + response.data.createTuning.id);
            } catch (error: any) {
                if (error.graphQLErrors) {
                    console.error("Network error:", error.graphQLErrors);
                } else {
                    console.error("Error creating tuning", error);
                }
            }
        }
    }

    if (findTuningLoading || createTuningLoading) return <p>Loading...</p>;

    return (
        <div className="tuning-editor-full-container">
            <SideNav/>
            <div className="div-tuning-editor-main-container">
                <div className="div-top-selectors">
                    <input className="input-rounded" id="input-name-tuning" onChange={handleOnInputChange} placeholder='Name'/>
                    <label className="label-tuning-strings">
                        Strings:
                        <select value={stringCount} onChange={handleStringCountChange}
                                className="tuning-string-count-select">
                            {Array.from({length: 9}, (_, i) => i + 4).map(count => (
                                <option key={count} value={count}>{count}</option>
                            ))}
                        </select>
                    </label>
                    {isLoggedIn() && (
                        <button className="button-color" id="save-button" onClick={handleOpenSaveModal} disabled={createTuningLoading}>save</button>
                    )}
                </div>
                <h1> Tuning Creator</h1>
                <div className="tuner-buttons-container">
                    {stringNotes.map((note, index) => (
                        <div key={index} className="tuner-button-items-container">
                            <div className="div-string-line"/>
                            <label className="label-strings"><MdMusicNote/></label>
                            <button onClick={() => {
                                setSelectedString(index);
                                setModalShow(true);
                            }}
                                    className="tuning-string-note-button"
                            >
                                {note}
                            </button>
                        </div>
                    ))}
                    <TuningModal show={modalShow} onClose={() => setModalShow(false)}>
                        {TUNING_NOTES.map((row, rowIndex) => (
                            <div key={rowIndex} style={{margin: '10px 0'}}>
                                {row.map((note, noteIndex) => (
                                    <button className="tuning-modal-button" key={noteIndex} onClick={() => handleNoteChange(note)}>
                                        {note}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </TuningModal>
                </div>
            </div>
            <Modal
                isOpen={saveModalOpen}
                text="Confirm Save?"
                onCancel={() => setSaveModalOpen(false)}
                onOk={handleSubmit}
            />
        </div>
    );
};
