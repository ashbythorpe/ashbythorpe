"use client";

import { useActionState } from "react";
import { authenticate, logout } from "../lib/actions";
import { useFormStatus } from "react-dom";

export function SignInButton() {
  const { pending } = useFormStatus();
  const [state, dispatch] = useActionState(authenticate, undefined);

  return (
    <>
      <form action={dispatch} className="w-full flex mt-5">
        <button
          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          aria-disabled={pending}
        >
          Sign in with GitHub
        </button>
      </form>
      {typeof state === "string" && (
        <p className="text-sm text-red-500">{state}</p>
      )}
    </>
  );
}

export function SignOutButton() {
  return (
    <form action={logout}>
      <button className="bg-cerise-red-500 hover:bg-cerise-red-600 text-white font-bold py-2 px-4 rounded">
        Sign out
      </button>
    </form>
  );
}
