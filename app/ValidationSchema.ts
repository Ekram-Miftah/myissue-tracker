import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(65535),
});

export const PatchIssueSchema = z.object({
  title: z.string().min(5, "Title is required").max(200).max(65535).optional(),
  description: z.string().min(1, "Description is required").optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is Required")
    .max(255)
    .optional()
    .nullable(),
});
