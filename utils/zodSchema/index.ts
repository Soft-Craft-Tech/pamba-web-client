import * as z from "zod";

const toDate = z.coerce.date();

export const inventorySchema = z.object({
  product: z.string().nonempty("Item name is required"),
  status: z.string().nonempty("Status is required"),
  updated_at: toDate.nullable(),
  // updated_at: z.string().nullable(),
});
