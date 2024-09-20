"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewsPage from "~/components/ReviewsPage";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const fetchReviews = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/review-get?page=${page}&limit=3`,
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
    <div className="flex flex-col items-center justify-center">
      {data ? (
        data.pages.map((reviewPage, pageIndex) => (
          <ReviewsPage key={pageIndex} data={reviewPage} />
        ))
      ) : (
        <div>Loading</div>
      )}

      {hasNextPage && (
        <Button
          className="border border-blue-500 hover:bg-blue-500"
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </div>
  );
}
