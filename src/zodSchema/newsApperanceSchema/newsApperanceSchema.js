import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const newsApperanceSchema = z.object({
  title: z.string().min(1, { message: "News title  field is required" }),
  description: z.string().min(1, { message: "Description  field is required" }),
  eventId: z.string().min(1, { message: "Events field is required" }),
  mediaName: z.string(),
  publishedDate: z.string(),
  mediaLogo: z
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
export default newsApperanceSchema;
