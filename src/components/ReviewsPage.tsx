import React from "react";
import Review from "./Review";

type Review = {
  id: string;
  userId: string;
  category: string;
  title: string;
  reviewContent: string;
  rating: number;
  createdAt: Date; // ISO date string
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
    <div className="">
      {data?.reviews.map((review, reviewIndex) => (
        <Review review={review} key={reviewIndex} />
      ))}
    </div>
  );
};

export default ReviewsPage;
