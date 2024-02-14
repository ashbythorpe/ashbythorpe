import { useFormState, useFormStatus } from "react-dom";
import { FormState, createComment, deleteComment } from "../lib/actions";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReplyTo } from "../lib/types";

export function CreateComment({
  username,
  postName,
  replyTo,
  setReplyTo,
  editing,
  setEditing,
  content,
  setContent,
}: {
  username: string;
  postName: string;
  replyTo: ReplyTo | null;
  setReplyTo: (replyTo: ReplyTo | null) => void;
  editing: number | null;
  setEditing: (editing: number | null) => void;
  content: string;
  setContent: (content: string) => void;
}) {
  const createSpecificComment = createComment.bind(
    null,
    postName,
    replyTo?.id || null,
    editing,
  );

  const { pending } = useFormStatus();

  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSpecificComment, initialState);

  const action = (x: FormData) => {
    dispatch(x);

    if (!state.message && !state.errors?.content) {
      // Reset the text area if the comment was successful
      setContent("");
      setReplyTo(null);
      setEditing(null);
    }
  };

  return (
    <div className="w-2/3 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
      {editing && <Editing setEditing={setEditing} />}
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

function Editing({
  setEditing,
}: {
  setEditing: (editing: number | null) => void;
}) {
  return (
    <div className="flex text-black-400 text-sm space-x-1">
      <PencilIcon className="w-3.5 h-auto" />
      <p>Editing</p>
      <button
        className="text-black-300 hover:text-black-400 pl-1"
        onClick={() => setEditing(null)}
      >
        <XMarkIcon className="w-3.5 h-auto" />
      </button>
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
    <div className="flex text-black-400 text-sm">
      <p>
        Replying to <span className="font-bold">{replyTo.username}</span>
      </p>
      <button
        className="hover:text-black-500 pl-2"
        onClick={() => setReplyTo(null)}
      >
        <XMarkIcon className="w-3.5 h-auto" />
      </button>
    </div>
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
