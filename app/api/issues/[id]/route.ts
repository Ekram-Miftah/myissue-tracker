import { IssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Destructure the validated data
  const { title, description } = validation.data;

  // 1. AWAIT the findUnique call and use the ID from the route params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // 2. AWAIT the update call, using validated data (title, description)
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id }, // Use the found issue's ID
    data: {
      title, // Use validated data
      description, // Use validated data
    },
  });

  // Return the updated issue or a success message
  return NextResponse.json(updatedIssue);
}
