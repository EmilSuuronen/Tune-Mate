import React, {useEffect, useState} from 'react';
import SideNav from "../../components/sidenav/sidenav";
import './dashboard.css'
import ButtonCreateNew from "../../components/buttonCreateNew/buttonCreateNew";
import {useMutation, useQuery} from "@apollo/client";
import {FIND_TAB_BY_USER} from "../graphql/tabTypes";
import ItemCard from "../../components/dashBoardItemCard/dashBoardItemCard";
import Tab from "../tabCreator/TabInterface";

function DashBoard() {
    const userId = localStorage.getItem("currentUser");
    const [tabsByUser, setTabsByUser] = useState<Tab[]>([]);

    if (!userId) {
        console.error("No user ID found in localStorage");
    }

    const {loading, data} = useQuery(FIND_TAB_BY_USER, {
        variables: {input: {input: userId}}
    });

    useEffect(() => {
        if (data && data.findTabsByOwner) {
            setTabsByUser(data.findTabsByOwner);
        }
    }, [data, tabsByUser]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="div-dashboard-flex">
            <SideNav/>
            <div className="div-dashboard-flex-vertical">
                <h1>Welcome to TuneMate{", " + localStorage.getItem("currentUserName")}</h1>
                <h2>Tabs</h2>
                <div className="div-tab-cards-horizontal">
                    <ButtonCreateNew/>
                    {tabsByUser.map((tab) => (
                        <ItemCard key={tab.id} cardData={tab}/>
                    ))}
                </div>
                <h2>Tunings</h2>
                <ButtonCreateNew/>
                <h2>Chords</h2>
                <ButtonCreateNew/>
            </div>
        </div>
    );
}

export default DashBoard;
