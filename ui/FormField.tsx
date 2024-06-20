import { FormFieldProps } from "@/components/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  defaultValue = "",
  disabled,
}) => (
  <>
    <input
      className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12 disabled:opacity-50 disabled:bg-gray-200"
      type={type}
      placeholder={placeholder}
      {...register(name, { value: defaultValue })}
      disabled={disabled}
    />
    {error && <span className="bg-red-100 text-red-700">{error.message}</span>}
  </>
);
export default FormField;
