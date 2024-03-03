import { useEffect, useState } from "react";
import { Reply, SimpleReplyTo } from "../lib/types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ReplyList } from "./replyList";

export default function Replies({
  originalReplyId,
  replyNumber,
  id,
  name,
  setReply,
  setOriginalReply,
  setEdit,
  setContent,
}: {
  originalReplyId: number,
  replyNumber: number;
  id: string | null;
  name: string;
  setReply: (replyTo: SimpleReplyTo | null) => void;
  setOriginalReply: (originalReply: number | null) => void;
  setEdit: (editing: number) => void;
  setContent: (content: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<Reply[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchReplies = async () => {
      const res = await fetch(`/api/replies/${originalReplyId}`);
      const data = await res.json();
      setReplies(data);
      setLoading(false);
    };

    fetchReplies();
  }, [originalReplyId, open, replies])

  if (replyNumber === 0) return null;

  if (!open) {
    return <ReplyButton open={false} onClick={() => {
      if (!replies) {
        setLoading(true)
      }
      setOpen(true)
    }} replies={replyNumber} />;
  } else {
    return (
      <>
        {loading ? <Loading /> : <ReplyButton open={true} onClick={() => setOpen(false)} replies={replyNumber} />}
        {replies && !loading && <ReplyList
          replies={replies}
          originalReplyId={originalReplyId}
          id={id}
          name={name}
          setReply={setReply}
          setOriginalReply={setOriginalReply}
          setEdit={setEdit}
          setContent={setContent}
        />}
      </>
    );
  }
}

function ReplyButton({
  open,
  onClick,
  replies,
}: {
  open: boolean;
  onClick: () => void;
  replies: number;
}) {
  const Icon = open ? ChevronUpIcon : ChevronDownIcon;

  return (
    <button
      onClick={onClick}
      className="flex text-black-800"
    >
      {replies} replies
      {<Icon className="h-5 w-5" />}
    </button>
  );
}

function Loading() {
  return <button className="text-gray-500" aria-disabled>Loading...</button>;
}
