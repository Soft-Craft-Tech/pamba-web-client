"use client";
import {
  useCreateInventory,
  useDeleteInventory,
  useEditInventory,
  useGetInventory,
} from "@/app/api/inventory";
import Button from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { TiTick } from "react-icons/ti";
import FormField from "@/ui/FormField";
import { inventorySchema } from "@/utils/zodSchema";
import { FaPlus } from "react-icons/fa";
import * as z from "zod";
import { GrFormClose } from "react-icons/gr";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type InventoryType = {
  id: number;
  product: string;
  status: string;
  updated_at: Date | null;
};

type FormValues = z.infer<typeof inventorySchema>;

const InventoryTable = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(inventorySchema),
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isPending, isError } = useGetInventory();

  const { mutateAsync, status: createInventoryStatus } = useCreateInventory();

  const { mutateAsync: deleteInventory } = useDeleteInventory();

  const { mutateAsync: editInventory, status: editInventoryStatus } =
    useEditInventory();

  const editInventoryRow = async (
    inventoryId: number,
    formData: FormValues
  ) => {
    const data = {
      inventoryId,
      status: formData.status,
    };
    await editInventory(data);
    reset();
    table.setEditingRow(null);
  };

  const submitInventory = async (formData: { product: string }) => {
    await mutateAsync(formData);
    reset();
    table.setCreatingRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<InventoryType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Inventory ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => new Date(row.updated_at!),
        id: "updated_at",
        header: "Date",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("MMM D, YYYY"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "product",
        header: "Name",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <div
            className={`rounded-2xl w-fit py-0.5 px-2 text-xs flex items-center gap-1 ${
              cell.getValue<string>() === "Critical"
                ? "text-red-500 bg-red-100"
                : cell.getValue<string>() === "Normal"
                ? "text-[#027A48] bg-[#ECFDF3]"
                : "text-[#EAD413] bg-[#F8F6E5]"
            }`}
          >
            {cell.getValue<string>() === "Normal" ? (
              <TiTick className="text-[#12B76A]" />
            ) : (
              <GrFormClose
                className={`${
                  cell.getValue<string>() === "Critical"
                    ? "text-red-500"
                    : "text-[#EAD413]"
                }`}
              />
            )}
            {cell.getValue<string>() === "Normal"
              ? "In Stock"
              : cell.getValue<string>() === "Critical"
              ? "Out of Stock"
              : "Low Stock"}
          </div>
        ),
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<InventoryType>) => {
    deleteInventory(row.original.id);
  };

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : data?.inventory ?? [],
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { id: false },
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
            reset();
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
        <p className="mb-2">Update Inventory</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            editInventoryRow(row.original.id ?? 0, data);
            console.log(row.original.updated_at);
          })}
        >
          <FormField
            type="text"
            placeholder="Entry Date"
            name="updated_at"
            register={register}
            error={errors.updated_at}
            defaultValue={moment(row.original.updated_at).format("MMM D, YYYY")}
            disabled
          />
          <FormField
            type="text"
            placeholder="Item"
            name="product"
            register={register}
            error={errors.product}
            defaultValue={row.original.product}
            disabled
          />
          <FormControl sx={{  minWidth: 120 }}>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select status" }}
                  defaultValue={row.original.status}
                >
                  <MenuItem value={"Critical"}>Out of Stock</MenuItem>
                  <MenuItem value={"Low"}>Low Stock</MenuItem>
                  <MenuItem value={"Normal"}>In Stock</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-10 py-2 border border-primary text-primary rounded-md font-bold"
              onClick={() => table.setEditingRow(null)}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label="Submit"
              variant="primary"
              disabled={editInventoryStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Inventory Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            submitInventory(data);
          })}
        >
          <FormField
            type="text"
            placeholder="Item"
            name="product"
            register={register}
            error={errors.product}
          />

          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-10 py-2 border border-primary text-primary rounded-md font-bold"
              onClick={() => {
                table.setCreatingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label="Submit"
              variant="primary"
              disabled={createInventoryStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        <FaPlus className="mr-2" />
        Add Inventory
      </Button>
    ),
    state: {
      globalFilter,
      isLoading: isPending,
      pagination,
      showAlertBanner: isError,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default InventoryTable;
