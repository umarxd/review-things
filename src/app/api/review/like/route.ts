import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const { reviewId } = await req.json();

    const like = await db.like.create({
      data: {
        userId: session.user.id,
        reviewId,
      },
    });

    return new Response(JSON.stringify(like), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: error?.message || "Something went wrong." }),
      { status: 500 },
    );
  }
}
