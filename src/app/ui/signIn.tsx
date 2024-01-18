"use client";

import { authenticate } from "../lib/actions";
import { useFormStatus } from "react-dom";

export default function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <form action={authenticate}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        aria-disabled={pending}
      >
        Sign in
      </button>
    </form>
  );
}
