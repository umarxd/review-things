import { db } from "~/server/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 3;

  try {
    const reviews = await db.review.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const totalReviews = await db.review.count();

    return new Response(
      JSON.stringify({
        reviews,
        page: pageNumber,
        pageSize,
        totalReviews,
        hasMore: pageNumber * pageSize < totalReviews,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
