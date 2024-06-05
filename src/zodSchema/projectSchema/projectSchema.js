import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const ACCEPTED_DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ProjectMemberSchema = z.object({
  projectId: z.string().min(1, { message: " Project Name field is required" }),
  teamMemberId: z.string().min(1, { message: "Member Name field is required" }),
  position: z.string().min(1, { message: "Position field is required" }),
  category: z.string().min(1, { message: "Category field is required" }),
});
// export const ColorSchema = z.object({
//   name: z.string().min(1, { message: "Color Name field is required" }),
// });

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "title field is required" }),
  description: z.string().min(1, { message: "description field is required" }),
  status: z.string().min(1, { message: "status field is required" }),
  startingDate: z.string(),
  endDate: z.string(),
  budget: z.union([z.string(), z.number()]),
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
  proposal: z
    .any()
    .refine(
      (files) => {
        if (!Array.isArray(files)) return true;
        return files.every((file) => ACCEPTED_DOC_TYPES.includes(file?.type));
      },
      {
        message: "Accepted documents types only PDF, DOC, DOCX...",
      }
    )
    .optional(),
});
