import React, {useEffect, useState} from 'react';
import SideNav from "../../components/sidenav/sidenav";
import './dashboard.css'
import ButtonCreateNew from "../../components/buttonCreateNew/buttonCreateNew";
import {useQuery} from "@apollo/client";
import {FIND_TAB_BY_USER} from "../graphql/tabTypes";
import ItemCard from "../../components/dashBoardItemCard/dashBoardItemCard";
import Tab from "../tabCreator/TabInterface";
import Tuning from "../tuning/TuningInterface";
import {AppCard} from "../../components/appCard/appCard";
import {TabAppCard} from "../../components/appCard/tabAppCard";
import {TuningAppCard} from "../../components/appCard/tuningAppCard";
import {FIND_TUNING_BY_USER} from "../graphql/tuningTypes";
import isLoggedIn from "../../script/isLoggedIn";
import TuningItem from "../../components/dashBoardItemCard/tuningItemCard";

function DashBoard() {
    const userId = localStorage.getItem("currentUser");
    const [tabsByUser, setTabsByUser] = useState<Tab[]>([]);
    const [tuningsByUser, setTuningsByUser] = useState<Tuning[]>([]);

    const {loading: loadingTabs, data: tabsData, refetch: refetchTabs} = useQuery(FIND_TAB_BY_USER, {
        variables: {input: {input: userId}}
    });

    const {loading: loadingTunings, data: tuningsData, refetch: refetchTunings} = useQuery(FIND_TUNING_BY_USER, {
        variables: {input: {id: userId}}
    });

    useEffect(() => {
        if (tabsData && tabsData.findTabsByOwner) {
            setTabsByUser(tabsData.findTabsByOwner);
        }
        if (tuningsData && tuningsData.findTuningsByOwner) {
            setTuningsByUser(tuningsData.findTuningsByOwner);
        }
    }, [tabsData, tuningsData]);

    useEffect(() => {
        refetchTabs();
        refetchTunings();
    }, []);

    if (loadingTabs || loadingTunings) return <p>Loading...</p>;

    return (
        <div className="div-dashboard-flex">
            <SideNav/>
            <div className="div-dashboard-flex-vertical">
                <h1 className="dashboard-main-title">Welcome to TuneMate, {isLoggedIn() ? localStorage.getItem("currentUserName") : " Quest"}</h1>
                <div className="div-dashboard-section">
                    <h2>Apps</h2>
                    <div className="div-tab-cards-horizontal" id="apps">
                        <AppCard/>
                        <TabAppCard/>
                        <TuningAppCard/>
                    </div>
                </div>
                <div className="div-dashboard-section">
                    <h2>Tabs</h2>
                    <div className="div-tab-cards-horizontal">
                        <ButtonCreateNew navLocation="/tabCreator"/>
                        {tabsByUser.length < 1 ? (
                            <i className="info-text-nocontent">{isLoggedIn() ? "No tabs yet. Get started by creating one" : "Log in to save tabs"}</i>) : (
                            <div className="div-tab-cards-vertical">
                                <div className="div-item-card-main" id="titles">
                                    <div className="div-item-card-element" id="name">
                                        <b className="item-card-name" id="titles">Name</b>
                                    </div>
                                    <div className="div-item-card-element" id="tempo">
                                        <b>tempo</b>
                                    </div>
                                    <div className="div-item-card-element" id="delete">
                                    </div>
                                </div>
                                {tabsByUser.map((tab) => (
                                    <ItemCard key={tab.id} cardData={tab}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="div-dashboard-section">
                    <h2>Tunings</h2>
                    <div className="div-tab-cards-horizontal">
                        <ButtonCreateNew navLocation="/tuningCreator"/>
                        {tuningsByUser.length < 1 ? (
                            <i className="info-text-nocontent">{isLoggedIn() ? "No tunings yet. Get started by creating one" : "Log in to save tunings"}</i>) : (
                            <div className="div-tab-cards-vertical">
                                <div className="div-item-card-main" id="titles">
                                    <div className="div-item-card-element" id="name">
                                        <b className="item-card-name" id="titles">Name</b>
                                    </div>
                                    <div className="div-item-card-element" id="delete">
                                    </div>
                                </div>
                                {tuningsByUser.map((tuning) => (
                                    <TuningItem key={tuning.id} cardData={tuning}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
