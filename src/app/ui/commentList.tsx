import { Comment } from "../lib/types";

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="rounded-sm border border-gray-700 p-2">
      <p className="font-bold">Comments:</p>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentDisplay key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export function CommentDisplay({ comment }: { comment: Comment }) {
  return (
    <div className="rounded-sm border border-gray-700 p-2">
      <p>{comment.content}</p>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{comment.name}</p>
        <p className="text-xs text-gray-500">{comment.createdAt.toString()}</p>
      </div>
    </div>
  );
}
