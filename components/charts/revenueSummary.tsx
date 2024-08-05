"use client";
import { useGetSalesAnalysis } from "@/app/api/revenue";
import { ApexOptions } from "apexcharts";
import ChartSummary from "./chartSummary";
import { LifetimeSale } from "../types";
import dayjs from "dayjs";

const RevenueSummary = () => {
  const { data } = useGetSalesAnalysis();

  const monthlyTotalPrices = data?.lifetime_sales.reduce(
    (acc: { [x: string]: any; }, item: LifetimeSale) => {
      const monthYear = dayjs(item.date_created).format("MMM YYYY");
      acc[monthYear] = (acc[monthYear] || 0) + item.price;

      return acc;
    },
    {}
  );

  const prices = monthlyTotalPrices && Object?.values(monthlyTotalPrices);

  const revenueMonths = data?.lifetime_sales.map((sale: LifetimeSale) => {
    return dayjs(sale.date_created).format("MMM");
  });


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
      categories: revenueMonths,
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
    },
  };

  const series = [
    {
      name: "Revenue",
      data: data?.lifetime_sales.length === 0 ? [] : prices,
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

  if (data?.lifetime_sales.length === 0) {
    return <p className="text-center font-semibold">No data to display</p>;
  }
  return (
    <ChartSummary
      title="Revenue Management"
      line1="Revenue"
      options={options}
      series={series}
    />
  );
};

export default RevenueSummary;
