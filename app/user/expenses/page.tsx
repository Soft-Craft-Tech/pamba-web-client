import ExpenseSummary from "@/components/charts/expenseSummary";
import InitialExpenseStates from "@/components/features/userAccount/expenses/setInitialExpenseStates";
import ExpensesTable from "@/components/tables/expensesTable";

export default function Expenses() {
  return (
    <div className="flex flex-col gap-10">
      <InitialExpenseStates />
      <ExpenseSummary />
      <ExpensesTable />
    </div>
  );
}
