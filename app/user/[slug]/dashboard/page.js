import Overview from "@/app/components/features/userAccount/dashboard/overview";
import Overview from "@/app/components/features/dashboard/overview";
import FinancialSummary from "@/app/components/charts/financialsummary";
import AppointmentsTable from "@/app/components/charts/appointments";
import AppointmentsCard from "@/app/components/charts/chartCard";
export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Overview />
      <FinancialSummary />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <AppointmentsTable />
        </div>
        <AppointmentsCard />
      </div>
    </div>
  );
}
