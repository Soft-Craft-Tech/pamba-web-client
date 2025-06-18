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
    <div className="flex flex-col sm:flex-row w-full sm:h-60 gap-5">
      <div className="bg-white rounded-xl h-full w-full p-5 text-secondary border flex flex-col sm:flex-row items-center gap-5">
        <div className="flex flex-col justify-between h-full w-full gap-5 sm:gap-0">
          <div>
            <h2 className="text-primary font-semibold text-lg">
              Welcome back{" "}
              {client?.business_name ? `, ${client.business_name}` : ""}!
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
        <div className="mr-auto hidden lg:block">
          {client?.profile_img && (
            <Image
              src={client?.profile_img}
              alt={client?.business_name}
              className="rounded-full object-cover shadow-2xl max-h-[200px] max-w-[200px]"
              priority
              width={200}
              height={200}
            />
          )}
        </div>
      </div>
      <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-5">
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
