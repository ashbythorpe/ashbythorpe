export type Post = {
  title: string;
  description: string;
  name: string;
  createdAt: Date;
};

export type Comment = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  content: string;
};
