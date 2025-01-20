import { Suspense } from "react";
import { auth } from "../../../auth";
import { getComments, getTotalComments } from "../lib/data";
import CommentsClient from "./comments-client";
import CommentsSkeleton from "./commentsSkeleton";

export default async function BlogPost({
  children,
  name,
  page,
}: {
  children: React.ReactNode;
  name: string;
  page?: string;
}) {
  return (
    <div className="flex-grow w-full bg-gray-100 h-full py-5 px-5 md:px-20 lg:px-40">
      <div className="prose mx-auto">{children}</div>
      <hr className="my-10 bg-gray-300 border-0 h-px" />
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsWrapper name={name} page={page} />
      </Suspense>
    </div>
  );
}

async function CommentsWrapper({
  name,
  page: page_str,
}: {
  name: string;
  page?: string;
}) {
  const page = Number(page_str || 1);

  const [session, comments, nComments] = await Promise.all([
    auth(),
    getComments(name, page),
    getTotalComments(name),
  ]);

  return (
    <CommentsClient
      name={name}
      page={page}
      comments={comments}
      nComments={nComments}
      session={session}
    ></CommentsClient>
  );
}
