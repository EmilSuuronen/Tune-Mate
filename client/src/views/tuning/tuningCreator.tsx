import React, {useEffect, useState} from "react";
import './tuningCreator.css';
import TopAppBar from "../../components/topAppBar/topAppBar";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_TAB_BY_ID} from "../graphql/tabTypes";
import SideNav from "../../components/sidenav/sidenav";
import {CREATE_TUNING} from "../graphql/tuningTypes";
import TUNING_NOTES from "./tuningHelpers";
import TuningModal from "./tuningModal";
import {MdMusicNote} from "react-icons/md";
import {CREATE_USER} from "../graphql/userTypes";

interface TuningInput {
    name: string;
    string_count: number;
    string_notes: string[];
    owner: string | null;
}

const TuningCreator: React.FC = () => {
    const tuningId = useParams();

    const [modalShow, setModalShow] = useState(false);
    const [selectedString, setSelectedString] = useState(0);
    const [stringCount, setStringCount] = useState<number>(6);
    const [stringNotes, setStringNotes] = useState<string[]>(new Array(6).fill('E'));
    const [createTuning, {data, loading, error}] = useMutation(CREATE_TUNING);
    const [input, setInput] = useState({
        name: '',
        string_count: 6,
        string_notes: Array(6).fill('E'),
        owner: localStorage.getItem('currentUser') || ''
    });

    // Adjust the number of strings and reset notes when string count changes
    const handleStringCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(event.target.value);
        setStringCount(count);
        setStringNotes(new Array(count).fill('E')); // Reset notes, defaulting to 'E'
    };

    const handleNoteChange = (note: any) => {
        const newNotes = [...stringNotes];
        newNotes[selectedString] = note;
        setStringNotes(newNotes);
        setModalShow(false);
    };

    const handleSubmit = async () => {
        const currentUser = localStorage.getItem('currentUser') || '';

        setInput({
            name: "Custom Tuning",
            string_count: stringCount,
            string_notes: stringNotes,
            owner: currentUser
        });

        console.log("createTuning input:");

        try {
            const response = await createTuning({
                variables: {input}
            });
            console.log('Tuning created successfully:', response.data.createTuning);
        } catch (error: any) {
            if (error.graphQLErrors) {
                console.error("Network error:", error.graphQLErrors);
            } else if (error.graphQLErrors) {
                    console.error( error.graphQLErrors)
            } else {
                console.error("Error creating tuning", error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="tuning-editor-full-container">
            <SideNav/>
            <div className="div-tuning-editor-main-container">
                <TopAppBar/>
                <h1>Create Tuning</h1>
                <label>
                    String Count:
                    <select value={stringCount} onChange={handleStringCountChange}
                            className="tuning-string-count-select">
                        {Array.from({length: 9}, (_, i) => i + 4).map(count => (
                            <option key={count} value={count}>{count}</option>
                        ))}
                    </select>
                </label>
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
                                    <button key={noteIndex} onClick={() => handleNoteChange(note)}>
                                        {note}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </TuningModal>
                </div>
                <button onClick={handleSubmit} disabled={loading}>Create Tuning</button>
            </div>
        </div>
    );
};

export default TuningCreator;
