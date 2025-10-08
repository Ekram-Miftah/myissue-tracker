import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { crateIssueSchema } from "../../ValidationSchema";

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
