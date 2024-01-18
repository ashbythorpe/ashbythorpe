"use client";

import { useFormStatus } from "react-dom";
import { authenticate } from "../lib/authenticate";

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
