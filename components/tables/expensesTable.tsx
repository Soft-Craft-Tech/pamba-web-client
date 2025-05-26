"use client";
import { useGetExpenseAccounts } from "@/app/api/accounts";
import {
  useCreateExpense,
  useDeleteExpense,
  useEditExpense,
  useGetExpenses,
} from "@/app/api/expenses";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { expenseSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { ExpenseAccountType } from "../types";

type Expense = {
  expense_account: number;
  created_at: Date;
  category: string;
  expense: string;
  amount: string;
  description: string;
  account_id: string;
  account_name: string;
  id: number;
};

type FormValues = z.infer<typeof expenseSchema>;

const Table = ({ handleModal }: { handleModal: () => void }) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(expenseSchema),
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isPending, refetch: refetchExpenses } = useGetExpenses();

  const { data: expenseAccountsData, isPending: isLoadingAccounts } =
    useGetExpenseAccounts();

  const { mutateAsync, status: createExpenseStatus } = useCreateExpense();

  const { mutateAsync: deleteUser } = useDeleteExpense();

  const { mutateAsync: editExpense, status: editExpenseStatus } =
    useEditExpense();

  const editExpenseRow = async (expenseId: number, formData: FormValues) => {
    let data = {
      expenseId,
      expenseTitle: formData?.expenseTitle,
      expenseAmount: Number(formData?.amount),
      description: formData?.description ?? "",
      accountID: formData?.accountID.value.toString(),
    };

    await editExpense(data);
    reset();
    table.setEditingRow(null);
  };

  const submitExpense = async (formData: FormValues) => {
    let data = {
      ...formData,
      description: formData.description ?? "",
      amount: Number(formData.amount),
      accountID: formData.accountID.value.toString(),
    };
    await mutateAsync(data);
    refetchExpenses();
    reset();
    table.setCreatingRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<Expense>[]>(
    () => [
      {
        accessorFn: (row) => new Date(row.created_at),
        id: "created_at",
        header: "Date",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("YYYY-MM-DD"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "expense",
        header: "Expense",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "description",
        header: "Description",
        disableFilters: true,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "id",
        header: "Expense ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "account_id",
        header: "Expense Account",
        disableFilters: true,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<Expense>) => {
    deleteUser(row.original.id);
    refetchExpenses();
  };

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : data?.expenses ?? [],
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { description: false, account_id: false, id: false },
    },
    positionGlobalFilter: "left",
    positionActionsColumn: "last",
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowActions: true,
    renderRowActions: ({ table, row }) => (
      <div className="flex flex-row gap-x-3 items-center">
        <p
          onClick={() => {
            table.setEditingRow(row);
          }}
          className="cursor-pointer font-bold"
        >
          Edit
        </p>

        <p
          onClick={() => {
            openDeleteConfirmModal(row);
          }}
          className="cursor-pointer text-[#007B99] font-bold"
        >
          Delete
        </p>
      </div>
    ),
    renderEditRowDialogContent: ({ table, row }) => (
      <div className="p-10">
        <p className="mb-2">Update Expense</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editExpenseRow(row.original.id ?? 0, data)
          )}
        >
          <FormField
            type="text"
            placeholder="Expense"
            defaultValue={row.original.expense}
            name="expenseTitle"
            register={register}
            error={errors.expenseTitle}
          />

          <FormField
            type="number"
            placeholder="Amount"
            defaultValue={row.original.amount.toString()}
            name="amount"
            register={register}
            error={errors.amount}
          />

          <FormField
            type="text"
            placeholder="Description"
            defaultValue={row.original.description}
            name="description"
            register={register}
            error={errors.description}
          />

          {/* TODO: API side expense name isn't updating */}
          <Controller
            control={control}
            name="accountID"
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                defaultValue={{
                  value: row.original.expense_account.toString(),
                  label: row.original.category,
                }}
                onChange={onChange}
                options={
                  expenseAccountsData &&
                  expenseAccountsData.account.map(
                    (account: ExpenseAccountType) => ({
                      value: account?.id,
                      label: account?.account_name,
                    })
                  )
                }
                name="accountID"
                placeholder="Select Account"
                value={value}
                closeMenuOnSelect={true}
                error={errors.accountID}
              />
            )}
          />

          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => {
                table.setEditingRow(null);
                // reset();
              }}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label="Save Expense"
              variant="primary"
              disabled={editExpenseStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Create New Expense</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitExpense)}
        >
          <FormField
            type="text"
            placeholder="Expense"
            name="expenseTitle"
            register={register}
            error={errors.expenseTitle}
          />

          <FormField
            type="number"
            placeholder="Amount"
            name="amount"
            register={register}
            error={errors.amount}
          />

          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            error={errors.description}
          />

          <Controller
            control={control}
            name="accountID"
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={
                  expenseAccountsData &&
                  expenseAccountsData.account.map(
                    (account: { id: number; account_name: string }) => ({
                      value: account.id,
                      label: account.account_name,
                    })
                  )
                }
                placeholder="Select Account"
                value={value}
                closeMenuOnSelect={true}
                error={errors.accountID}
              />
            )}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-8 py-2 border border-gray-400 rounded-md lg:px-12"
              onClick={() => {
                table.setCreatingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label="Save Expense"
              variant="primary"
              disabled={createExpenseStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => {
          if (expenseAccountsData?.account.length > 0) {
            table.setCreatingRow(true);
          } else {
            toast.error("You need atleast one Expense Account");
            handleModal();
          }
        }}
      >
        Create Expense
      </Button>
    ),
    state: {
      globalFilter,
      isLoading: isPending,
      pagination,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

const ExpensesTable = ({ handleModal }: { handleModal: () => void }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Table handleModal={handleModal} />
  </LocalizationProvider>
);

export default ExpensesTable;
