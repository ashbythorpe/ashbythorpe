import { Comment, Reply, SimpleReplyTo } from "../lib/types";
import { duration, getUserName } from "../lib/utils";
import { DeleteButton, EditButton, LinkButton, ReplyButton } from "./buttons";

export default function Comment({
  children,
  comment,
  owned,
  postName,
  reply,
  onReply,
  onEdit,
}: {
  children?: React.ReactNode;
  comment: Comment | Reply;
  owned: boolean;
  postName: string;
  reply?: SimpleReplyTo;
  onReply: () => void;
  onEdit: () => void;
}) {
  const name = getUserName(comment);

  const time = duration(comment.createdAt);

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
                <span className="font-semibold">{`@${reply.username} `}</span>
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
      {children}
    </div>
  );
}
