import React, {useState} from "react";
import './topAppBar.css'
import {useMutation} from "@apollo/client";
import {CREATE_TAB} from "../../views/graphql/tabTypes";

function TopAppBar(noteState: any) {

    const [formData, setFormData] = useState({
        name: '',
        tempo: 120,
        string1: noteState.noteState.strings[1],
        string2:  noteState.noteState.strings[2],
        string3: noteState.noteState.strings[3],
        string4: noteState.noteState.strings[4],
        string5: noteState.noteState.strings[5],
        string6: noteState.noteState.strings[6],
    });

    const [createTab, { data, loading, error }] = useMutation(CREATE_TAB);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
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
        })

        console.log(formData)
        try {
            await createTab({ variables: { input: formData} });
        } catch (err) {
            console.error('Error creating Tablature:', err);
            console.log()
        }
    };

    return (
        <div className='div-top-app-bar-main'>
            <h2 className="top-app-bar-main-text">TuneMate</h2>
            <form onSubmit={handleOnSaveClick}>
                <input name="name" value={formData.name} onChange={handleChange} className='input-project-name'
                       placeholder="name"/>
                <input name="tempo" type="number" value={formData.tempo} onChange={handleChange} className='input-project-tempo'
                       placeholder="tempo"/>
                <button className="button-color" type="submit">Save</button>
            </form>
        </div>
    );
}

export default TopAppBar;
