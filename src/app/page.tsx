"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export default function HomePage() {
  const fetchReviews = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/review-get?page=${page}&limit=5`,
      );

      const currentReviews = await response.json();
      return currentReviews;
    } catch (error) {}
  };

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews"],
      queryFn: ({ pageParam }) => fetchReviews(pageParam),
      initialPageParam: 1,

      getNextPageParam: (lastPage) => {
        return lastPage.page + 1;
      },
    });

  return (
    <div className="">
      {JSON.stringify(data)}
      <button onClick={() => fetchNextPage()}>Load more</button>
    </div>
  );
}
