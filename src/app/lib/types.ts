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
};
