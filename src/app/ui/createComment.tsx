import { useFormState, useFormStatus } from "react-dom";
import { FormState, createComment, deleteComment } from "../lib/actions";
import { useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReplyTo } from "../lib/types";

export function CreateComment({
  username,
  postName,
  replyTo,
  setReplyTo,
}: {
  username: string;
  postName: string;
  replyTo: ReplyTo | null;
  setReplyTo: (replyTo: ReplyTo | null) => void;
}) {
  const createSpecificComment = createComment.bind(
    null,
    postName,
    replyTo?.id || null,
  );

  const { pending } = useFormStatus();

  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSpecificComment, initialState);
  const [content, setContent] = useState("");

  const action = (x: FormData) => {
    dispatch(x);

    if (!state.message && !state.errors?.content) {
      // Reset the text area if the comment was successful
      setContent("");
      setReplyTo(null);
    }
  };

  return (
    <div className="w-2/3 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
      {replyTo && <ReplyingTo replyTo={replyTo} setReplyTo={setReplyTo} />}
      <p className="text-gray-400 text-sm">{username}</p>
      <form action={action}>
        <textarea
          className="w-full"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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

function ReplyingTo({
  replyTo,
  setReplyTo,
}: {
  replyTo: ReplyTo;
  setReplyTo: (replyTo: ReplyTo | null) => void;
}) {
  return (
    <p className="text-black-400 text-sm">
      Replying to <span className="font-bold">{replyTo.username}</span>
      <button className="hover:text-black-500" onClick={() => setReplyTo(null)}>
        <XMarkIcon className="w-3.5 h-auto" />
      </button>
    </p>
  );
}

export function DeleteButton({ id, name }: { id: number; name: string }) {
  const { pending } = useFormStatus();

  const action = deleteComment.bind(null, id, name);

  return (
    <form action={action}>
      <button
        className="text-black-300 hover:text-black-400"
        aria-disabled={pending}
      >
        <TrashIcon className="w-3.5 h-auto" />
      </button>
    </form>
  );
}
