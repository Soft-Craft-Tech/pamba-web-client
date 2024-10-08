import RevenueSummary from "@/components/charts/revenueSummary";
import InitialExpenseStates from "@/components/features/userAccount/expenses/setInitialExpenseStates";
import RevenueTable from "@/components/tables/revenueTable";

export default function Expenses() {
  return (
    <div className="flex flex-col gap-10">
      <InitialExpenseStates />
      <RevenueSummary />
      <RevenueTable />
    </div>
  );
}
