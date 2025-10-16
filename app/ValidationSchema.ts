import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
});
