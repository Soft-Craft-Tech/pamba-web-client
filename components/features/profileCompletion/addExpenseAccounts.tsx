import { useCreateAccount } from "@/app/api/auth";
import ProfileProgress from "@/components/core/cards/progress";
import Toast from "@/components/shared/toasts/authToast";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { TextField } from "@mui/material";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AddExpenseAccounts() {
  const [addedAccount, setAddedAccount] = useState({
    accountName: "",
    description: "",
  });
  const [queuedExpenses, setQueuedExpenses] = useState([]);
  const step = useAppSelector((state: RootState) => state.completeProfile.step);
  const { mutateAsync, isLoading, isSuccess, isError } = useCreateAccount(step);

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
      {isError && <Toast message={"Something went wrong"} type="error" />}
      <ProfileProgress />
      <div className="flex gap-10 w-full flex-col md:flex-row">
        <div className="flex flex-col gap-5 w-full max-h-96 p-5 border bg-white lg:p-10 lg:min-w-96">
          <h3>Create your Business&apos;s Expense Accounts</h3>
          <form onSubmit={() => {}} className="flex flex-col gap-3">
            <TextField
              required
              id="outlined-required"
              label="Expense Account"
              type="text"
              name="accountName"
              value={addedAccount.accountName}
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              type="text"
              name="description"
              value={addedAccount.description}
            />
            <button className="py-3 px-10 bg-secondary text-white h-max rounded-md">
              Add
            </button>
          </form>
        </div>
        {queuedExpenses.length > 0 && (
          <div className="w-full h-full p-4 bg-white flex gap-3 flex-wrap lg:p-7">
            {queuedExpenses.map((item, index) => {
              {
                return (
                  <div
                    key={index}
                    className="flex gap-3 items-center w-max h-auto rounded-md bg-secondary px-4 py-2 text-white"
                  >
                    Here
                    {/* {item.accountName} */}
                    <AiOutlineClose
                      size={20}
                      className="cursor-pointer hover:text-primary"
                      // onClick={() => {
                      //   dequeueExpense(index);
                      // }}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          // disabled={requestPending || queuedExpenses.length === 0}
          type="button"
          // onClick={saveServices}
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finish
          {/* {requestPending ? <>Loading</> : <>Finish</>} */}
        </button>
      </div>
    </div>
  );
}
