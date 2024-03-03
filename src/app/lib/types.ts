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
  _count: {
    replies: number;
  };
};

export type Reply = {
  id: number;
  createdAt: Date;
  content: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  replyTo: ReplyTo | null;
};

export type ReplyTo = {
  id: number;
  user: {
    name: string | null;
    email: string | null;
  };
};

export type SimpleReplyTo = {
  id: number;
  username: string;
};
