import React from "react";
import { db } from "~/server/db";

interface ReviewPageProps {
  params: {
    id: string;
  };
}

const ReviewPage = async ({ params }: ReviewPageProps) => {
  const review = await db.review.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  if (!review) return <div>This review does not exist.</div>;

  return (
    <div>
      <div>Title: {review.title}</div>
      <div>Review: {review.reviewContent}</div>
      <div>Rating: {review.rating}/10</div>
      <div>Category: {review.category}</div>
    </div>
  );
};

export default ReviewPage;
