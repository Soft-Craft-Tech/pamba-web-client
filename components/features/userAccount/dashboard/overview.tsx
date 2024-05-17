import KPI from "../cards/KPICards";
import { DynamicObject } from "@/components/types";

interface OverviewProps {
  all_appointments?: Array<DynamicObject>;
  current_month_expenses?: number;
  current_month_revenue?: number;
  today_appointments?: Array<DynamicObject>;
  today_revenue?: number;
};

export default function Overview({
  all_appointments = [],
  current_month_expenses = 0,
  current_month_revenue = 0,
  today_appointments = [],
  today_revenue = 0,
}: OverviewProps) {
  return (
    <div className="flex w-full h-60 gap-5">
      <div className="bg-white rounded-md h-full w-full p-5 text-secondary shadow-md flex items-center gap-5">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <h2 className="text-primary font-semibold text-2xl">
              Welcome back
            </h2>
            <p className="text-sm font-light text-muted">
              Here&apos;s what happening in your business today
            </p>
          </div>
          <div>
            <h4 className="font-semibold">
              Ksh <span className="text-xl font-bold">{today_revenue}</span>
            </h4>
            <p className="font-light text-sm text-muted">
              Today&apos;s Revenue
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl">
              {today_appointments ? today_appointments.length : 0}
            </h4>
            <p className="font-light text-sm text-muted">
              Scheduled appointments
            </p>
          </div>
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
