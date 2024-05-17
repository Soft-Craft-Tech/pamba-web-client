import { useCreateExpenseAccounts } from "@/app/api/accounts";
import ProfileProgress from "@/components/core/cards/progress";
import Toast from "@/components/shared/toasts/authToast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { RootState } from "@/store/store";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

interface Expense {
  accountName: string;
  description: string;
}

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

export default function AddExpenseAccounts() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm();

  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);
  const step = useAppSelector((state: RootState) => state.completeProfile.step);
  const { mutateAsync, isLoading, isError, isSuccess } = useCreateExpenseAccounts();

  const [queuedExpenses, setQueuedExpenses] = useState<Expense[]>([]);

  const onSubmit = async (data: any) => {
    setQueuedExpenses((prevState) => [...prevState, data]);
    reset();
  };

  const handleNext = () => {
    dispatch(setStep(step + 1));
  };

  const onDeleteClick = (indexToDelete: number) => {
    setQueuedExpenses((prevState) => {
      return prevState.filter((_, index) => index !== indexToDelete);
    });
  };

  const handleSubmitData = () => {
    try {
      mutateAsync({accounts: queuedExpenses});
      dispatch(setShowToast(true));
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
      dispatch(setShowToast(true));
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
      {isError && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <ProfileProgress />
      <div className="flex gap-10 w-full flex-col md:flex-row">
        <div className="flex flex-col gap-5 w-full max-h-96 p-5 border bg-white lg:p-10 lg:min-w-96">
          <h3>Create your Business&apos;s Expense Accounts</h3>
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
        <button
          disabled={isLoading || queuedExpenses.length === 0}
          type="button"
          onClick={handleSubmitData}
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading" : "Finish"}
        </button>
      </div>
    </div>
  );
}
