"use client";
import { getUser } from "@/utils/auth";
import KPI from "../cards/KPICards";
import { DynamicObject } from "@/components/types";
import Image from "next/image";
import DashImg from "@/public/dashboard.png";

interface OverviewProps {
  all_appointments?: Array<DynamicObject>;
  current_month_expenses?: number;
  current_month_revenue?: number;
  today_appointments?: Array<DynamicObject>;
  today_revenue?: number;
}

export default function Overview({
  all_appointments = [],
  current_month_expenses = 0,
  current_month_revenue = 0,
  today_appointments = [],
  today_revenue = 0,
}: OverviewProps) {
  const { client } = getUser();

  return (
    <div className="flex w-full h-60 gap-5">
      <div className="bg-white rounded-xl h-full w-full p-5 text-secondary border flex items-center gap-5">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <h2 className="text-primary font-semibold text-lg">
              Welcome back, {client.business_name}!
            </h2>
            <p className="text-sm font-normal text-tryGray">
              Here&apos;s what happening in your business today
            </p>
          </div>
          <div className="font-semibold">
            <h4>
              Ksh <span className="text-xl font-bold">{today_revenue}</span>
            </h4>
            <p className="text-sm text-tryGray">Today&apos;s revenue</p>
          </div>
          <div className="font-semibold">
            <h4 className="font-bold text-xl">
              {today_appointments ? today_appointments.length : 0}
            </h4>
            <p className="text-sm text-tryGray">Scheduled appointments</p>
          </div>
        </div>
        <div>
          <Image src={DashImg} alt="Business Image" />
        </div>
      </div>
      <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-3">
        <KPI
          title="This month Revenue"
          value={current_month_revenue}
          change={10}
          positiveChange={false}
          financial={true}
        />
        <KPI
          title="This month Appointments"
          value={all_appointments ? all_appointments.length : 0}
          change={10}
          positiveChange={true}
          financial={false}
        />
        <KPI
          title="This month Expenses"
          value={current_month_expenses}
          change={10}
          positiveChange={true}
          financial={true}
        />
      </div>
    </div>
  );
}
