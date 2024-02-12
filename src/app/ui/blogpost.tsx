import { auth } from "../../../auth";
import { getComments, getTotalComments } from "../lib/data";
import { Comment } from "../lib/types";
import CommentsClient from "./comments-client";

export default async function BlogPost({
  children,
  name,
  params,
}: {
  children: React.ReactNode;
  name: string;
  params: { page?: string };
}) {
  return (
    <div className="flex-grow w-full bg-gray-100 h-full py-5 px-5 md:px-20 lg:px-40">
      <div className="prose">{children}</div>
      <hr className="my-10 bg-gray-300 border-0 h-px" />
      <CommentsWrapper name={name} params={params} />
    </div>
  );
}

async function CommentsWrapper({
  name,
  params,
}: {
  name: string;
  params: { page?: string };
}) {
  const page = Number(params.page || 1);

  const [session, comments, nComments] = await Promise.all([
    auth(),
    getComments(name, page),
    getTotalComments(name),
  ]);

  return (
    <CommentsClient
      name={name}
      params={params}
      comments={comments}
      nComments={nComments}
      session={session}
    ></CommentsClient>
  );
}
