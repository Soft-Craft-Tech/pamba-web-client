import dayjs from "dayjs";
import * as z from "zod";

const toDate = z.coerce.date();

export const inventorySchema = z.object({
  product: z.string().min(1, "Item name is required"),
  status: z.string().min(1, "Status is required"),
  // updated_at: toDate.nullable(),
  updated_at: z.string().nullable(),
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
