"use client";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

// ✅ Import the main component named TextField
import { Button, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
