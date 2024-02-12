import { Session } from "next-auth";
import { Comment, ReplyTo } from "./types";

export function getUserName(comment: Comment | Session) {
  return comment.user?.name || comment.user?.email || "Anonymous";
}

export function getReplyTo(comment: Comment): ReplyTo {
  return {
    id: comment.id,
    username: getUserName(comment),
  };
}
