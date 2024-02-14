"use client";

import { useState } from "react";
import { signOut } from "../../../auth";
import { getUserName } from "../lib/utils";
import Comments from "./comments";
import { CreateComment } from "./createComment";
import { SignInButton } from "./signIn";
import { Session } from "next-auth";
import { logout } from "../lib/actions";
import { Comment, ReplyTo } from "../lib/types";

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
  const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const username = session ? getUserName(session) : null;

  return (
    <>
      <Comments
        comments={comments}
        nComments={nComments}
        name={name}
        params={params}
        id={session?.user?.id || null}
        setReply={setReplyTo}
        setEdit={setEditing}
        setContent={setContent}
      />
      <SignInOrCreateComment
        postName={name}
        username={username}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
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
  replyTo,
  setReplyTo,
  editing,
  setEditing,
  content,
  setContent,
}: {
  postName: string;
  username: string | null;
  replyTo: ReplyTo | null;
  setReplyTo: (replyTo: ReplyTo | null) => void;
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
          replyTo={replyTo}
          setReplyTo={setReplyTo}
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
