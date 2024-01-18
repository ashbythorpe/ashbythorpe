import { Comment } from "../lib/types";

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <>
      <p className="font-bold">Comments:</p>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentDisplay key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}

export function CommentDisplay({ comment }: { comment: Comment }) {
  const email = comment.email || "Anonymous";

  return (
    <>
      <p>{comment.content}</p>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{email}</p>
        <p className="text-xs text-gray-500">{comment.createdAt.toString()}</p>
      </div>
    </>
  );
}
