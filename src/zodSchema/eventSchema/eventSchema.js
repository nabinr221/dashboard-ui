import { z } from "zod";

const MAX_FILE_SIZE = 2000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const EventSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  address: z.string().min(1, { message: "Address field is required" }),
  location: z.string().optional(), // Assuming location can be optional
  date: z.string().optional(), // Assuming date can be optional and is a string
  status: z
    .enum(["past", "upcoming"])
    .or(z.string().min(1, { message: "Status is required" }))
    .optional(),
  report: z
    .any()
    .refine(
      (files) => {
        if (!Array.isArray(files)) return true; // If not an array, consider it valid
        return (
          files.every((file) => ACCEPTED_DOCUMENT_TYPES.includes(file?.type)) &&
          files.every((file) => file?.size <= MAX_FILE_SIZE)
        );
      },
      {
        message:
          "Accepted document types: PDF, DOC, DOCX. Max file size is 2MB.",
      }
    )
    .optional(),
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

export default EventSchema;
