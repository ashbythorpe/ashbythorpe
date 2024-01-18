import { getComments, getTotalComments } from "../lib/data";
import { Comment } from "../lib/types";
import { CommentList } from "./commentList";
import { Pagination } from "./pagination";

export default async function Comments({
  name,
  params,
}: {
  name: string;
  params: { page?: string };
}) {
  const page = Number(params.page || 1);

  const comments: Comment[] = await getComments(name, page);

  return (
    <div className="rounded-sm border border-gray-700 p-2">
      <CommentList comments={comments} />
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
  const totalPages = await getTotalComments(name);

  return <Pagination page={page} totalPages={totalPages} />;
}
