import RevenueSummary from "@/components/charts/revenueSummary";
import RevenueTable from "@/components/tables/revenueTable";

export default function Revenue() {
  return (
    <div className="flex flex-col gap-10">
      <RevenueSummary />
      <RevenueTable />
    </div>
  );
}
