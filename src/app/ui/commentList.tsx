import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Comment, ReplyTo } from "../lib/types";
import { getReplyTo, getUserName } from "../lib/utils";
import { DeleteButton } from "./createComment";

export function CommentList({
  comments,
  id,
  name,
  changeReply,
}: {
  comments: Comment[];
  id: string | null;
  name: string;
  changeReply: (replyTo: ReplyTo) => void;
}) {
  return (
    <>
      <p className="font-bold">Comments:</p>
      <div>
        {comments.map((comment) => (
          <CommentDisplay
            key={comment.id}
            comment={comment}
            owned={!!id && comment.user.id === id}
            postName={name}
            replyName={comment.replyTo?.user.name || null}
            onReply={() => changeReply(getReplyTo(comment))}
          />
        ))}
      </div>
    </>
  );
}

export function CommentDisplay({
  comment,
  owned,
  postName,
  replyName,
  onReply,
}: {
  comment: Comment;
  owned: boolean;
  postName: string;
  replyName: string | null;
  onReply: () => void;
}) {
  const name = getUserName(comment);

  const time = duration(comment.createdAt);

  return (
    <>
      <div className="flex flex-grow justify-between">
        <div className="py-2 h-full items-center flex">
          <p>
            {replyName && (
              <span className="font-semibold">{`@${replyName} `}</span>
            )}
            {comment.content}
          </p>
        </div>
        <div className="flex items-start">
          {owned && <DeleteButton id={comment.id} name={postName} />}
          <ReplyButton onClick={onReply} />
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{name}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </>
  );
}

function ReplyButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button className="text-black-300 hover:text-black-400" onClick={onClick}>
        <ArrowUturnLeftIcon className="w-3.5 h-auto" />
      </button>
    </div>
  );
}

function duration(date: Date) {
  const duration = Date.now() - date.getTime();
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (days < 14) {
    return "1 week ago";
  } else if (days < 30) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days < 60) {
    return "1 month ago";
  } else if (days < 365) {
    return `${Math.floor(days / 30)} months ago`;
  } else if (days < 730) {
    return "1 year ago";
  } else {
    return `${Math.floor(days / 365)} years ago`;
  }
}
