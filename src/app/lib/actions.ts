"use server";

import { AuthError } from "next-auth";
import { auth, signIn } from "../../../auth";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export async function authenticate(path: string) {
  noStore();

  try {
    await signIn("github", { redirectTo: path });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

async function postComment(comment: string, id: string, postName: string) {
  noStore();

  await prisma.comment.create({
    data: {
      content: comment,
      blog: {
        connect: {
          name: postName,
        },
      },
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
}

export type FormState = {
  errors?: {
    content?: string;
  };
  message?: string | null;
};

export async function createComment(
  postName: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  console.log(session);

  if (!session?.user?.id) {
    return {
      message: "Please sign in.",
    };
  }

  const content = formData.get("content")?.toString() || "";

  if (!content) {
    return {
      message: "Please enter a comment.",
    };
  }

  try {
    await postComment(content, session.user.id, postName);
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong.",
      errors: {},
    };
  }

  revalidatePath(`/blog/${postName}`);
  redirect(`/blog/${postName}`);
}
