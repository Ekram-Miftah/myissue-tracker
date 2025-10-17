import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";

// Import the reusable wrapper component (which fixed the BUILD error)
import IssueFormWrapper from "../../_components/IssueFormWrapper";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // FIX FOR THE RUNTIME ERROR: Await params before accessing its properties.
  const resolvedParams = await params;

  const issue: Issue | null = await prisma.issue.findUnique({
    // Use the resolved object here
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
};

export default EditIssuePage;
