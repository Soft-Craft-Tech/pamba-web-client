import dayjs from "dayjs";
import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export type IUser = {
  active: boolean;
  business_name: string;
  city: string;
  description: string;
  email: string;
  google_map: string;
  id: number;
  join_date: string;
  location: string;
  phone: string;
  profile_img: string;
  slug: string;
  verified: boolean;
  weekday_closing: string;
  weekday_opening: string;
  weekend_closing: string;
  weekend_opening: string;
};

export type LabelledFormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  defaultValue?: unknown;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  defaultValue?: unknown;
  disabled?: boolean;
};

export type SelectFieldProps = {
  placeholder: string;
  name: string;
  error: FieldError | undefined;
  defaultValue?: unknown;
  control: any;
  options: ReactNode;
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

export type AppointmentType = {
  cancelled: boolean;
  color: string;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  end: string;
  event_id: number;
  id: number;
  staff: string;
  start: string;
  time: string;
  title: string;
};

export type WebApppointmentBookingType = {
  name: string;
  date: string;
  time: string;
  comment: string;
  service: number;
  staff: string;
  business: number;
  email: string;
  phone: string;
  notification: string;
};

export type AllAppointementsType = {
  all_appointments: AllAppointmentType[];
  all_clients: AllClientsType[];
};

export type AllClientsType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  verified: boolean;
};

export type AllAppointmentType = {
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  id: number;
  time: string;
};

// All services
export type ServicesType = {
  services: { serviceInfo: ServiceInfoType; businessInfo: BusinessInfoType };
};

export type ServiceInfoType = {
  business_id: number;
  description: string;
  estimated_service_time: number;
  id: number;
  price: number;
  service: string;
  service_category: number;
  service_image: string;
};

export type BusinessInfoType = {
  active: boolean;
  business_name: string;
  city: string;
  description: string;
  email: string;
  google_map: string;
  id: number;
  join_date: string;
  location: string;
  phone: string;
  profile_img: string;
  rating: string;
  slug: string;
  verified: boolean;
  weekday_closing: string;
  weekday_opening: string;
  weekend_closing: string;
  weekend_opening: string;
};

//  services by Individual business
export type BusinessServiceType = {
  business_id: number;
  description: string;
  estimated_service_time: number;
  id: number;
  price: number;
  service: string;
  service_category: number;
  service_image: string;
};

// Revenue Analysis
export type LifetimeSale = {
  date_created: string;
  description: string;
  id: number;
  payment_method: string;
  price: number;
};

export type RevenueAnalysis = {
  current_month_revenue: number;
  last_seven_days: number;
  lifetime_sales: LifetimeSale[];
  message: string;
  total_sales: number;
};

export type ExpensesType = {
  amount: number;
  created_at: string;
  description: string;
  expense: string;
  expense_account: number;
  id: number;
};

export type ServiceType = {
  name: string;
  price: string;
  category: string;
  description: string;
  estimatedTime: string;
  imageURL: string;
};
