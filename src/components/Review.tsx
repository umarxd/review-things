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

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <Link href={`/review/${review.id}`}>
      <Card className="my-2 border border-card-foreground sm:w-[512px]">
        <CardHeader>
          <CardTitle>{review.title}</CardTitle>
          <CardDescription>{review.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{review.reviewContent}</p>
        </CardContent>
        <CardFooter>
          <p>{review.rating}/10</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Review;
