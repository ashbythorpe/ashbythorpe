import { getComments, getTotalComments } from "../lib/data";
import { Comment } from "../lib/types";
import { CommentList } from "./commentList";
import { Pagination } from "./pagination";

export default async function Comments({
  name,
  params,
  id,
}: {
  name: string;
  params: { page?: string };
  id: string | null;
}) {
  const page = Number(params.page || 1);

  const comments: Comment[] = await getComments(name, page);

  return (
    <div className="rounded-sm border border-gray-700 p-2">
      <CommentList comments={comments} id={id} name={name} />
      <PaginationWrapper name={name} page={page} />
    </div>
  );
}

async function PaginationWrapper({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const totalComments = await getTotalComments(name);

  const totalPages = Math.ceil(totalComments / 6);

  return <Pagination page={page} totalPages={totalPages} />;
}
