"use client";
import { useGetExpenses } from "@/app/api/expenses";
import { ApexOptions } from "apexcharts";
import ChartSummary from "./chartSummary";

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

const ExpenseSummary = () => {
  const { data } = useGetExpenses();

  const series = [
    {
      name: "Expenses",
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

  return (
    <ChartSummary
      title="Expense Management"
      line1="Expenses"
      options={options}
      series={series}
    />
  );
};

export default ExpenseSummary;
