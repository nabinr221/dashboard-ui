import { z } from "zod";

export const eventMemberSchema = z.object({
  position: z.string().min(1, { message: "position field is required" }),
  category: z
    .enum(["event", "coordinator", "member"])
    .or(z.string().min(1, { message: "Status is required" })),
  eventId: z.string().min(1, { message: "event field is required" }),
  memberId: z.string().min(1, { message: "Member field is required" }),
});
