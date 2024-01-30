"use client";

import { authenticate } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export function SignInButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  const [state, dispatch] = useFormState(
    authenticate.bind(null, `ashbythorpe.com/blog/${name}`),
    undefined,
  );

  if (state) {
    console.log(state);
  }

  return (
    <>
      <form action={dispatch}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
