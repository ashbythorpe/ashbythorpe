import { auth, signOut } from "../../../auth";
import { getUserName } from "../lib/utils";
import Comments from "./comments";
import { CreateComment } from "./createComment";
import { SignInButton } from "./signIn";

export default async function BlogPost({
  children,
  name,
  params,
}: {
  children: React.ReactNode;
  name: string;
  params: { page?: string };
}) {
  const session = await auth();

  const username = session ? getUserName(session) : null;

  return (
    <div className="flex-grow w-full bg-gray-100 h-full py-5 px-5 md:px-20 lg:px-40">
      <div className="prose">{children}</div>
      <hr className="my-10 bg-gray-300 border-0 h-px" />
      <Comments name={name} params={params} id={session?.user?.id || null} />
      <SignInOrCreateComment postName={name} username={username} />
    </div>
  );
}

async function SignInOrCreateComment({
  postName,
  username,
}: {
  postName: string;
  username: string | null;
}) {
  if (username) {
    return (
      <>
        <CreateComment username={username} postName={postName} />
        <SignOutButton />
      </>
    );
  } else {
    return <SignInButton />;
  }
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Sign out
      </button>
    </form>
  );
}
