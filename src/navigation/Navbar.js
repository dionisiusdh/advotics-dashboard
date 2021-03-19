import React from 'react';
import '../styles/Navbar.css';
import advotics_logo from "../assets/advotics-logo.jpg";
import profile from "../assets/profile.svg";
import logout from "../assets/logout.png";

export default function Navbar() {
    return (
        <div className="nav">
            <div className="nav-container left">
                <img className="nav-logo" src={advotics_logo} alt="logo"/>
                <a style={{fontSize:"10px"}}>powered by</a>
                <img className="nav-logo small" src={advotics_logo} alt="logo" />
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
