"use client";
import dynamic from "next/dynamic";

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { crateIssueSchema } from "@/app/ValidationSchema";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof crateIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <textarea
      className="w-full p-2 border rounded-md"
      placeholder="Loading editor..."
      rows={5}
    />
  ),
});

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(crateIssueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err) {
      setSubmitting(false);
      setError("Something went wrong!");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
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

export default IssueForm;
