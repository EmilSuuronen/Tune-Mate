import React, {useEffect, useState} from "react";
import Tablature from "./Tablature";
import './tabCreator.css';
import SideNav from "../../components/sidenav/sidenav";
import TopAppBar from "../../components/topAppBar/topAppBar";

const TabCreator: React.FC = () => {
    const [noteState, setNoteState] = useState(new Tablature());
    const [tablatureDisplay, setTablatureDisplay] = useState<string>("");

    useEffect(() => {
        setTablatureDisplay(noteState.toString())
    }, [])

    const handleNoteChange = (string: number, position: number, value: string) => {
        noteState.setNote(string, position, value);

        const newNoteState = new Tablature();

        // Copy all existing notes into the new instance.
        for (let i = 1; i <= 6; i++) {
            newNoteState.strings[i] = [...noteState.strings[i]];
        }

        setNoteState(newNoteState); // Set the new instance as state.
        setTablatureDisplay(noteState.toString());
        console.log(noteState)
    };

    const stringNames = ["E", "A", "D", "G", "B", "e"];

    const renderStringFields = (string: number) => {
        return (
            <div key={`string-${string}`} className="div-editor-container-string">
                <h4 className="h4-string-name">{stringNames[string - 1]}</h4>
                {noteState.strings[string].map((noteValue, position) => (
                    <input
                        key={`string-${string}-pos-${position}`}
                        type="text"
                        value={noteValue === "-" ? "" : noteValue}
                        placeholder="-"
                        className="input-note-edit"
                        id={position % 4 == 0 ? "input-background-bar" : undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNoteChange(string, position, e.target.value)}
                        maxLength={2}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="div-tab-editor-main-container">
            <TopAppBar noteState={noteState}/>
            <h3>Note Editor</h3>
            {Array.from({length: 6}, (_, i) => renderStringFields(i + 1))}
            <div className="tablature-display">
                <pre>{tablatureDisplay}</pre>
            </div>
        </div>
    );
};

export default TabCreator;
