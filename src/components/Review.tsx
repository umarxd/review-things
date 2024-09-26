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
    <Card className="my-2 border border-card-foreground sm:w-[512px]">
      <CardHeader>
        <Link href={`/review/${review.id}`}>
          <CardTitle>{review.title}</CardTitle>
        </Link>
        <CardDescription>{review.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{review.reviewContent}</p>
      </CardContent>
      <CardContent>
        <div onClick={handleLike}>Like</div>
      </CardContent>
      <CardContent>{review.likes.length} Like/s</CardContent>
      <CardFooter>
        <p>{review.rating}/10</p>
      </CardFooter>
    </Card>
  );
};

export default Review;
