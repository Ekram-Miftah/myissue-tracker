import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Link } from "@radix-ui/themes";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil1Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
