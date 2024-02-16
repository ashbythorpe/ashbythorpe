import { useFormState, useFormStatus } from "react-dom";
import { FormState, createComment, deleteComment } from "../lib/actions";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReplyTo, SimpleReplyTo } from "../lib/types";

export function CreateComment({
  username,
  postName,
  reply,
  setReply,
  originalReply,
  setOriginalReply,
  editing,
  setEditing,
  content,
  setContent,
}: {
  username: string;
  postName: string;
  reply: SimpleReplyTo | null;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  originalReply: number | null;
  setOriginalReply: (originalReply: number | null) => void;
  editing: number | null;
  setEditing: (editing: number | null) => void;
  content: string;
  setContent: (content: string) => void;
}) {
  const createSpecificComment = createComment.bind(
    null,
    postName,
    reply?.id || null,
    originalReply,
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
      setReply(null);
      setOriginalReply(null);
      setEditing(null);
    }
  };

  return (
    <div className="w-2/3 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
      {editing && <Editing setEditing={setEditing} />}
      {reply && (
        <ReplyingTo
          reply={reply}
          setReply={setReply}
          setOriginalReply={setOriginalReply}
        />
      )}
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
  reply,
  setReply,
  setOriginalReply,
}: {
  reply: SimpleReplyTo;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  setOriginalReply: (originalReply: number | null) => void;
}) {
  return (
    <div className="flex text-black-400 text-sm">
      <p>
        Replying to <span className="font-bold">{reply.username}</span>
      </p>
      <button
        className="hover:text-black-500 pl-2"
        onClick={() => {
          setReply(null);
          setOriginalReply(reply.id);
        }}
      >
        <XMarkIcon className="w-3.5 h-auto" />
      </button>
    </div>
  );
}
