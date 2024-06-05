import { z } from "zod";

export const contactInfoSchema = z.object({
  name: z.string().min(1, { message: "Name field is required" }),
  title: z.string().min(1, { message: "Title field is required" }),
  address: z.string().min(1, { message: "Address field is required" }),
  email: z
    .string()
    .email({
      message: "Please provide a valid email address (e.g., user@example.com)",
    })
    .optional(),
  phone: z.string().optional(),
});
