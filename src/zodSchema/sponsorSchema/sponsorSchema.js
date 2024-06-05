import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const sponsorSchema = z.object({
  name: z.string().min(1, { message: "Sponsor Name field is required" }),
  logo: z
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

export default sponsorSchema;
