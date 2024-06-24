import dayjs from "dayjs";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  defaultValue?: unknown;
  disabled?:boolean
};

export type FormDataType = {
  product: string;
};

export type SignUpFormData = {};

export type DeleteFormData = {
  email: string;
  reason: string;
};

export type BusinessDescriptionData = {
  description: string;
};

export type CloudinaryData = {
  imageURL: string;
};

export type DynamicObject = {
  [x: string]: any;
};

export type ISidebarData = {
  link: string;
  name: string;
  imageUrl: string;
};

export type DayData = {
  day: string;
  date: string;
  slots: number;
  dateObj: dayjs.Dayjs;
};

export type Expense = {
  accountName: string;
  description: string;
};