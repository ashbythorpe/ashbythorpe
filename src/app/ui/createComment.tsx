"use client";

import { useFormState, useFormStatus } from "react-dom";
import { FormState, createComment, deleteComment } from "../lib/actions";
import { useState } from "react";

export function CreateComment({
  username,
  postName,
}: {
  username: string;
  postName: string;
}) {
  const createCommentWithEmail = createComment.bind(null, postName);

  const { pending } = useFormStatus();

  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCommentWithEmail, initialState);
  const [content, setContent] = useState("");

  const action = (x: FormData) => {
    dispatch(x);

    if (!state.message && !state.errors?.content) {
      // Reset the text area if the comment was successful
      setContent("");
    }
  };

  return (
    <div className="w-2/3 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
      <p className="text-gray-400 text-sm">{username}</p>
      <form action={action}>
        <textarea
          className="w-full"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {state?.errors?.content &&
          state.errors.content.map((error) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <button className="text-blue-500" aria-disabled={pending}>
          Comment
        </button>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </div>
  );
}

export function DeleteButton({ id, name }: { id: number; name: string }) {
  const { pending } = useFormStatus();

  const action = deleteComment.bind(null, id, name);

  return (
    <form action={action}>
      <button
        className="text-red-500 hover:text-red-700"
        aria-disabled={pending}
      >
        Delete
      </button>
    </form>
  );
}
