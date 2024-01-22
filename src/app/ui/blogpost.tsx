import { auth } from "../../../auth";
import Comments from "./comments";
import { CreateComment } from "./createComment";
import SignInButton from "./signIn";

export default function BlogPost({
  children,
  name,
  params,
}: {
  children: React.ReactNode;
  name: string;
  params: { page?: string };
}) {
  return (
    <div className="py-5 px-5 md:px-20 lg:px-40">
      <div className="prose">{children}</div>
      <hr className="my-10 bg-gray-300 border-0 h-px" />
      <Comments name={name} params={params} />
      <SignInOrCreateComment postName={name} />
    </div>
  );
}

async function SignInOrCreateComment({ postName }: { postName: string }) {
  const session = await auth();

  if (session?.user?.email) {
    return <CreateComment email={session.user.email} postName={postName} />;
  } else {
    return <SignInButton name={postName} />;
  }
}
