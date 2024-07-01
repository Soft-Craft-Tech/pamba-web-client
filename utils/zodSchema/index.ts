import * as z from "zod";

const toDate = z.coerce.date();

export const inventorySchema = z.object({
  product: z.string().nonempty("Item name is required"),
  status: z.string().nonempty("Status is required"),
  updated_at: toDate.nullable(),
  // updated_at: z.string().nullable(),
});

export const clientSchema = z.object({
  customer: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required"),
  appointmentDate: z.string().datetime(),
  // appointmentTime: z.string().nullable(),
  service: z.string().nonempty("Service is required"),
});

export const appointmentSchema = z.object({
  customerName: z.string().nonempty("Customer Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  status: z.string().nonempty("Status is required"),
  updated_at: toDate.nullable(),
});