import React, {useEffect, useState} from 'react';
import SideNav from "../../components/sidenav/sidenav";
import './dashboard.css'
import ButtonCreateNew from "../../components/buttonCreateNew/buttonCreateNew";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_TAB_BY_USER} from "../graphql/tabTypes";

function DashBoard() {
    const { data, loading, error } = useQuery(FIND_TAB_BY_USER, {
        variables: { input: localStorage.getItem("currentUser") }
    });
    const [tabsByUser, setTabsByUser] = useState([]);

    useEffect(() => {
        if (data && data.findTabsByOwner) {
            setTabsByUser(data.findTabsByOwner);
        }
        console.log(tabsByUser);
    }, [data]);  // Dependency array ensures this runs only when `data` changes

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
