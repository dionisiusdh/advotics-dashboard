import React, { useRef, useEffect, useState } from 'react';

import Calendar from 'react-calendar';

import './Period.css';
import './Calendar.css';

import calendar from '../assets/icon-calendar.png';
import arrow from '../assets/icon-arrow-gray.png';
import close from '../assets/icon-close.jpg';

export default function Period() {
    
    const oneDay = 24 * 60 * 60 * 1000;

    var initActiveDate = new Array();
    initActiveDate.push(new Date(Date.now() - 7 * oneDay));
    initActiveDate.push(new Date(Date.now() - oneDay));

    var initPeriod = ' ';

    for (var i=0; i<2; i++) {
        initPeriod += initActiveDate[i].getDate() + ' ';
        initPeriod += initActiveDate[i].toLocaleString('default', { month: 'long' }) + ' ';
        initPeriod += initActiveDate[i].getFullYear();
        if (i == 0) initPeriod += ' - ';
    }

    const [active, setActive] = useState(false);
    const [realPeriod, setRealPeriod] = useState(initPeriod);
    const [tempPeriod, setTempPeriod] = useState(initPeriod);

    const [startCalendar, setStartCalendar] = useState(initActiveDate[0]);
    const [endCalendar, setEndCalendar] = useState(initActiveDate[1]);
    const [filter, setFilter] = useState(7);                                     // Default filter period
    const [activeDate, setActiveDate] = useState(initActiveDate);                // Active date range

    const [startCustomCalendar, setStartCustomCalendar] = useState(new Date());
    const [endCustomCalendar, setEndCustomCalendar] = useState(new Date());
    const [customActive, setCustomActive] = useState(false);                           
    const [customDateActive, setCustomDateActive] = useState(initActiveDate);    // Active custom date range 

    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef);

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

    const handleStartChange = date => {
        setStartCalendar(date);
    }

    const handleEndChange = date => {
        setEndCalendar(date);
    }

    const handleFilterChange = filter => {
        if (filter == 0) {
            // Today
            setFilter(filter);
            setStartCalendar(new Date());
            setEndCalendar(new Date());
            setActiveDate([new Date(), new Date()]);
            
            // Change temp period
            var newTempPeriod = ' ';

            newTempPeriod += new Date().getDate() + ' ';
            newTempPeriod += new Date().toLocaleString('default', { month: 'long' }) + ' ';
            newTempPeriod += new Date().getFullYear();

            setTempPeriod(newTempPeriod);

            return;
        } else if (filter == 99) {
            // This month
            setCustomActive(false);
            setFilter(filter);
            var todayMonth = new Date().getMonth();
            var todayYear = new Date().getFullYear();
            setActiveDate([new Date(todayYear, todayMonth, 1), new Date()]);

            var initActiveDate = new Array();
            initActiveDate.push(new Date(todayYear, todayMonth, 1));
            initActiveDate.push(new Date());
            
            // Change temp period
            var initPeriod = ' ';
        
            for (var i=0; i<2; i++) {
                initPeriod += initActiveDate[i].getDate() + ' ';
                initPeriod += initActiveDate[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += initActiveDate[i].getFullYear();
                if (i == 0) initPeriod += ' - ';
            }

            setTempPeriod(initPeriod);

            return;
        } else if (filter == 100) {
            // Custom
            setCustomActive(true);
            setFilter(filter);

            var activeDateList = new Array();
            activeDateList.push(startCustomCalendar);
            activeDateList.push(endCustomCalendar);

            setCustomDateActive(activeDateList);

            // Change temp period
            var initPeriod = ' ';
        
            for (var i=0; i<2; i++) {
                initPeriod += activeDateList[i].getDate() + ' ';
                initPeriod += activeDateList[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += activeDateList[i].getFullYear();
                if (i == 0) initPeriod += ' - ';
            }

            setTempPeriod(initPeriod);

            return;
        } else {
            // Other filters
            setFilter(filter);
            setActiveDate(new Array());
            setCustomActive(false);
            
            // Mark calendar based on filter
            var activeDateList = new Array();
            
            // Change active date list state
            activeDateList.push(new Date(Date.now() - filter * oneDay));
            activeDateList.push(new Date(Date.now() - oneDay));
            setActiveDate(activeDateList);

            // Change temp period
            var initPeriod = ' ';
        
            for (var i=0; i<2; i++) {
                initPeriod += activeDateList[i].getDate() + ' ';
                initPeriod += activeDateList[i].toLocaleString('default', { month: 'long' }) + ' ';
                initPeriod += activeDateList[i].getFullYear();
                if (filter == 1) break;
                if (i == 0) initPeriod += ' - ';
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
                if (i == 0) {
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
                if (i == 0) {
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
                            <div className={filter == 0 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(0)}>
                                <a>Today</a>
                            </div>
                            <div className={filter == 1 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(1)}>
                                <a>Yesterday</a>
                            </div>
                            <div className={filter == 7 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(7)}>
                                <a>Last 7 days</a>
                            </div>
                            <div className={filter == 30 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(30)}>
                                <a>Last 30 days</a>
                            </div>
                            <div className={filter == 99 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(99)}>
                                <a>This month</a>
                            </div>
                            <div className={filter == 100 ? `prd-selector-items active` : `prd-selector-items`} onClick={() => handleFilterChange(100)}>
                                <a>Custom</a>
                            </div>
                            <div className='prd-selector-button' onClick={handleApply}>
                                <a>Apply</a>
                            </div>
                        </div>
                        <div className='prd-calendar'>
                            <a className="notes">Start date</a>
                            <div className={customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={handleStartChange} 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={activeDate}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date()}
                                    selectRange={true}
                                />
                            </div>
                            <div className={!customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={(date) => setStartCustomCalendar(date)} 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={customDateActive}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date()}
                                    selectRange={false}
                                />
                                <a className="notes">* On custom mode, please double click on the date to select the date</a>
                            </div>
                            <div className="legend">
                                <div className="legend-item">
                                    <div className="circle yellow"></div>
                                    <a className="notes">Today's date</a>
                                </div>
                                <div className="legend-item">
                                    <div className="circle green"></div>
                                    <a className="notes">Selected date</a>
                                </div>
                            </div>
                        </div>
                        <div className='prd-calendar'>
                            <a className="notes">End date</a>
                            <div className={customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={handleEndChange}
                                    onClickDay={() => handleFilterChange(100)}
                                    value={activeDate}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date()}
                                    selectRange={true}
                                />
                            </div>
                            <div className={!customActive ? 'hidden' : ''}>
                                <Calendar 
                                    onChange={(date) => setEndCustomCalendar(date)} 
                                    onClickDay={() => handleFilterChange(100)}
                                    value={customDateActive}
                                    minDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
                                    maxDate={new Date()}
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
