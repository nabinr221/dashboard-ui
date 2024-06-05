import { z } from "zod";

const MAX_FILE_SIZE = 2000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const DonorSchema = z.object({
  name: z.string().min(1, { message: "Title field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  category: z.string().min(1, { message: "category field is required" }),
  email: z.string().email({ message: "Invalid email format " }),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  image: z
    .any()
    .refine(
      (files) => {
        if (!Array.isArray(files)) return true; // If not an array, consider it valid
        return (
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)) &&
          files.every((file) => file?.size <= MAX_FILE_SIZE)
        );
      },
      {
        message:
          "Accepted image types: JPG, JPEG, PNG, GIF. Max file size is 2MB.",
      }
    )
    .optional(),
});

export default DonorSchema;
