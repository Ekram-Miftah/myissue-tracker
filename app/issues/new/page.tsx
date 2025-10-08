"use client";
import dynamic from "next/dynamic"; // 💡 FIX 1: Import dynamic

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField, Text, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { crateIssueSchema } from "@/app/ValidationSchema";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof crateIssueSchema>;
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

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(crateIssueSchema),
    defaultValues: {
      // <--- ADD THIS
      title: "",
      description: "", // <--- IMPORTANT FOR CONTROLLER
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
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
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("Something went wrong!");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            // 💡 FIX 3: Use the dynamically loaded component
            <SimpleMDE placeholder="description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
