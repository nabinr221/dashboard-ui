import { optional, z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

export const advertisementSchema = z.object({
  banner: z.any().refine(
    (files) => {
      if (!Array.isArray(files)) return true;
      return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type));
    },
    {
      message: "Accepted image types: JPG, JPEG, PNG, GIF",
    }
  ),
  // Using min method with a minimum length of 1
});
export const noticeSchema = z.object({
  image: z.any().refine(
    (files) => {
      if (!Array.isArray(files)) return true;
      return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type));
    },
    {
      message: "Accepted image types: JPG, JPEG, PNG, GIF",
    }
  ),
  // Using min method with a minimum length of 1
});

export const achievmentsSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  image: z
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
