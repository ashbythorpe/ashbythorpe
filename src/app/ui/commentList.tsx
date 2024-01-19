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

  const time = duration(comment.createdAt);

  return (
    <>
      <p>{comment.content}</p>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{email}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </>
  );
}

function duration(date: Date) {
  const duration = Date.now() - date.getTime();
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (days < 30) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days < 365) {
    return `${Math.floor(days / 30)} months ago`;
  } else {
    return `${Math.floor(days / 365)} years ago`;
  }
}
