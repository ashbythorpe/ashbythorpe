import { Session } from "next-auth";
import { Comment } from "./types";

export function getUserName(comment: Comment | Session) {
  return comment.user?.name || comment.user?.email || "Anonymous";
}
