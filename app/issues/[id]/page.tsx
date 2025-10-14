import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

import { Text } from "@radix-ui/themes";
import ReactMarkdow from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose prose-invert" mt="4">
        <ReactMarkdow>{issue.description}</ReactMarkdow>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
