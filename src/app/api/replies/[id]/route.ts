import { getReplies } from "@/app/lib/data";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const idParam = params.id;

  if (!idParam) {
    return new Response("No id", { status: 400 });
  }

  let id;

  try {
    id = parseInt(idParam, 10);
  } catch {
    return new Response("Invalid id", { status: 400 });
  }

  const res = await getReplies(id);

  return Response.json(res);
}
