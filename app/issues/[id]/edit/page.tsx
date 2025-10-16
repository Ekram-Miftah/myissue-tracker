import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  // FIX: Await the 'params' object before accessing its properties.
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });
  // The rest of the code is fine.
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
