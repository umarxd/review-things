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

interface reviewProps {
  id: string;
  userId: string;
  category: string;
  title: string;
  reviewContent: string;
  rating: number;
  createdAt: Date;
}

const Review = ({ review }: { review: reviewProps }) => {
  return (
    <Link href={`/review/${review.id}`}>
      <Card className="my-2 sm:w-[512px]">
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
