import { useGetExpenseAccounts } from "@/app/api/accounts";
import Button from "@/ui/button";

export default function InitialExpenseStates({
  handleModal,
  handleBtnClicked,
}: {
  handleModal: () => void;
  handleBtnClicked: () => void;
}) {
  const { data: expenseAccountsData } = useGetExpenseAccounts();

  return (
    <>
      {expenseAccountsData?.account.length < 1 ? (
        <div className="flex flex-row items-center justify-between bg-orange-100 border border-orange-500 text-orange-700 p-5 rounded">
          <p>
            You have not added any expense accounts yet. Please add your expense
            accounts to track your expenses effectively.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              handleModal();
              handleBtnClicked();
            }}
          >
            Add Expense Accounts
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            handleModal();
            handleBtnClicked();
          }}
        >
          Add Expense Accounts
        </Button>
      )}
    </>
  );
}
