import Overview from "@/app/components/features/userAccount/dashboard/overview";
import Overview from "@/app/components/features/dashboard/overview";
import FinancialSummary from "@/app/components/charts/financialsummary";
export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Overview />
      <FinancialSummary />
    </div>
  );
}
