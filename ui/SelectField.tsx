import { SelectFieldProps } from "@/components/types";
import { FormControl, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  name,
  error,
  defaultValue,
  control,
  options,
}) => (
  <FormControl sx={{ minWidth: 120 }}>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <select
          className="text-gray-400 border w-full h-14 py-1 px-2 lg:h-12"
          value={value}
          onChange={onChange}
          //   displayEmpty
          //   inputProps={{ "aria-label": `${placeholder}` }}
          //   defaultValue={defaultValue}
        >
          {/* {customOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
          {options}
        </select>
      )}
    />
    {error && (
      <span className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error.message}
      </span>
    )}
  </FormControl>
);
export default SelectField;
