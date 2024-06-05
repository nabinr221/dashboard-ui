import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

export const ProductCatSchema = z.object({
  name: z.string().min(1, { message: " Category Name field is required" }),
});
export const ColorSchema = z.object({
  name: z.string().min(1, { message: "Color Name field is required" }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Product Name field is required" }),
  description: z.string(),
  size: z.string(),
  colorId: z.string(),
  productCategoryId: z
    .string()
    .min(1, { message: "Product Category field is required" }),
  price: z
    .number()
    .min(1, { message: "Price field is required" })
    .or(z.string().min(1, { message: "Price field is required" })),
  thumbnail: z
    .any()
    .refine(
      (files) => {
        if (!Array.isArray(files)) return true;
        return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type));
      },
      {
        message: "Accepted image types: JPG, JPEG, PNG, GIF",
      }
    )
  
    .optional(),
});
