import { Reply, SimpleReplyTo } from "../lib/types";
import { simplifyReplyTo } from "../lib/utils";
import Comment from "./comment";

export function ReplyList({
  replies,
  originalReplyId,
  id,
  name,
  setReply,
  setOriginalReply,
  setEdit,
  setContent,
}: {
  replies: Reply[];
  originalReplyId: number,
  id: string | null;
  name: string;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  setOriginalReply: (originalReply: number | null) => void;
  setEdit: (editing: number) => void;
  setContent: (content: string) => void;
}) {
  return (
    <div className="pl-5">
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          owned={!!id && reply.user.id === id}
          postName={name}
          reply={simplifyReplyTo(reply.replyTo!)}
          onReply={() => {
            setReply(simplifyReplyTo(reply));
            setOriginalReply(originalReplyId);
          }}
          onEdit={() => {
            setEdit(reply.id);
            setContent(reply.content);
          }}
        />
      ))}
    </div>
  );
}
