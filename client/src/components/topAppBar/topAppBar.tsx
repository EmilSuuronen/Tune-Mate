import React, {useState} from "react";
import './topAppBar.css'
import {useMutation} from "@apollo/client";
import {CREATE_TAB} from "../../views/graphql/tabTypes";

function TopAppBar(noteState: any) {

    const [formData, setFormData] = useState({
        name: '',
        tempo: '',
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
        const string1 = noteState.noteState.strings[1]
        const string2 = noteState.noteState.strings[2]
        const string3 = noteState.noteState.strings[3]
        const string4 = noteState.noteState.strings[4]
        const string5 = noteState.noteState.strings[5]
        const string6 = noteState.noteState.strings[6]
        try {
            await createTab({ variables: { input: formData, string1, string2, string3, string4, string5, string6} });
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className='div-top-app-bar-main'>
            <h2 className="top-app-bar-main-text">TuneMate</h2>
            <form onSubmit={handleOnSaveClick}>
                <input name="name" value={formData.name} onChange={handleChange} className='input-project-name'
                       placeholder="name"/>
                <input name="tempo" value={formData.tempo} onChange={handleChange} className='input-project-tempo'
                       placeholder="tempo"/>
                <button className="button-color" type="submit">Save</button>
            </form>
        </div>
    );
}

export default TopAppBar;
