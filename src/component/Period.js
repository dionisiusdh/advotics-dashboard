import React, { useRef, useEffect, useState } from 'react';

import './Period.css';

import calendar from '../assets/icon-calendar.png';
import arrow from '../assets/icon-arrow-gray.png';
import close from '../assets/icon-close.jpg';

export default function Period() {
    const [active, setActive] = useState(false);
    const [startPeriod, setStartPeriod] = useState('11 September 2018');
    const [endPeriod, setEndPeriod] = useState('14 September 2018');

    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef);

    const handlePeriodActive=()=>{
        setActive(!active);
    }

    function useOutsideClose(ref) {
        // Close component if a click happens outside it
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActive(false);
                }
            }

            // Bind event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind event listener
                document.removeEventListener("mousedown", handleClickOutside);
                };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef} className="period">
            <div className="period-menu">
                <div className="period-title">
                    <img className="icon-calendar" src={calendar} alt="calendar"/>
                    <a style={{fontSize:'16px', color:'#8B8B8B'}}>Period</a>
                </div>
                <div className="period-period" onClick={handlePeriodActive}>
                    <a className="period-range">{active ? '' : startPeriod + ' - ' + endPeriod }</a>
                    { active ? <img className="icon-arrow-period" src={close} alt="icon"/> : <img className="icon-arrow-period" src={arrow} alt="icon"/> }
                </div>
            </div>
            {active ?
                <div className="period-dropdown">

                </div> 

                :

                <div/>
            }
        </div>
    )
}
