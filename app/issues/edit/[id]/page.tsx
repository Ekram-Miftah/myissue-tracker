import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";

// Assuming this path is correct for your project structure
import IssueFormWrapper from "@/app/issues/_components/IssueFormWrapper";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // CRITICAL FIX: The params object is available directly in a Server Component.
  // We do NOT need (and should NOT use) 'await params'.

  // Assuming your Issue ID is an integer in the database.
  const issue: Issue | null = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
};

export default EditIssuePage;
