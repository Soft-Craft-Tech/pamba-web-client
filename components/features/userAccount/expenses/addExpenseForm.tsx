"use client";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function AddExpense() {
  return (
    <div className="w-96 h-auto opacity-100 z-50 bg-white p-10 rounded-md flex flex-col gap-5">
      <h3 className="text-sm font-bold text-secondary">New Expense</h3>
      <form className="flex flex-col gap-3 w-full">
        <TextField
          required
          id="expense"
          label="Expense"
          type="text"
          name="expenseTitle"
          // value={addedAccount.accountName}
          // onChange={handleChange}
        />
        <TextField
          required
          id="amount"
          label="Amount"
          type="number"
          name="expenseAmount"
          // value={addedAccount.accountName}
          // onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="account">Account</InputLabel>
          <Select
            labelId="account"
            name="accountID"
            label="Service"
            // value={service.id}
            // onChange={handleChange}
          >
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Mpesa">Mpesa</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="description"
          label="Description"
          type="text"
          name="description"
          multiline
          rows={2}
          // value={addedAccount.accountName}
          // onChange={handleChange}
        />
        <div className="w-full h-max flex justify-between items-center">
          <button
            type="button"
            // onClick={() => {
            //   setUserCrudActions("");
            // }}
            className="text-primary border border-primary rounded-md py-2 px-5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-primary rounded-md py-2 px-5"
          >
            Add Sale
          </button>
        </div>
      </form>
    </div>
  );
}
