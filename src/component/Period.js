import React, { useRef, useEffect, useState } from 'react';

import Calendar from 'react-calendar';

import './Period.css';
import './Calendar.css';

import calendar from '../assets/icon-calendar.png';
import arrow from '../assets/icon-arrow-gray.png';
import close from '../assets/icon-close.jpg';

export default function Period() {
    
    // Date constant
    var oneDay = 24 * 60 * 60 * 1000;
    var today = new Date(Date.now());
    var yesterday = new Date(new Date() - oneDay);
    var minDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);     // Min range, 6 months ago

    // Initiate object for state
    var initActiveDate = [];
    initActiveDate.push(new Date(Date.now() - 7 * oneDay));
    initActiveDate.push(new Date(Date.now() - oneDay));

    var initPeriod = getInitPeriod(initActiveDate);

    // For outside box click handling
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef);

    const [active, setActive] = useState(false);                                 // Dropdown active status
    const [realPeriod, setRealPeriod] = useState(initPeriod);                    // Temporary period
    const [tempPeriod, setTempPeriod] = useState(initPeriod);                    // Real shown period

    const [filter, setFilter] = useState(7);                                     // Default filter period
    const [activeDate, setActiveDate] = useState(initActiveDate);                // Active date range

    const [startCustomCalendar, setStartCustomCalendar] = useState(yesterday);   // Start date on custom calendar
    const [endCustomCalendar, setEndCustomCalendar] = useState(yesterday);       // End date on custom calendar
    const [customActive, setCustomActive] = useState(false);                     // Custom active status
    const [customDateActive, setCustomDateActive] = useState(initActiveDate);    // Active custom date range 

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

    function getInitPeriod(initActiveDate) {
        // Get initial period which is 7 days by default
        var initPeriod = ' ';

        for (var i=0; i<2; i++) {
            initPeriod += initActiveDate[i].getDate() + ' ';
            initPeriod += initActiveDate[i].toLocaleString('default', { month: 'long' }) + ' ';
            initPeriod += initActiveDate[i].getFullYear();
            if (i === 0) initPeriod += ' - ';
        }

        return initPeriod;
    }

    const handleFilterChange = filter => {
        if (filter === 99) {
            // This month
            setCustomActive(false);
            setFilter(filter);

            var todayMonth = yesterday.getMonth();
            var todayYear = yesterday.getFullYear();
            setActiveDate([new Date(new Date(todayYear, todayMonth, 1)), yesterday]);

            var initActiveDate = [];
            initActiveDate.push(new Date(new Date(todayYear, todayMonth, 1)));
            initActiveDate.push(yesterday);
            
            // Change temp period
            var initPeriod = ' ';
        
            for (var i=0; i<2; i++) {
                initPeriod += initActiveDate[i].getDate() + ' ';
                initPeriod += initActiveDate[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += initActiveDate[i].getFullYear();
                if (i === 0) initPeriod += ' - ';
            }

            setTempPeriod(initPeriod);

            return;
        } else if (filter === 100) {
            // Custom
            setCustomActive(true);
            setActiveDate(initActiveDate);
            
            var dateDiff = ((endCustomCalendar.getDate() - startCustomCalendar.getDate())*100000/(3600*24)) + (30 * (endCustomCalendar.getMonth() - startCustomCalendar.getMonth()));
            var yesterdayCondition = startCustomCalendar.getDate() === yesterday.getDate() && endCustomCalendar.getDate() === yesterday.getDate() && startCustomCalendar.getMonth() === yesterday.getMonth();

            if (startCustomCalendar.getDate() === 1 && startCustomCalendar.getMonth() === endCustomCalendar.getMonth() && endCustomCalendar.getDate() === yesterday.getDate()) {
                // This month
                setFilter(99);
            } else if (yesterdayCondition) {
                // Yesterday
                setFilter(1);
            } else if (dateDiff < 7.5  && dateDiff > 6.5 && endCustomCalendar.getDate() === yesterday.getDate() && endCustomCalendar.getMonth() === yesterday.getMonth()) {
                // Last 7 days
                setFilter(7);
            } else if (dateDiff < 31.5 && dateDiff > 29.5 && endCustomCalendar.getDate() === yesterday.getDate() && endCustomCalendar.getMonth() === yesterday.getMonth()) {
                // Last 30 days
                setFilter(30);
            } else {
                // Custom
                setFilter(filter);
            }

            setCustomActive(true);

            var activeDateList = new Array();
            activeDateList.push(startCustomCalendar);
            activeDateList.push(endCustomCalendar);

            setCustomDateActive(activeDateList);

            // Change temp period
            var initPeriod = ' ';
        
            for (i=0; i<2; i++) {
                initPeriod += activeDateList[i].getDate() + ' ';
                initPeriod += activeDateList[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += activeDateList[i].getFullYear();
                if (i === 0) initPeriod += ' - ';
            }

            setTempPeriod(initPeriod);

            return;
        } else {
            // Other filters
            setFilter(filter);
            setActiveDate(new Array());
            setCustomActive(false);
            setActiveDate(initActiveDate);
            
            // Mark calendar based on filter
            var activeDateList = new Array();
            
            // Change active date list state
            activeDateList.push(new Date(Date.now() - (filter) * oneDay));
            activeDateList.push(yesterday);
            setActiveDate(activeDateList);

            // Change temp period
            var initPeriod = ' ';
        
            for (var i=0; i<2; i++) {
                initPeriod += activeDateList[i].getDate() + ' ';
                initPeriod += activeDateList[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += activeDateList[i].getFullYear();
                if (filter === 1) break;
                if (i === 0) initPeriod += ' - ';
            }

            setTempPeriod(initPeriod);
        }
    }

    const handleApply = () => {
        if (!customActive) {
            var newPeriod = '';
            var d1 = new Date(activeDate[0].getTime());
            var d2 = new Date(activeDate[1].getTime());
    
            for (var i=0; i<2; i++) {
                newPeriod += activeDate[i].getDate() + ' ';
                newPeriod += activeDate[i].toLocaleString('default', { month: 'long' }) + ' ';
                newPeriod += activeDate[i].getFullYear();
                if (d1.getTime() === d2.getTime()) {
                    break;
                }
                if (i === 0) {
                    newPeriod += ' - ';
                }
            }
            setRealPeriod(newPeriod);
            setActive(false);
        } else {
            var newPeriod = '';
            var d1 = new Date(customDateActive[0].getTime());
            var d2 = new Date(customDateActive[1].getTime());
    
            for (var i=0; i<2; i++) {
                newPeriod += customDateActive[i].getDate() + ' ';
                newPeriod += customDateActive[i].toLocaleString('default', { month: 'long' }) + ' ';
                newPeriod += customDateActive[i].getFullYear();
                if (d1.getTime() === d2.getTime()) {
                    break;
                }
                if (i === 0) {
                    newPeriod += ' - ';
                }
            }
            setRealPeriod(newPeriod);
            setActive(false);
        }
    }

    return (
        <div ref={wrapperRef} className={active ? "period big" : "period"}>
            <div className="period-menu" onClick={() => setActive(!active)}>
                <div className="period-title">
                    <img className="icon-calendar" src={calendar} alt="calendar"/>
                    <a style={{fontSize:'16px', color:'#8B8B8B'}}>Period</a>
                </div>
                <div className="period-period">
                    <a className="period-range">
                        { active ? tempPeriod : realPeriod }   
                    </a>
                    { active ? <img className="icon-arrow-period" src={close} alt="icon"/> : <img className="icon-arrow-period" src={arrow} alt="icon"/> }
                </div>
            </div>
            <div>
            {active ?
                <div className="period-dropdown">
                    <div className='prd-container'>
                        <div className='prd-selector'>
                            <div className={filter === 1 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(1)}>
                                <a>Yesterday</a>
                            </div>
                            <div className={filter === 7 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(7)}>
                                <a>Last 7 days</a>
                            </div>
                            <div className={filter === 30 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(30)}>
                                <a>Last 30 days</a>
                            </div>
                            <div className={filter === 99 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(99)}>
                                <a>This month</a>
                            </div>
                            <div className={filter === 100 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(100)}>
                                <a>Custom</a>
                            </div>
                            <div className='prd-selector-button' onClick={handleApply}>
                                <a>Apply</a>
                            </div>
                        </div>
                        <div className='prd-calendar'>
                            <a className="notes">Start date</a>
                            <div className={customActive ? 'hidden' : ''} onClick={()=>setCustomActive(true)}>
                                <Calendar 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={activeDate}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
                                    selectRange={true}
                                />
                            </div>
                            <div className={!customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={(date) => setStartCustomCalendar(date)} 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={customDateActive}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
                                    selectRange={false}
                                />
                                <a className="notes-2">* On custom mode, please double click on the date to select the date</a>
                            </div>
                            <a className="notes-2">
                                Current Date: 
                                { ' ' + today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear()}
                            </a>
                            <a className="notes-2">Available Date Range: 
                                { ' ' + minDate.getDate() + ' ' + minDate.toLocaleString('default', { month: 'long' }) + ' ' + minDate.getFullYear() + ' - ' + 
                                  yesterday.getDate() + ' ' + yesterday.toLocaleString('default', { month: 'long' }) + ' ' + yesterday.getFullYear() }
                            </a>
                        </div>
                        <div className='prd-calendar'>
                            <a className="notes">End date</a>
                            <div className={customActive ? 'hidden' : ''} onClick={()=>setCustomActive(true)}>
                                <Calendar 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={activeDate}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
                                    selectRange={true}
                                />
                            </div>
                            <div className={!customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={(date) => setEndCustomCalendar(date)} 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={customDateActive}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
                                    selectRange={false}
                                />
                            </div>
                        </div>
                    </div>
                </div> 
                :
                <div/>
            }  
            </div>
        </div>
    )
}
