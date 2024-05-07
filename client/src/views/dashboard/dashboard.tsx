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
import TuningItem from "../../components/dashBoardItemCard/tuningItemCard";

function DashBoard() {
    const userId = localStorage.getItem("currentUser");
    const [tabsByUser, setTabsByUser] = useState<Tab[]>([]);
    const [tuningsByUser, setTuningsByUser] = useState<Tuning[]>([]);

    if (userId) {
        console.log("userId " + userId);
    }

    const {loading: loadingTabs, data: tabsData} = useQuery(FIND_TAB_BY_USER, {
        variables: {input: {input: userId}}
    });

    const {loading: loadingTunings, data: tuningsData} = useQuery(FIND_TUNING_BY_USER, {
        variables: {input: {id: userId}}
    });

    useEffect(() => {
        if (tabsData && tabsData.findTabsByOwner) {
            setTabsByUser(tabsData.findTabsByOwner);
        }
        if (tuningsData && tuningsData.findTuningsByOwner) {
            setTuningsByUser(tuningsData.findTuningsByOwner);
        }
        console.log("tuningsbyOwner" + JSON.stringify(tuningsByUser))
    }, [tabsData, tabsByUser, tuningsData, tuningsByUser]);

    if (loadingTabs || loadingTunings) return <p>Loading...</p>;

    return (
        <div className="div-dashboard-flex">
            <SideNav/>
            <div className="div-dashboard-flex-vertical">
                <h1>Welcome to TuneMate{", " + localStorage.getItem("currentUserName")}</h1>
                <h2>Apps</h2>
                <div className="div-tab-cards-horizontal" id="apps">
                    <AppCard/>
                    <TabAppCard/>
                    <TuningAppCard/>
                </div>
                <h2>Tabs</h2>
                <div className="div-tab-cards-horizontal">
                    <ButtonCreateNew/>
                    {tabsByUser.length < 1 ? (
                        <i> No tabs yet. Get started by creating one.</i> ) : (
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
                <h2>Tunings</h2>
                <div className="div-tab-cards-horizontal">
                    <ButtonCreateNew/>
                    {tuningsByUser.length < 1 ? (
                        <i> No tabs yet. Get started by creating one.</i> ) : (
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
                <h2>Chords</h2>
                <ButtonCreateNew/>
            </div>
        </div>
    );
}

export default DashBoard;
