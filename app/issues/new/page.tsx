"use client";
import React from "react";

// ✅ Import the main component named TextField
import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
