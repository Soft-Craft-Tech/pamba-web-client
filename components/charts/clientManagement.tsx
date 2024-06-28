"use client";
import { ApexOptions } from "apexcharts";
import ChartSummary from "./chartSummary";
import { useAllAppointments } from "@/app/api/appointment";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#DB1471", "#007B99"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
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

const ClientSummary = () => {
  const { data } = useAllAppointments();
  
  const series = [
    {
      name: "Pamba Clients",
      data,
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
  ];
  if (data?.appointments.length === 0) {
    return <p className="text-center font-semibold">No data to display</p>;
  }
  return (
    <ChartSummary
      title="Client Management"
      line1="Pamba Clients"
      options={options}
      series={series}
    />
  );
};

export default ClientSummary;
