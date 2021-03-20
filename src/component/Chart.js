import React from 'react'
import { Bar } from 'react-chartjs-2';

import more from "../assets/icon-more.svg"
import arrow from "../assets/icon-arrow-gray.png"

import "./Chart.css"

export default function Chart() {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <div className="chart-title">
                    <a style={{fontSize:'20px'}}>AVERAGE PURCHASE VALUE</a>
                </div>
                <div className="chart-menu">
                    <div className="chart-dropdown">
                        <a style={{fontSize:'12px'}}>Last 6 Months</a>
                        <img className="icon-arrow" src={arrow} alt="dropdown" />
                    </div>
                    <img className="icon-more" src={more} alt="more" />
                </div>
            </div>
            <div className="chart-bar">
                <Bar
                    data={{
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [
                        {
                            label: 'Line',
                            data : [20000, 15000, 12000, 10000, 12000, 14000, 21000],
                            data1 : [20000, 15000, 12000, 10000, 12000, 14000, 21000],
                            data2 : [19000, 13000, 11000, 9000, 10000, 11000, 20000],
                            data3 : [17000, 14000, 8000, 5000, 9000, 5000, 18000],
                            data4 : [10.0, 9.9, 5.7, 6.3, 4.6, 8.9, 12.2],
                            type: 'line',
                            fill: false,
                            borderColor: '#FFE854',
                            pointBorderColor: '#FFE854',
                            pointBackgroundColor: '#FFE854',
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                        {
                            label: 'Penjualan',
                            data : [20000, 15000, 12000, 10000, 12000, 14000, 21000],
                            data1 : [20000, 15000, 12000, 10000, 12000, 14000, 21000],
                            data2 : [19000, 13000, 11000, 9000, 10000, 11000, 20000],
                            data3 : [17000, 14000, 8000, 5000, 9000, 5000, 18000],
                            data4 : [10.0, 9.9, 5.7, 6.3, 4.6, 8.9, 12.2],
                            backgroundColor:'#37B04C',
                        }
                        ],
                    }}

                    width={50}
                    height={300}

                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        legend: {
                            position: 'bottom',
                            display: false
                        },
                        scales: { 
                            xAxes: [
                                {
                                    barThickness : 30,
                                    gridLines: { 
                                    display: false 
                                    }
                                },
                            ], 
                            yAxes: [
                                { 
                                    gridLines: { 
                                        display: false 
                                    },
                                    ticks: {
                                        max: 25000,
                                        stepSize: 5000,
                                        beginAtZero: true,
                                        callback: function(label, index, labels) {
                                            return label/1000+'K';
                                        }
                                    },
                                }
                            ] 
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                        
                                title: function(tooltipItem, data) {
                                    return data.labels[tooltipItem[0].index];
                                },
                        
                                beforeLabel: function(tooltipItem, data) {
                                    if (tooltipItem.datasetIndex === 0) {
                                        return (
                                            'Gross: ' + data.datasets[tooltipItem.datasetIndex].data1[tooltipItem.index] + 
                                            '\nNett: ' + data.datasets[tooltipItem.datasetIndex].data2[tooltipItem.index] +
                                            '\nAPV: ' + data.datasets[tooltipItem.datasetIndex].data3[tooltipItem.index] +
                                            '\nUPV: ' + data.datasets[tooltipItem.datasetIndex].data4[tooltipItem.index]
                                        );
                                    }
                                },

                                label: function(tooltipItem, data) {
                                    return '';
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className="chart-legend">
                <a className="legend-item small"><div className="legend-point" style={{backgroundColor:'#37B04C'}}/>Nett</a>
                <a className="legend-item small"><div className="legend-point" style={{backgroundColor:'#289E45'}}/>Gross</a>
                <a className="legend-item"><div className="legend-point" style={{backgroundColor:'#7AE28C'}}/>Average Purchase Value</a>
                <a className="legend-item"><div className="legend-point" style={{backgroundColor:'#707070'}}/>Unit per Transaction</a>
            </div>
        </div>
    )
}
