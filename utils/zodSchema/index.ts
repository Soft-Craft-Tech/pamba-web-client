import dayjs from "dayjs";
import * as z from "zod";

const toDate = z.coerce.date();

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  mapUrl: z.string().min(1, "Map Url is required"),
  description: z.string().min(1, "Description is required"),
  password: z.string().min(1, "Password is required"),
});

export const inventorySchema = z.object({
  product: z.string().min(1, "Item name is required"),
  status: z.string().optional(),
  // updated_at: toDate.nullable(),
  updated_at: z.string().optional(),
});

export const expenseSchema = z.object({
  expenseTitle: z.string().min(1, "Expense title is required"),
  amount: z.string().min(1, "Expense amount is required"),
  description: z.string().min(1, "Expense description is required"),
  accountID: z.string().min(1, "Expense account is required"),
});

export const revenueSchema = z.object({
  // customer: z.string().min(1,"Name is required"),
  serviceId: z.number().min(1, "Service is required"),
  description: z.string().min(1, "Description is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export const clientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  appointmentDate: z.string().date(),

  service: z.number().min(1, "Service is required"),
});

export const appointmentSchema = z.object({
  customerName: z.string().min(1, "Customer Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  status: z.string().min(1, "Status is required"),
  updated_at: toDate.nullable(),
});

export const staffSchema = z.object({
  f_name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
});
