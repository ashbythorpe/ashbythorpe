import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 3;
export async function getPosts(page: number) {
  noStore();

  const posts = await prisma.blog.findMany({
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    // include: {
    //   title: true,
    //   description: true,
    //   name: true,
    //   createdAt: true,
    // },
  });

  return posts;
}

export async function getTotalPosts() {
  noStore();

  return prisma.blog.count();
}
