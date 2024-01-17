import { getTotalPosts } from "@/app/lib/data";

export async function GET(request: Request) {
  const total = await getTotalPosts();

  return Response.json({ total });
}
