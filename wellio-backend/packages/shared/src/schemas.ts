import { z } from "zod";

export const ClientSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  services: z.array(z.string()),
  attention_status: z.enum(["on_track", "needs_attention"]),
  joined_at: z.string(),
  next_session_at: z.string().optional(),
  tags: z.record(z.any()).optional()
});
export type Client = z.infer<typeof ClientSchema>;
