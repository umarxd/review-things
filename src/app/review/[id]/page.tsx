import React from "react";

interface ReviewPageProps {
  params: {
    id: string;
  };
}

const ReviewPage = ({ params }: ReviewPageProps) => {
  console.log(params.id);

  return <div>{params.id}</div>;
};

export default ReviewPage;
