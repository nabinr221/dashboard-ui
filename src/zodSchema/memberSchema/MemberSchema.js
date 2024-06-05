import { z } from "zod";
const MAX_FILE_SIZE = 2000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const MemberSchema = z.object({
  name: z.string().min(1, { message: "Name field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  email: z.string().email({ message: "Invalid email format " }),
  phone: z.string(),
  facebook: z
    .string()
    .optional()
    .refine((value) => value === "" || value.includes("facebook.com"), {
      message:
        "Must be a valid Facebook URL (e.g., https://www.facebook.com/...)",
      path: ["facebook"],
    }),
  linkedin: z
    .string()
    .optional()
    .refine((value) => value === "" || value.includes("linkedin.com"), {
      message:
        "Must be a valid LinkedIn URL (e.g., https://www.linkedin.com/...)",
      path: ["linkedin"],
    }),
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
    .optional(), // Assuming image URL can be optional
});

export default MemberSchema;
