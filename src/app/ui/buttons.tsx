import {
  ArrowUturnLeftIcon,
  CheckIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteComment } from "../lib/actions";

export function ReplyButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button className="text-black-300 hover:text-black-400" onClick={onClick}>
        <ArrowUturnLeftIcon className="w-3.5 h-auto" />
      </button>
    </div>
  );
}

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button className="text-black-300 hover:text-black-400" onClick={onClick}>
        <PencilIcon className="w-3.5 h-auto" />
      </button>
    </div>
  );
}

export function LinkButton({ href }: { href: string }) {
  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(true);
  const [success, setSuccess] = useState(true);

  const [absoluteURL, setAbsoluteURL] = useState("");

  // Get the URL on the client
  useEffect(() => {
    setAbsoluteURL(new URL(href, document.baseURI).href);
  }, [href]);

  const onClick = () => {
    navigator.clipboard
      .writeText(absoluteURL)
      .then(() => {
        setMessage("Copied!");
        setSuccess(true);
        setHidden(false);
        setTimeout(() => {
          setHidden(true);
        }, 500);
      })
      .catch(() => {
        setMessage("Failed to copy");
        setSuccess(false);
        setHidden(false);
        setTimeout(() => {
          setHidden(true);
        }, 500);
      });
  };

  return (
    <div className="flex-grow flex pt-1">
      <div
        className={clsx("rounded-sm text-xs mr-1", {
          "bg-black-300 text-black-800": success,
          "bg-red-400 text-red-800": !success,
          "opacity-0 transition-opacity": hidden,
        })}
      >
        <p>{message}</p>
      </div>
      <button onClick={onClick} className="text-black-300 hover:text-black-400">
        {success && !hidden ? (
          <CheckIcon className="w-3.5 h-auto" />
        ) : (
          <LinkIcon className="w-3.5 h-auto" />
        )}
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
