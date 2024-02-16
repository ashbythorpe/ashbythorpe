"use client";

import { useState } from "react";
import { signOut } from "../../../auth";
import { getUserName } from "../lib/utils";
import { CreateComment } from "./createComment";
import { SignInButton } from "./signIn";
import { Session } from "next-auth";
import { logout } from "../lib/actions";
import { Comment, ReplyTo, SimpleReplyTo } from "../lib/types";
import { CommentList } from "./commentList";
import { Pagination } from "./pagination";

export default function CommentsClient({
  name,
  params,
  session,
  comments,
  nComments,
}: {
  name: string;
  params: { page?: string };
  session: Session | null;
  comments: Comment[];
  nComments: number;
}) {
  const [reply, setReply] = useState<SimpleReplyTo | null>(null);
  const [originalReply, setOriginalReply] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const username = session ? getUserName(session) : null;
  const page = params?.page ? parseInt(params.page) : 1;

  const totalPages = Math.ceil(nComments / 6);

  return (
    <>
      <div className="rounded-sm border border-gray-700 p-2">
        <CommentList
          comments={comments}
          id={session?.user?.id || null}
          name={name}
          setReply={setReply}
          setEdit={setEditing}
          setOriginalReply={setOriginalReply}
          setContent={setContent}
        />
        <Pagination page={page} totalPages={totalPages} />
      </div>
      <SignInOrCreateComment
        postName={name}
        username={username}
        reply={reply}
        setReply={setReply}
        originalReply={originalReply}
        setOriginalReply={setOriginalReply}
        editing={editing}
        setEditing={setEditing}
        content={content}
        setContent={setContent}
      />
    </>
  );
}

function SignInOrCreateComment({
  postName,
  username,
  reply,
  setReply,
  originalReply,
  setOriginalReply,
  editing,
  setEditing,
  content,
  setContent,
}: {
  postName: string;
  username: string | null;
  reply: SimpleReplyTo | null;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  originalReply: number | null;
  setOriginalReply: (originalReply: number | null) => void;
  editing: number | null;
  setEditing: (editing: number | null) => void;
  content: string;
  setContent: (content: string) => void;
}) {
  if (username) {
    return (
      <>
        <CreateComment
          username={username}
          postName={postName}
          reply={reply}
          setReply={setReply}
          originalReply={originalReply}
          setOriginalReply={setOriginalReply}
          editing={editing}
          setEditing={setEditing}
          content={content}
          setContent={setContent}
        />
        <SignOutButton />
      </>
    );
  } else {
    return <SignInButton />;
  }
}

function SignOutButton() {
  return (
    <form action={logout}>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Sign out
      </button>
    </form>
  );
}
