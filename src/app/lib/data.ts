"use server";

import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { Comment, Post, Reply } from "./types";
import { cache } from "react";

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
      _count: {
        select: { replies: true }
      }
    },
  });

  return comments;
}

export const getCachedReplies = cache(async (id: number) => {
  return await getReplies(id);
})

export async function getReplies(id: number): Promise<Reply[]> {
  const replies = await prisma.comment.findMany({
    where: {
      replyTo: {
        id,
      },
    },
    orderBy: {
      createdAt: "asc",
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
    },
  });

  return replies;
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
