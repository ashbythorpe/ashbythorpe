import { getPosts } from "@/app/lib/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page") || 1);

  const posts = await getPosts(page);

  return Response.json(posts);
}
