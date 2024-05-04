import React, {useState} from 'react';
import SideNav from "../../components/sidenav/sidenav";
import './dashboard.css'
import ButtonCreateNew from "../../components/buttonCreateNew/buttonCreateNew";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../graphql/userTypes";
import {FIND_TAB_BY_USER} from "../graphql/tabTypes";

function DashBoard() {
    const [findTabsByOwner, {data, loading, error}] = useMutation(FIND_TAB_BY_USER);
    const [tabsByUser, setTabsByUser] = useState([]);

    useState(() => {
        try {
            const getTabsByUser = findTabsByOwner({variables: {input: localStorage.getItem("currentUser")}});
            console.log(getTabsByUser);
        } catch (err) {
            console.error('No tabs found yet by this user', err);
        }
    });

    return (
        <div>
            <div className="div-dashboard-flex">
                <SideNav/>
                <div className="div-dashboard-flex-vertical">
                    <h1>Welcome to TuneMate, User</h1>
                    <h2>Tabs</h2>
                    <ButtonCreateNew/>
                    <h2>Tunings</h2>
                    <ButtonCreateNew/>
                    <h2>Chords</h2>
                    <ButtonCreateNew/>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
