"use client";

import { useFormState, useFormStatus } from "react-dom";
import { FormState, createComment } from "../lib/actions";
import { useState } from "react";

export function CreateComment({
  email,
  postName,
}: {
  email: string;
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
      <p className="text-gray-400 text-sm">{email}</p>
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
