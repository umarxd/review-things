"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewsPage from "~/components/ReviewsPage";

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

  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: ({ pageParam }) => fetchReviews(pageParam),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore == false) {
        return null;
      }
      return lastPage.page + 1;
    },
  });

  return (
    <div className="">
      {data ? (
        data?.pages.map((reviewPage) => <ReviewsPage data={reviewPage} />)
      ) : (
        <div>Loading</div>
      )}

      {hasNextPage && (
        <button
          className="border border-blue-500 hover:bg-blue-500"
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      )}
    </div>
  );
}
