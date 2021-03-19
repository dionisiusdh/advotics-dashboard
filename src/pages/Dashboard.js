import React from 'react';

import Period from '../components/Period';
import Sales from "../components/Sales";

import help from "../assets/icon-help.png";
import arrow from "../assets/icon-arrow.png";

import "./Dashboard.css";
import ItemList from '../components/ItemList';
import Chart from '../components/Chart';

export default function Dashboard() {
    return (
        <div className="db">
            <div className="db-header">
                <div className="db-title">
                    <h1>Dashboard</h1>
                </div>
                <div className="db-period">
                    <Period />
                </div>
            </div>
            <div className="db-content">
                <div className="content-header">
                    <div className="content-header-title">
                        MARKET INSIGHTS 
                    </div>
                    <div className="content-header-help">
                        <img className="icon-help" src={help} alt="help"/>
                        <a style={{textDecoration:"underline", margin:"0 5px"}}>Click here for help</a>
                        <img className="icon-arrow"src={arrow} alt="arrow"/>
                    </div>
                </div>
                <div className="sales">
                    <Sales />
                </div>
                <div className="data">
                    <div className="chart">
                        <Chart />
                    </div>
                    <div className="best-selling">
                        <ItemList title="BEST SELLING SKU" />
                    </div>
                    <div className="top-competitor">
                        <ItemList title="TOP COMPETITOR SKU"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
