"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { DynamicObject } from "../types";
import ChartSummary from "./chartSummary";

type FinancialSummaryProps = {
  lifetime_expenses?: Array<DynamicObject>;
  lifetime_sales?: Array<DynamicObject>;
};

const FinancialSummary = ({
  lifetime_expenses = [],
  lifetime_sales = [],
}: FinancialSummaryProps) => {
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

  const [state, setState] = useState({
    series: [
      {
        name: "Expenses",
        data: [] as number[],
        fill: {},
      },

      {
        name: "Revenue",
        data: [] as number[],
        fill: {},
      },
    ],
  });

  const [maxYAxisValue, setMaxYAxisValue] = useState(0);
  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    // Helper function to sum expenses or sales by month
    const sumByMonth = (data: any[]) => {
      const months = Array(12).fill(0);
      data.forEach(
        (item: {
          created_at: string;
          date_created: string;
          amount: number;
          price: number;
        }) => {
          const month = new Date(
            item.created_at || item.date_created
          ).getMonth();
          months[month] += item.amount || item.price;
        }
      );
      return months;
    };

    const expensesByMonth = sumByMonth(lifetime_expenses);
    const salesByMonth = sumByMonth(lifetime_sales);

    // Calculate the maximum value for expenses and revenue
    const maxExpense = Math.max(...expensesByMonth);
    const maxRevenue = Math.max(...salesByMonth);

    setMaxYAxisValue(Math.ceil(Math.max(maxExpense, maxRevenue) / 100) * 100);

    // Update the options object with the new maxYAxisValue
    if (Array.isArray(options.yaxis)) {
      options.yaxis.forEach((axis) => {
        axis.max = maxYAxisValue;
      });
    } else if (options.yaxis) {
      options.yaxis.max = maxYAxisValue;
    }

    // A new options object with the updated maxYAxisValue
    const newOptions = {
      ...chartOptions,
      yaxis: {
        ...chartOptions.yaxis,
        max: maxYAxisValue,
      },
    };

    setChartOptions(newOptions);

    setState({
      series: [
        {
          name: "Expenses",
          data: expensesByMonth,
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

        {
          name: "Revenue",
          data: salesByMonth,
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
                  color: "#DB1471", // Start color for linear gradient
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#fff", // End color for linear gradient
                  opacity: 1,
                },
              ],
            },
          },
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxYAxisValue]);

  return (
    <ChartSummary
      title="Financial Summary"
      line1="Revenue"
      line2="Expenses"
      options={options}
      series={state.series}
    />
  );
};

export default FinancialSummary;
