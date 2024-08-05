import { LabelledFormFieldProps } from "@/components/types";
import { TextField } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import clsx from "clsx";

const FormField: React.FC<LabelledFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  defaultValue = "",
  disabled,
  className,
  multiline,
  rows,
}) => {
  const combinedClassNames = clsx(
    "w-full rounded-md disabled:opacity-50 disabled:bg-gray-200 focus:outline-none ring-2 focus:ring-2 ring-primary focus:ring-primary focus:border-transparent",
    {
      "border-red-500": error,
      "border-inputBorder": !error,
    },
    className
  );

  return (
    <>
      <TextField
        error={error !== undefined}
        className={combinedClassNames}
        id={name}
        label={placeholder}
        type={type}
        {...register(name, { value: defaultValue })}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        sx={{
          "& .MuiFormLabel-root": { zIndex: "auto" },
          "& .MuiInputLabel-root": { zIndex: "auto" },
        }}
      />
      {error && (
        <span className="bg-red-100 text-red-700 p-4 rounded-lg w-full z-auto">
          {error.message}
        </span>
      )}
    </>
  );
};
export default FormField;
