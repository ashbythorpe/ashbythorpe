import { useFormStatus } from "react-dom";
import { FormState, createComment } from "../lib/actions";
import {
  PaperAirplaneIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { SimpleReplyTo } from "../lib/types";
import { useActionState } from "react";

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
  const [state, dispatch] = useActionState(createSpecificComment, initialState);

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
    <form
      action={action}
      className="flex flex-col md:flex-row mx-auto w-5/6 border-b border-b-gray-400/70 pb-4 mb-4 mt-8"
    >
      <div className="mx-auto w-full items-center flex flex-col">
        {editing && <Editing setEditing={setEditing} />}
        {reply && (
          <ReplyingTo
            reply={reply}
            setReply={setReply}
            setOriginalReply={setOriginalReply}
          />
        )}
        <div className="rounded-t bg-indigo-800 px-4 py-1">
          <p className="text-black-100 text-sm font-semibold">{username}</p>
        </div>
        <div className="w-5/6">
          <textarea
            className="w-full h-max py-1 px-2 rounded outline-none shadow-[0_0_0_1px_#b0b0b0] focus:shadow-[0_0_0_2px_#92a2e7]"
            name="content"
            value={content}
            placeholder="Add a comment..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {state?.errors?.content &&
            state.errors.content.map((error) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mx-10 md:mx-0 self-stretch flex flex-col items-center md:justify-center mt-2 md:mt-0">
        <button
          className="text-black-900 md:text-indigo-500 hover:text-indigo-800 bg-jaffa-300 md:bg-transparent hover:bg-jaffa-200 md:hover:bg-transparent rounded px-4 py-2 md:mr-8 md:mt-6"
          aria-disabled={pending}
        >
          <div className="flex space-x-1">
            <p>Comment</p>
            <PaperAirplaneIcon className="w-4 h-auto" />
          </div>
        </button>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </form>
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
