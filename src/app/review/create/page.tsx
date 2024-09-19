"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    defaultValues: {
      rating: 0,
    },
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
      className="justify-centers flex flex-col items-center"
    >
      <input {...register("title")} type="text" placeholder="Title" />
      {errors.title && (
        <div className="text-red-500">{errors.title.message}</div>
      )}
      <input {...register("category")} type="text" placeholder="Category" />
      {errors.category && (
        <div className="text-red-500">{errors.category.message}</div>
      )}
      <input {...register("reviewContent")} type="text" placeholder="Review" />
      {errors.reviewContent && (
        <div className="text-red-500">{errors.reviewContent.message}</div>
      )}
      <input
        {...register("rating", {
          setValueAs: (value) => parseInt(value),
        })}
        type="text"
      />
      {errors.rating && (
        <div className="text-red-500">{errors.rating.message}</div>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
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
