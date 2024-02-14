import {
  ArrowUturnLeftIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Comment, ReplyTo } from "../lib/types";
import { getReplyTo, getUserName } from "../lib/utils";
import { DeleteButton } from "./createComment";
import Link from "next/link";

export function CommentList({
  comments,
  id,
  name,
  setReply,
  setEdit,
  setContent,
}: {
  comments: Comment[];
  id: string | null;
  name: string;
  setReply: (replyTo: ReplyTo | null) => void;
  setEdit: (editing: number) => void;
  setContent: (content: string) => void;
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
            reply={comment.replyTo}
            onReply={() => {
              setReply(getReplyTo(comment));
            }}
            onEdit={() => {
              setEdit(comment.id);
              setReply(comment.replyTo ? getReplyTo(comment.replyTo) : null);
              setContent(comment.content);
            }}
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
  reply,
  onReply,
  onEdit,
}: {
  comment: Comment;
  owned: boolean;
  postName: string;
  reply: Comment["replyTo"] | null;
  onReply: () => void;
  onEdit: () => void;
}) {
  const name = getUserName(comment);

  const time = duration(comment.createdAt);

  const replyName = reply ? getUserName(reply) : null;

  return (
    <div
      id={`comment-${comment.id}`}
      className="target:animate-[flash_3s] my-2"
    >
      <div className="flex flex-grow justify-between group">
        <div className="pb-1 h-full items-center flex transition-colors">
          <p className="group-target:animate-[flash_1s]">
            {reply && (
              <a href={`#comment-${reply.id}`}>
                <span className="font-semibold">{`@${replyName} `}</span>
              </a>
            )}
            {comment.content}
          </p>
        </div>
        <div className="flex items-start">
          <LinkButton href={`#comment-${comment.id}`} />
          {owned && <EditButton onClick={onEdit} />}
          {owned && <DeleteButton id={comment.id} name={postName} />}
          <ReplyButton onClick={onReply} />
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{name}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
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

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button className="text-black-300 hover:text-black-400" onClick={onClick}>
        <PencilIcon className="w-3.5 h-auto" />
      </button>
    </div>
  );
}

function LinkButton({ href }: { href: string }) {
  return (
    <div className="flex-grow pt-1">
      <Link href={href} className="text-black-300 hover:text-black-400">
        <LinkIcon className="w-3.5 h-auto" />
      </Link>
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
