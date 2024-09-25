"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const schema = z.object({
  title: z.string().min(1).max(64),
  category: z.string().min(1).max(64),
  reviewContent: z.string().min(1).max(512),
  rating: z.number().min(0).max(10),
});

type FormFields = z.infer<typeof schema>;

const CreateReview = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await fetch("http://localhost:3000/api/review-add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError("root", {
        message:
          errorData.message || "An error occurred while submitting the form",
      });
      return;
    }

    const addedReview = await response.json();
    router.push(`/review/${addedReview.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="white mx-auto flex flex-col items-center justify-center gap-4 sm:w-[512px]"
    >
      <Input {...register("title")} type="text" placeholder="Title" />
      {errors.title && (
        <div className="text-red-500">{errors.title.message}</div>
      )}
      <div className="w-full">
        <Input {...register("category")} type="text" placeholder="Category" />
        <div className="hidden gap-2 rounded-md border border-destructive px-3 py-2 text-sm text-muted-foreground sm:flex">
          {["Games", "Movies", "Books", "Food", "Tech", "Music"].map(
            (category) => (
              <div
                key={category}
                className="hover:cursor-pointer hover:text-foreground"
                onClick={() => setValue("category", category)}
              >
                {category}
              </div>
            ),
          )}
        </div>

        {errors.category && (
          <div className="text-red-500">{errors.category.message}</div>
        )}
      </div>
      <Input {...register("reviewContent")} type="text" placeholder="Review" />
      {errors.reviewContent && (
        <div className="text-red-500">{errors.reviewContent.message}</div>
      )}
      <Input
        {...register("rating", {
          setValueAs: (value) => parseInt(value),
        })}
        type="text"
        placeholder="Rating 1 to 10"
      />
      {errors.rating && (
        <div className="text-red-500">{errors.rating.message}</div>
      )}
      <Button
        disabled={isSubmitting}
        className="border hover:bg-destructive"
        type="submit"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
      {errors.root && (
        <div className="text-red-500">{errors.root?.message}</div>
      )}
      {isSubmitSuccessful && (
        <div className="text-green-500">Successfully added the review.</div>
      )}
    </form>
  );
};

export default CreateReview;
