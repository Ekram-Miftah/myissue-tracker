import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const crateIssueSchema = z.object({
  title: z.string().min(5, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = crateIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format, { status: 400 });
  const NewIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(NewIssue, { status: 201 });
}
