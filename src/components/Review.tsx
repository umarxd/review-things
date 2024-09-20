import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface reviewProps {
  id: string;
  userId: string;
  category: string;
  title: string;
  reviewContent: string;
  rating: number;
  createdAt: string;
}

const Review = ({ review }: { review: reviewProps }) => {
  return (
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
  );
};

export default Review;
