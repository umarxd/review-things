"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewsPage from "~/components/ReviewsPage";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const fetchReviews = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/review/get?page=${page}&limit=3`,
      );

      const currentReviews = await response.json();
      return currentReviews;
    } catch (error) {}
  };

  const { data, fetchNextPage, hasNextPage, error, isLoading } =
    useInfiniteQuery({
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
      {data &&
        data.pages.map((reviewPage, pageIndex) => (
          <ReviewsPage key={pageIndex} data={reviewPage} />
        ))}
      {isLoading && (
        <div className="text-lg font-bold text-primary">Loading</div>
      )}

      {hasNextPage && (
        <Button
          className="border hover:bg-destructive"
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </div>
  );
}
