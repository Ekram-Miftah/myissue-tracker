import authOptions from "@/app/auth/authOptions";
import { IssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  // 1. Validate request body
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // 2. Resolve parameters and find the issue
  const resolvedParams = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  // Check if issue exists
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // 3. Update the issue
  const { title, description } = validation.data;
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
    },
  });

  // 4. Return the updated issue
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });
  const resolvedParams = await params;

  // 2. Find the issue (CRITICAL FIX: Added 'await' to resolve the Promise)
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  // Check if issue exists
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // 3. Delete the issue
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  // 4. Return success response
  return NextResponse.json(
    { message: "Issue deleted successfully" },
    { status: 200 }
  );
}
