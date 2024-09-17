import React from "react";

const ReviewsPage = ({ data }) => {
  return (
    <div>
      {data?.reviews.map((review) => <div>Review: {review.reviewContent}</div>)}
    </div>
  );
};

export default ReviewsPage;
