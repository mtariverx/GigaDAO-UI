import React from "react";
import { Line } from "react-chartjs-2";
import "./style.scss";
const MemberGraph = () => {
  const state = {
    labels: ["7 days", "30 days", "2 months", "3 months", "Custom"],
    datasets: [
      {
        // label: 'Rainfall',
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(21,241,149,1)",
        borderWidth: 1,
        data: [65, 859, 580, 1081, 856],
        pointBackgroundColor: "blue",
        pointRadius: 0,
      },
    ],
  };
  const legend = {
    display: false,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const options = {
    title: {
      display: true,
      // text: "Chart Title",
      // fontSize: 20,
      // fontColor: "#ffffff",
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          position: "right",
          // drawBorder: true,
          gridLines: {
            color: "rgba(21,241,149,1)",
          },
          grid: {
            drawBorder: false,
            color: "white",
          },
          ticks: {
            beginAtZero: true,

            fontColor: "white",
            fontSize: 12,
          },
        },
      ],
      xAxes: [
        {
          // drawBorder: true,
          gridLines: {
            color: "rgba(21,241,149,1)",
            drawOnChartArea: false,
          },
          grid: {
            display: false,
            drawBorder: true,
            color: "white",
          },
          ticks: {
            beginAtZero: false,
            fontColor: "rgba(21,241,149,1)",
          },
        },
      ],
    },
  };
  return (
    <div>
      <Line
        data={state}
        // legend={legend}
        options={options}
       
      />
    </div>
  );
};

export default MemberGraph;
