import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const glimpseSchema = z.object({
  eventId: z.string().min(1, { message: "event Name field is required" }),
  image: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png  formats are supported."
    )
    .optional(),
});

export default glimpseSchema;
