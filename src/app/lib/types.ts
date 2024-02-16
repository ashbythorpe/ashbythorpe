export type Post = {
  title: string;
  description: string;
  name: string;
  createdAt: Date;
};

export type Comment = {
  id: number;
  createdAt: Date;
  content: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  replies: InnerComment[];
};

export type InnerComment = {
  id: number;
  createdAt: Date;
  content: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  replyTo: ReplyTo;
  originalReplyTo: {
    id: number;
  };
};

export type ReplyTo = {
  id: number;
  user: {
    name: string;
    email: string;
  };
};

export type SimpleReplyTo = {
  id: number;
  username: string;
};
