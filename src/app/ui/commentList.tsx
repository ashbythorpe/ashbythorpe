import { Comment } from "../lib/types";
import { getUserName } from "../lib/utils";
import { DeleteButton } from "./createComment";

export function CommentList({
  comments,
  id,
  name,
}: {
  comments: Comment[];
  id: string | null;
  name: string;
}) {
  return (
    <>
      <p className="font-bold">Comments:</p>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentDisplay
            key={comment.id}
            comment={comment}
            canDelete={!!id && comment.user.id === id}
            postName={name}
          />
        ))}
      </div>
    </>
  );
}

export function CommentDisplay({
  comment,
  canDelete,
  postName,
}: {
  comment: Comment;
  canDelete: boolean;
  postName: string;
}) {
  const name = getUserName(comment);

  const time = duration(comment.createdAt);

  return (
    <>
      <div className="flex flex-grow justify-between">
        <p>{comment.content}</p>
        {canDelete && <DeleteButton id={comment.id} name={postName} />}
      </div>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{name}</p>
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
