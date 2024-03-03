import { Session } from "next-auth";
import { Comment, Reply, ReplyTo, SimpleReplyTo } from "./types";

export function getUserName(
  comment: Comment | Reply | Session | ReplyTo,
) {
  return comment.user?.name || comment.user?.email || "Anonymous";
}

export function simplifyReplyTo(
  comment: Comment | Reply | ReplyTo,
): SimpleReplyTo {
  return {
    id: comment.id,
    username: getUserName(comment),
  };
}

export function duration(date: Date) {
  if (typeof date === "string") {
    try {
      date = new Date(date);
    } catch (e) {
      console.error(e);
      return "Unknown";
    }
  }
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
