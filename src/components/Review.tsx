"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { ReviewType } from "~/types/main-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async (reviewId: string) => {
  const response = await fetch("http://localhost:3000/api/review/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewId }),
  });

  if (!response.ok) {
    throw new Error("Failed to like the review.");
  }

  return response.json();
};

const Review = ({ review }: { review: ReviewType }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (reviewId: string) => mutationFn(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const handleLike = () => {
    mutate(review.id);
  };

  return (
    <Card className="my-2 flex-row items-center justify-between border border-card-foreground sm:flex sm:w-[512px]">
      <CardContent>
        <CardHeader>
          <Link href={`/review/${review.id}`}>
            <CardTitle>{review.title}</CardTitle>
          </Link>
          <CardDescription>{review.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{review.reviewContent}</p>
        </CardContent>

        <CardFooter>
          <p className="font-semibold text-primary">{review.rating}/10</p>
        </CardFooter>
      </CardContent>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div
            onClick={handleLike}
            className="cursor-pointer rounded-md border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Like
          </div>

          <div className="text-sm text-muted-foreground">
            {review.likes.length} {review.likes.length === 1 ? "Like" : "Likes"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Review;
