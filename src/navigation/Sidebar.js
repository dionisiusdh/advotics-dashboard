import React from 'react';

import './Sidebar.css';

import menu from '../assets/icon-menu.jpg';
import icon from '../assets/icon-analysis.svg';

export default function Sidebar() {
    return (
        <div className='side'>
            <div clsasName='side-menu'>
                <img className='side-img' src={menu} alt='menu'/>
            </div>
            <div className='side-icon'>
                <img className='side-img2' src={icon} alt='icon'/>
            </div>
        </div>
    )
}
