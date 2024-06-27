"use client";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import FinancialSummary from "./financialsummary";

const ClientSummary = () => {
  const [series] = useState([
    {
      name: "Pamba Clients",
      data: [],
      fill: {},
    },
    {
      name: "Walk-ins Clients",
      data: [],
      fill: {},
    },
  ]);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "Page Statistics",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (
        val: string,
        opts: {
          w: { globals: { series: { [x: string]: { [x: string]: string } } } };
          seriesIndex: string | number;
          dataPointIndex: string | number;
        }
      ) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: string) {
              return val + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (val: string) {
              return val + " per session";
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <FinancialSummary
      title="Client Management"
      line1="Pamba Clients"
      line2="Walk-ins Clients"
    />
  );
};

export default ClientSummary;
