"use client";
import dynamic from "next/dynamic"; // 💡 FIX 1: Import dynamic

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// 💡 FIX 2: Dynamically import SimpleMDE and set ssr: false
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <textarea
      className="w-full p-2 border rounded-md"
      placeholder="Loading editor..."
      rows={10}
    />
  ),
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something went wrong!");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            // 💡 FIX 3: Use the dynamically loaded component
            <SimpleMDE placeholder="description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
