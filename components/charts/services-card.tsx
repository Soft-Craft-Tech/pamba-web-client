"use client";
import ArrowUpIcon from "@/ui/icons/arrow-up";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#007B99", "#DB1471"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#fff",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
    min: 0,
    max: 100,
  },
};

const ServicesCharts = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Product One",
        data: [30, 40, 45, 50],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.0,
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: "#3C50E0",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#fff",
                opacity: 1,
              },
            ],
          },
        },
      },
    ],
  });
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5  sm:px-7.5 xl:col-span-8">
      <h1>Trends in Services</h1>
      <div className="flex flex-row justify-between">
        {/* Chart One */}
        <div className="max-w-[300px] p-10 border-r-2 flex flex-col gap-y-4">
          <h1 className="text-lg text-[#475467]">All Services</h1>
          <h1>400</h1>
          <div className="flex flex-row justify-between">
            <div>
              <div className="flex flex-row items-center gap-x-2">
                <ArrowUpIcon />
                <p className=" text-[#14B339] text-xs text-nowrap">10.25%</p>
              </div>
              <p className="text-xs text-nowrap">via last quareter</p>
            </div>
            <div>
              <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={64}
                width={"100%"}
              />
            </div>
          </div>
        </div>
        {/* Chart Two */}
        <div className="max-w-[300px] p-10 border-r-2 flex flex-col justify-between gap-y-4">
          <h1>All Services</h1>
          <h1>400</h1>
          <div className="flex flex-row justify-between">
            <div>
              <div className="flex flex-row items-center gap-x-2">
                <ArrowUpIcon />
                <p className=" text-[#14B339] text-xs text-nowrap">10.25%</p>
              </div>
              <p className="text-xs text-nowrap">via last quareter</p>
            </div>
            <div>
              <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={64}
                width={"100%"}
              />
            </div>
          </div>
        </div>
        {/* Chart Three */}
        <div className="max-w-[300px] p-10 flex flex-col gap-y-4">
          <h1>All Services</h1>
          <h1>400</h1>
          <div className="flex flex-row w-full justify-between">
            <div>
              <div className="flex flex-row items-center gap-x-2">
                <ArrowUpIcon />
                <p className=" text-[#14B339] text-xs text-nowrap">10.25%</p>
              </div>
              <p className="text-xs text-nowrap">via last quareter</p>
            </div>
            <div>
              <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={64}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCharts;
