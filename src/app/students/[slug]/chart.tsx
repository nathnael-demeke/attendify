// components/ChartComponent.js
import React from 'react';
import { Chart } from 'react-google-charts';
import style from "./page.module.css";

const data = [
    ['Month', 'Present', 'Absent'],
    ['January', 20, 5],
    ['February', 27, 2],
    ['March', 22, 0],
    ['April', 17, 7],
    ['May', 20, 5],
    ['June', 27, 2],
    ['July', 22, 0],
    ['August', 17, 7],
];
const getCSSVariable = (variable: any) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  };

const options = {
    title: 'Student\'s Absence and presence Chart',
    curveType: 'function',
    legend: { position: 'bottom' },
    intervals: { style: "area" },
    backgroundColor: "transparent",
    legendTextStyle: { color: getCSSVariable('--text-200') },
    titleTextStyle: { color: getCSSVariable('--text-100') },
    series: {
        0: { color: getCSSVariable('--link-100'), lineWidth: 4 },
        1: { color: getCSSVariable('--danger-100'), lineWidth: 4 },
    },
    chartArea: {
      backgroundColor: "transparent",
      width: "90%",
      height: "70%",
      left: "5%",
      top: "10%"
    },
    hAxis: {
        title: "Months",
        textStyle: { color: getCSSVariable('--text-100') },
        titleTextStyle: { color: getCSSVariable('--text-100') },
        gridlines: { color: getCSSVariable('--secondary-000') },
        minorGridlines: { color: getCSSVariable('--secondary-000') },
    },
    vAxis: {
        title: "Days",
        textStyle: { color: getCSSVariable('--text-100') },
        titleTextStyle: { color: getCSSVariable('--text-100') },
        gridlines: { color: getCSSVariable('--secondary-500') },
        minorGridlines: { color: getCSSVariable('--secondary-300') },
    },
};

const ChartComponent = () => {
    return (
        <div className={style.chart_container}>
            <Chart
                chartType="LineChart"
                width="100%"
                height="600px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default ChartComponent;
