import React, {useEffect, useState} from 'react';
import SideNav from "../../components/sidenav/sidenav";
import './dashboard.css'
import ButtonCreateNew from "../../components/buttonCreateNew/buttonCreateNew";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_TAB_BY_USER} from "../graphql/tabTypes";
import {LOGIN_USER} from "../graphql/userTypes";

function DashBoard() {
    const userId = localStorage.getItem("currentUser");
    const [tabsByUser, setTabsByUser] = useState([]);

    if (!userId) {
        console.error("No user ID found in localStorage");
    }

    const { loading, error, data } = useQuery(FIND_TAB_BY_USER, {
        variables: { input: { input: userId } }
    });

    useEffect(() => {
        if (data && data.findTabsByOwner) { // Assuming 'findTabsByOwner' is the correct data structure
            setTabsByUser(data.findTabsByOwner);
            console.log("tabs:", data.findTabsByOwner);
        }
    }, [data, tabsByUser]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("GraphQL Error:", error.message);
        return <p>Error loading data!</p>;
    }
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
