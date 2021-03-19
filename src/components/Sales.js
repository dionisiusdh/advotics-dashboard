import React from 'react';

import downArrow from "../assets/icon-down-arrow.svg";
import sales from "../assets/sales.svg"
import more from "../assets/icon-more.svg"

import "./Sales.css"

export default function Sales() {
    return (
        <div className="sales-container">
            <div className="sales-text">
                <a>Sales Turnover</a>
                <div className="sales-statistics">
                    <a style={{fontSize:"30px", color:"#4D4D4D", fontWeight:"bold", margin:"10px 0"}}>Rp 3,600,000</a>
                    <div className="sales-desc">
                        <img className="icon down-arrow" src={downArrow} alt="down-arrow"/>
                        <a style={{color:"red", fontWeight:"bold", margin:"5px"}}>13.8%</a>
                        <a style={{fontSize:"12px"}}>last period in products sold</a>
                    </div>
                </div>
            </div>
            <div className="sales-img">
                <div className="sales-more"><img className="icon-more" src={more} alt="more" /></div>
                <img className="logo-sales" src={sales} alt="sales" />
            </div>
        </div>
    )
}
