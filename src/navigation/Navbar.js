import React from 'react';
import './Navbar.css';
import advoticsLogo from "../assets/advotics-logo.jpg";
import profile from "../assets/icon-profile.svg";
import logout from "../assets/icon-logout.png";

export default function Navbar() {
    return (
        <div className="nav">
            <div className="nav-container left">
                <img className="nav-logo" src={advoticsLogo} alt="logo"/>
                <a style={{fontSize:"10px"}}>powered by</a>
                <img className="nav-logo small" src={advoticsLogo} alt="logo" />
            </div>
            <div className="nav-container right">
                <div className="nav-user">
                    <a>Username</a>
                    <a style={{fontSize:"10px"}}>Company Name</a>
                </div>
                <div className="nav-profile-container">
                    <img className="nav-profile" src={profile} alt="profile" />
                </div>
                <div className="nav-logout-container">
                    <img className="nav-logout" src={logout}  alt="logout" />
                </div>
            </div>
        </div>
    )
}
