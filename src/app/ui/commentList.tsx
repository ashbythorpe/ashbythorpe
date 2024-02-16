import { Comment as CommentType, SimpleReplyTo } from "../lib/types";
import { simplifyReplyTo } from "../lib/utils";
import Comment from "./comment";
import Replies from "./replies";

export function CommentList({
  comments,
  id,
  name,
  setReply,
  setOriginalReply,
  setEdit,
  setContent,
}: {
  comments: CommentType[];
  id: string | null;
  name: string;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  setOriginalReply: (originalReply: number | null) => void;
  setEdit: (editing: number) => void;
  setContent: (content: string) => void;
}) {
  return (
    <>
      <p className="font-bold">Comments:</p>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            owned={!!id && comment.user.id === id}
            postName={name}
            onReply={() => {
              setReply(simplifyReplyTo(comment));
              setOriginalReply(comment.id);
            }}
            onEdit={() => {
              setEdit(comment.id);
              setReply(null);
              setOriginalReply(null);
              setContent(comment.content);
            }}
          >
            <Replies
              replies={comment.replies}
              id={id}
              name={name}
              setReply={setReply}
              setOriginalReply={setOriginalReply}
              setEdit={setEdit}
              setContent={setContent}
            />
          </Comment>
        ))}
      </div>
    </>
  );
}
