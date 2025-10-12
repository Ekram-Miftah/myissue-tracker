import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
interface Props {
  status: Status;
}
const statusmap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  CLOSED: { lable: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusmap[status].color}>{statusmap[status].lable}</Badge>
  );
};

export default IssueStatusBadge;
