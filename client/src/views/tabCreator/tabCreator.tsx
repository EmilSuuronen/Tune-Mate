import React, {useEffect, useState} from "react";
import Tablature from "./Tablature";
import './tabCreator.css';
import TopAppBar from "../../components/topAppBar/topAppBar";
import jsPDF from "jspdf";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_TAB_BY_ID} from "../graphql/tabTypes";
import SideNav from "../../components/sidenav/sidenav";
import styled from 'styled-components';

const TabCreator: React.FC = () => {
    const [noteState, setNoteState] = useState(new Tablature());
    const [tablatureDisplay, setTablatureDisplay] = useState<string>("");
    const tabId = useParams();

    const {loading, error, data} = useQuery(FIND_TAB_BY_ID, {
        variables: {input: {id: tabId.id}}
    });

    const updateNoteStateFromGraphQL = (tabData: any) => {
        const newNoteState = new Tablature();

        Object.keys(tabData).forEach(key => {
            if (key.startsWith('string') && Array.isArray(tabData[key])) {
                const stringIndex = parseInt(key.replace('string', ''), 10); // Converts 'string1' to 1
                tabData[key].forEach((note: string, index: number) => {
                    if (note !== null) {
                        newNoteState.setNote(stringIndex, index, note);
                    }
                });
            }
            newNoteState.setProperties(tabData.name, tabData.tempo)
        });
        return newNoteState;
    };

    useEffect(() => {
        if (data && data.findTabById) {
            const updatedNoteState = updateNoteStateFromGraphQL(data.findTabById);
            setNoteState(updatedNoteState);
            setTablatureDisplay(updatedNoteState.toString()); // Update this method if necessary
        }
    }, [data]);

    const handleNoteChange = (string: number, position: number, value: string) => {
        noteState.setNote(string, position, value);

        const newNoteState = new Tablature();

        // Copy all existing notes into the new instance.
        for (let i = 1; i <= 6; i++) {
            newNoteState.strings[i] = [...noteState.strings[i]];
        }

        setNoteState(newNoteState); // Set the new instance as state.
        setTablatureDisplay(noteState.toString());
    };

    const stringNames = ["E", "A", "D", "G", "B", "e"];

    function downloadPdfFile(tablatureDisplay: string) {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text(tablatureDisplay, 10, 10); // Adjust x, y coordinates as needed
        doc.save('tablature.pdf');
    }

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
                        id={position % 4 === 0 ? "input-background-bar" : undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNoteChange(string, position, e.target.value)}
                        maxLength={2}
                    />
                ))}
            </div>
        );
    };

    const StyledPre = styled.pre`
      span.small {
        font-size: 0.5em; // half size for double character notes
      }

      span.regular {
        font-size: 1em; // regular size for single character notes
      }
    `;

    const TablatureDisplay = (tablatureDisplay: any) => (
        <StyledPre dangerouslySetInnerHTML={{__html: tablatureDisplay}}/>
    );

    if (loading) return <p>Loading...</p>;

    console.log(tablatureDisplay);


    return (
        <div className="tab-editor-full-container">
            <SideNav/>
            <div className="div-tab-editor-main-container">
                <TopAppBar noteState={noteState}/>
                <h3>Note Editor</h3>
                {Array.from({length: 6}, (_, i) => renderStringFields(i + 1))}
                <div className="tablature-display">
                    <StyledPre dangerouslySetInnerHTML={{ __html: tablatureDisplay }} />
                    <button className="button-color" onClick={() => downloadPdfFile(tablatureDisplay)}>Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TabCreator;
