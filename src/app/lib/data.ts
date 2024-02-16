import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { Comment, Post } from "./types";

const ITEMS_PER_PAGE = 3;
export async function getPosts(page: number): Promise<Post[]> {
  noStore();

  const posts = await prisma.blog.findMany({
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      description: true,
      name: true,
      createdAt: true,
    },
  });

  return posts;
}

export async function getTotalPosts() {
  noStore();

  return prisma.blog.count();
}

const COMMENTS_PER_PAGE = 6;

export async function getComments(
  name: string,
  page: number,
): Promise<Comment[]> {
  noStore();

  const comments = await prisma.comment.findMany({
    where: {
      blog: {
        name: name,
      },
      replyTo: {
        is: null,
      },
    },
    skip: COMMENTS_PER_PAGE * (page - 1),
    take: COMMENTS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      replies: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          replyTo: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          originalReplyTo: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return comments;
}

export async function getTotalComments(name: string) {
  noStore();

  return prisma.comment.count({
    where: {
      blog: {
        name: name,
      },
    },
  });
}
