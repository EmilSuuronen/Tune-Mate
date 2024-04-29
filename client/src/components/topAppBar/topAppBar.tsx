import React, {useState} from "react";
import './topAppBar.css'

function TopAppBar() {

    const [formData, setFormData] = useState({
        tab_name: '',
        tab_tempo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='div-top-app-bar-main'>
            <h2 className="top-app-bar-main-text">TuneMate</h2>
            <input name="name" value={formData.tab_name} onChange={handleChange} className='input-project-name' placeholder="name"/>
            <input name="tempo" value={formData.tab_tempo} onChange={handleChange} className='input-project-tempo' placeholder="name"/>
            <button className="button-color">Save</button>
        </div>
    );
}

export default TopAppBar;
