import { Comment, ReplyTo } from "../lib/types";
import { CommentList } from "./commentList";
import { Pagination } from "./pagination";

export default function Comments({
  comments,
  nComments,
  name,
  params,
  id,
  changeReply,
}: {
  comments: Comment[];
  nComments: number;
  name: string;
  params: { page?: string };
  id: string | null;
  changeReply: (replyTo: ReplyTo) => void;
}) {
  const page = Number(params.page || 1);

  const totalPages = Math.ceil(nComments / 6);

  return (
    <div className="rounded-sm border border-gray-700 p-2">
      <CommentList
        comments={comments}
        id={id}
        name={name}
        changeReply={changeReply}
      />
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
