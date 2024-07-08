import { FormFieldProps, LabelledFormFieldProps } from "@/components/types";
import { TextField } from "@mui/material";

const LabelledFormField: React.FC<LabelledFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  defaultValue = "",
  disabled,
  multiline,
  rows,
}) => (
  <>
    <TextField
      id={name}
      label={placeholder}
      type={type}
      {...register(name, { value: defaultValue })}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
    />
    {error && (
      <span className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error.message}
      </span>
    )}
  </>
);
export default LabelledFormField;
