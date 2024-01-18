"use client";

import { useFormState } from "react-dom";
import { auth } from "../../../auth";
import { FormState, createComment } from "../lib/actions";

export function CreateComment({
  email,
  postName,
}: {
  email: string;
  postName: string;
}) {
  const createCommentWithEmail = createComment.bind(null, email, postName);

  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCommentWithEmail, initialState);

  return (
    <div className="w-2/3 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
      <p className="text-gray-400 text-sm">{email}</p>
      <form action={dispatch}>
        <textarea className="w-full" />
        {state.errors?.content && (
          <p className="text-sm text-red-500">{state.errors.content}</p>
        )}
        <button className="text-blue-500">Comment</button>
        {state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </div>
  );
}
