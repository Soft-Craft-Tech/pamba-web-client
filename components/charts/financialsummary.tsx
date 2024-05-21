"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DynamicObject } from "../types";

interface FinancialSummaryProps {
  lifetime_expenses?: Array<DynamicObject>;
  lifetime_sales?: Array<DynamicObject>;
}

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

const FinancialSummary = ({
  lifetime_expenses = [],
  lifetime_sales = [],
}: FinancialSummaryProps) => {
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
  }, [lifetime_expenses, lifetime_sales, maxYAxisValue]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5  sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap w-full  items-center pt-10 justify-between gap-3 sm:flex-nowrap">
        <p>Financial Summary</p>
        <div className="flex flex-wrap gap-3 sm:gap-5">
          <div className="flex">
            <span className="mr-3 mt-1 flex h-4 w-full items-center justify-center rounded-full border border-primary">
              <span className="block w-full rounded-full bg-primary"></span>
            </span>
            <div>
              <p className="font-semibold text-primary">Revenue</p>
            </div>
          </div>
          <div className="flex">
            <span className="mr-3 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div>
              <p className="font-semibold text-secondary">Expenses</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
