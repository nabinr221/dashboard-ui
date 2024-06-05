import { z } from "zod";

export const eventSponsorSchema = z.object({
  eventId: z.string().min(1, { message: "event field is required" }),
  sponsorId: z.string().min(1, { message: "Member field is required" }),
});
