// app/issues/_components/IssueFormWrapper.tsx

"use client"; // 👈 MARK AS CLIENT COMPONENT

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton"; // Adjust path

// Define the type for props the wrapper will accept
import { Issue } from "@prisma/client";
interface Props {
  issue?: Issue; // Issue data is passed from the Server Component
}

// Perform the dynamic import with ssr: false safely inside the Client Component
const IssueForm = dynamic(() => import("./IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

// This wrapper component receives the issue prop and passes it to the dynamically loaded form
const IssueFormWrapper = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormWrapper;
