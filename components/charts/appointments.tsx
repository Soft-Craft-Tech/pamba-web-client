"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DynamicObject } from "../types";
import { all } from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface AppointmentsTableProps {
  all_appointments?: Array<DynamicObject>;
}

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
  },
  colors: ["#DB1471"],
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
    width: [2],
    curve: "smooth",
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
const AppointmentsTable = ({ all_appointments }: AppointmentsTableProps) => {
  const [state, setState] = useState({
    series: [
      {
        name: "All appointments",
        data: [] as number[],
      },
    ],
  });

  useEffect(() => {
    // Process the appointments data to count appointments per day
    const appointmentCounts = all_appointments
      ? all_appointments.reduce((acc, appointment) => {
          const date = appointment.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {})
      : [];

    // Convert the counts to a format suitable for the chart
    const chartData = Object.values(appointmentCounts);

    setState({
      series: [
        {
          name: "All appointments",
          data: chartData,
        },
      ],
    });
  }, [all_appointments]);

  return (
    <div className="rounded-xl border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div id="chartTwo" className="-ml-5">
        <ReactApexChart
          options={options}
          series={state.series}
          type="line"
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default AppointmentsTable;
