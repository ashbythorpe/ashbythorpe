import { Session } from "next-auth";
import { Comment, ReplyTo } from "./types";

export function getUserName(
  comment: Comment | Session | NonNullable<Comment["replyTo"]>,
) {
  return comment.user?.name || comment.user?.email || "Anonymous";
}

export function getReplyTo(
  comment: Comment | NonNullable<Comment["replyTo"]>,
): ReplyTo {
  return {
    id: comment.id,
    username: getUserName(comment),
  };
}
