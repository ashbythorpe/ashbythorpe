export type Post = {
  title: string;
  description: string;
  name: string;
  createdAt: Date;
};

export type Comment = {
  id: number;
  email: string | null;
  createdAt: Date;
  content: string;
};
