import { InnerComment, ReplyTo, SimpleReplyTo } from "../lib/types";
import { simplifyReplyTo } from "../lib/utils";
import Comment from "./comment";

export default function Replies({
  replies,
  id,
  name,
  setReply,
  setOriginalReply,
  setEdit,
  setContent,
}: {
  replies: InnerComment[];
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
          reply={simplifyReplyTo(reply.replyTo)}
          onReply={() => {
            setReply(simplifyReplyTo(reply));
            setOriginalReply(reply.originalReplyTo.id);
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
