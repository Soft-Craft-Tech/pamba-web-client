"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

type ChartSummaryProps = {
  title: string;
  line1: string;
  line2?: string;
  series: { name: string; data: any[]; fill?: {} }[];
  options: ApexOptions;
};

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartSummary = ({
  title,
  line1,
  line2,
  series,
  options,
}: ChartSummaryProps) => {
  return (
    <div className="col-span-12 pt-10 border border-stroke rounded-2xl bg-white px-7 pb-5 xl:col-span-8">
      <div className="flex flex-wrap w-full items-center justify-between gap-3 sm:flex-nowrap">
        <p>{title}</p>
        <div className="flex flex-wrap gap-3 sm:gap-5">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-primary"></span>

            <p className="font-semibold text-primary text-nowrap">{line1}</p>
          </div>
          {line2 && (
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-accent"></span>

              <p className="font-semibold text-accent text-nowrap">{line2}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSummary;
