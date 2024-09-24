import React from "react";
import Review from "./Review";
import { ReviewType } from "../types/main-types";

interface DataProps {
  hasMore: boolean;
  page: number;
  pageSize: number;
  reviews: ReviewType[];
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
