import { useCreateExpenseAccounts } from "@/app/api/accounts";
import { Expense } from "@/components/types";
import Button from "@/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AiOutlineClose } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import FormField from "@/ui/FormField";

const expenseAccountSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof expenseAccountSchema>;

export default function AddExpenseAccounts({
  onSubmitSuccess,
  step = 1,
}: {
  onSubmitSuccess?: () => void;
  step?: number;
}) {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(expenseAccountSchema),
  });

  const { mutateAsync, isPending } = useCreateExpenseAccounts(step);

  const [queuedExpenses, setQueuedExpenses] = useState<Expense[]>([]);

  const onSubmit = async (data: FormValues) => {
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
              You need to set up at least one expense account to help you track
              and categorize your business expenditures accurately e.g Rent
              Account, Salaries account etc
            </p>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              type="text"
              placeholder="Expense Account"
              name="accountName"
              register={register}
              error={errors.accountName}
            />
            <FormField
              type="text"
              placeholder="Description"
              name="description"
              register={register}
              error={errors.description}
            />
            <Button
              type="submit"
              variant="primary"
              className="py-3 px-10 h-max"
            >
              Add Account
            </Button>
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
