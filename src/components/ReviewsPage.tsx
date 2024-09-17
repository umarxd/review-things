import React from "react";

type Review = {
  id: string;
  userId: string;
  category: string;
  title: string;
  reviewContent: string;
  rating: number;
  createdAt: string; // ISO date string
};

interface DataProps {
  hasMore: boolean;
  page: number;
  pageSize: number;
  reviews: Review[];
  totalReviews: number;
}

const ReviewsPage = ({ data }: { data: DataProps }) => {
  return (
    <div>
      {data?.reviews.map((review, reviewIndex) => (
        <div key={reviewIndex}>Review: {review.reviewContent}</div>
      ))}
    </div>
  );
};

export default ReviewsPage;
