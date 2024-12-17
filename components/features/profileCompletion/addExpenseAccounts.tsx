import { useCreateExpenseAccounts } from "@/app/api/accounts";
import { Expense } from "@/components/types";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import Button from "@/ui/button";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function AddExpenseAccounts({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: () => void;
}) {
  const pathname = usePathname();

  const { register, handleSubmit, reset } = useForm();

  const step = useAppSelector((state: RootState) => state.completeProfile.step);
  const { mutateAsync, isPending } = useCreateExpenseAccounts(step);

  const [queuedExpenses, setQueuedExpenses] = useState<Expense[]>([]);

  const onSubmit = async (data: any) => {
    setQueuedExpenses((prevState) => [...prevState, data]);
    reset();
  };

  const onDeleteClick = (indexToDelete: number) => {
    setQueuedExpenses((prevState) => {
      return prevState.filter((_, index) => index !== indexToDelete);
    });
  };

  const handleSubmitData = () => {
    mutateAsync({ accounts: queuedExpenses });
    reset();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="relative w-5/6 sm:w-1/2 h-auto flex flex-col gap-5 px-5 py-5 bg-white mx-auto mt-4 sm:mt-40 rounded-2xl">
      {pathname === "/user/dashboard" && (
        <Button
          className="absolute right-14 top-16"
          onClick={() => onSubmitSuccess && onSubmitSuccess()}
        >
          <IoClose className="size-8" />
        </Button>
      )}

      <div className="flex gap-10 w-full flex-col md:flex-row">
        <div className="flex flex-col gap-5 w-full max-h-96 p-5 bg-white lg:p-10 lg:min-w-96">
          <div>
            <h3 className="text-[#4F5253] text-lg" id="expense-modal-title">
              Create your Business&apos;s Expense Accounts
            </h3>
            <p className="bold text-sm text-red-600">
              You need atleast one expense account e.g Equity Bank, KCB, Mpesa etc
            </p>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              required
              id="outlined-required"
              label="Expense Account"
              type="text"
              {...register("accountName", { required: true })}
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              type="text"
              {...register("description", { required: true })}
            />
            <button
              type="submit"
              className="py-3 px-10 bg-secondary text-white h-max rounded-md"
            >
              Add
            </button>
          </form>
        </div>
        {queuedExpenses.length > 0 && (
          <div className="w-full h-full p-4 bg-white flex gap-3 flex-wrap lg:p-7">
            {queuedExpenses.map(({ accountName }, index) => {
              {
                return (
                  <div
                    key={accountName}
                    className="flex gap-3 items-center w-max h-auto rounded-md bg-secondary px-4 py-2 text-white"
                  >
                    {accountName}
                    <AiOutlineClose
                      size={20}
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        onDeleteClick(index);
                      }}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="w-full h-10 flex justify-end">
        <Button
          disabled={isPending || queuedExpenses.length === 0}
          type="button"
          onClick={handleSubmitData}
          variant="primary"
        >
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </div>
  );
}
