import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const { category, title, reviewContent, rating } = await req.json();
    const session = await getServerAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const addedReview = await db.review.create({
      data: {
        category: category,
        title: title,
        reviewContent: reviewContent,
        rating: rating,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(addedReview), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
