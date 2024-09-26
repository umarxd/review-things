import React from "react";
import Review from "~/components/Review";
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
      likes: true,
    },
  });

  if (!review) return <div>This review does not exist.</div>;

  return (
    <div className="flex items-center justify-center">
      <Review review={review} />
    </div>
  );
};

export default ReviewPage;
